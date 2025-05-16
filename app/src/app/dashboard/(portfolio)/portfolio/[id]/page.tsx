"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TextArea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchPortfolioById,
  updatePortfolio,
  deletePortfolio,
} from "@/store/slices/portfolioSlice";
import { RootState, AppDispatch } from "@/store";
import {
  Toast,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/components/ui/toast";
import { useParams, useRouter } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import Link from "next/link";
const CLOUDINARY_CLOUD_NAME =
  process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || "dqny2b4gb";
const CLOUDINARY_UPLOAD_PRESET =
  process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || "demopayment";

const SinglePortfolioPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const { portfolio, loading, error } = useSelector(
    (state: RootState) => state.portfolio
  );
  const { id } = useParams<{ id: string }>();
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [toastOpen, setToastOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastVariant, setToastVariant] = useState<"default" | "destructive">(
    "default"
  );

  useEffect(() => {
    if (id) {
      dispatch(fetchPortfolioById(id));
    }
  }, [dispatch, id]);

  if (loading) {
    return (
      <div className="container mx-auto py-8">
        <Skeleton className="w-full h-40 bg-gray-400 my-4 rounded-lg" />
        <Skeleton className="w-full h-8 bg-gray-400 my-2 rounded-md" />
        <Skeleton className="w-full h-8 bg-gray-400 my-2 rounded-md" />
        <Skeleton className="w-1/2 h-8 bg-gray-400 my-4 rounded-md" />
        <h2 className="text-2xl font-semibold mt-8">
          <Skeleton className="w-1/4 h-6 bg-gray-400 rounded-md" />
        </h2>
        <Skeleton className="w-full h-6 bg-gray-400 my-2 rounded-md" />
        <Skeleton className="w-3/4 h-6 bg-gray-400 my-2 rounded-md" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto py-8 text-red-500">Error: {error}</div>
    );
  }

  if (!portfolio) {
    return (
      <div className="container mx-auto py-8">
        <p>Portfolio not found.</p>
      </div>
    );
  }
  const previewLink = `/nestport/${portfolio.fullName
    .toLowerCase()
    .replace(/ /g, "-")}`;

  return (
    <ToastProvider swipeDirection="right">
      <div className="mx-1 md:mx-2 lg:mx-2 py-4">
        <div className="mb-6">
          <div className="md:grid md:grid-cols-2 md:items-start md:gap-8">
            <div className="mb-4 md:mb-0">
              {portfolio.profilePhoto && (
                <img
                  src={portfolio.profilePhoto}
                  alt={portfolio.fullName}
                  className="rounded-lg w-full h-auto object-cover aspect-square"
                />
              )}
            </div>
            <div>
              <h1 className="text-4xl font-bold mb-2">{portfolio.fullName}</h1>
              <p className="text-gray-600 text-lg mb-4">
                {portfolio.description}
              </p>
              <div className="mb-4">
                <h3 className="font-semibold text-gray-700 mb-2">Skills:</h3>
                <div className="flex flex-wrap gap-2">
                  {portfolio.skill &&
                    portfolio.skill
                      .split(",")
                      .map((skill: string, index: number) => (
                        <span
                          key={index}
                          className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700"
                        >
                          {skill.trim()}
                        </span>
                      ))}
                </div>
              </div>
            </div>
          </div>
          <div className="mt-6 flex justify-end gap-2">
            <Link href={previewLink} target="_blank" rel="noopener noreferrer">
              <Button variant="outline">Preview Portfolio</Button>
            </Link>
            <Button onClick={() => setIsEditOpen(true)} variant={"outline"}>
              Edit
            </Button>
            <Button variant="destructive" onClick={() => setIsDeleteOpen(true)}>
              Delete
            </Button>
          </div>
        </div>

        <h2 className="text-2xl font-semibold mt-8 mb-4">Projects</h2>
        {portfolio.projects && portfolio.projects.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {portfolio.projects.map((project: any) => (
              <div
                key={project.id}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 flex flex-col justify-between h-full"
              >
                <div>
                  <h3 className="font-semibold text-lg mb-2">{project.name}</h3>
                  <p className="text-gray-700 dark:text-gray-300 text-sm line-clamp-2 mb-2">
                    {project.description}
                  </p>
                  {project.imageUrl && (
                    <div className="aspect-w-16 aspect-h-9 rounded-md overflow-hidden mb-2">
                      <img
                        src={project.imageUrl}
                        alt={project.name}
                        className="object-cover w-full h-full"
                      />
                    </div>
                  )}
                </div>
                <div className="mt-2 flex justify-end gap-2">
                  {project.liveUrl ? (
                    <Button
                      size="sm"
                      variant="secondary"
                      onClick={() => window.open(project.liveUrl, "_blank")}
                    >
                      Visit
                    </Button>
                  ) : null}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-gray-500 flex items-center gap-2">
            <p>No projects added yet.</p>
            <Button
              size="sm"
              onClick={() => router.push(`/dashboard/projects`)}
            >
              Create Project
            </Button>
          </div>
        )}
        <PortfolioDialog
          isOpen={isEditOpen}
          onClose={() => setIsEditOpen(false)}
          setToastMessage={setToastMessage}
          setToastOpen={setToastOpen}
          setToastVariant={setToastVariant}
          mode="edit"
          portfolio={portfolio}
        />
        <DeletePortfolioDialog
          isOpen={isDeleteOpen}
          onClose={() => setIsDeleteOpen(false)}
          portfolioId={portfolio.id}
          setToastMessage={setToastMessage}
          setToastOpen={setToastOpen}
          setToastVariant={setToastVariant}
        />
      </div>
      <Toast
        open={toastOpen}
        onOpenChange={setToastOpen}
        variant={toastVariant}
      >
        <ToastTitle>{toastMessage}</ToastTitle>
      </Toast>
      <ToastViewport />
    </ToastProvider>
  );
};

const PortfolioDialog = ({
  isOpen,
  onClose,
  setToastMessage,
  setToastOpen,
  setToastVariant,
  mode,
  portfolio,
}: {
  isOpen: boolean;
  onClose: () => void;
  setToastMessage: (message: string) => void;
  setToastOpen: (open: boolean) => void;
  setToastVariant: (variant: "default" | "destructive") => void;
  mode: "edit";
  portfolio?: any;
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const {
    handleSubmit,
    register,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: portfolio,
  });

  useEffect(() => {
    if (portfolio) {
      reset(portfolio);
      setSelectedImage(null); // Reset selected image when portfolio changes
    }
  }, [portfolio, reset]);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedImage(event.target.files[0]);
    }
  };

  const uploadImageToCloudinary = async (
    imageFile: File
  ): Promise<string | null> => {
    if (!CLOUDINARY_UPLOAD_PRESET || !CLOUDINARY_CLOUD_NAME) {
      setToastMessage(
        "Cloudinary configuration missing! Please ensure your Cloud Name and Upload Preset are set."
      );
      setToastVariant("destructive");
      setToastOpen(true);
      return null;
    }

    const formData = new FormData();
    formData.append("file", imageFile);
    formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);
    formData.append("cloud_name", CLOUDINARY_CLOUD_NAME);

    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Cloudinary upload failed:", errorData);
        setToastMessage(
          errorData.error?.message || "Could not upload image to Cloudinary."
        );
        setToastVariant("destructive");
        setToastOpen(true);
        return null;
      }

      const data = await response.json();
      return data.secure_url;
    } catch (error) {
      console.error("Error uploading to Cloudinary:", error);
      setToastMessage("An error occurred while uploading the image.");
      setToastVariant("destructive");
      setToastOpen(true);
      return null;
    }
  };

  const onSubmit = async (data: any) => {
    setIsLoading(true);
    let profilePhotoUrl: string | null = portfolio?.profilePhoto || null;

    if (selectedImage) {
      profilePhotoUrl = await uploadImageToCloudinary(selectedImage);
      if (!profilePhotoUrl) {
        setIsLoading(false);
        return;
      }
    }

    try {
      const updatedData = { ...data, profilePhoto: profilePhotoUrl };
      const resultAction = await dispatch(
        updatePortfolio({ portfolioId: portfolio.id, updatedData })
      );

      if (updatePortfolio.fulfilled.match(resultAction)) {
        reset();
        setSelectedImage(null);
        onClose();
        setToastMessage("Portfolio updated successfully!");
        setToastVariant("default");
        setToastOpen(true);
        dispatch(fetchPortfolioById(portfolio.id));
      } else {
        const errorMessage =
          resultAction.payload?.message ||
          "Failed to update portfolio. Please try again.";
        throw new Error(errorMessage);
      }
    } catch (error: any) {
      setToastMessage(
        error.message ||
          "An unknown error occurred while updating the portfolio."
      );
      setToastVariant("destructive");
      setToastOpen(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogTrigger />
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Portfolio</DialogTitle>
          <DialogDescription>
            Update the details of your portfolio below.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="flex flex-col gap-2">
              <Label htmlFor="name">Portfolio Name</Label>
              <Input
                id="name"
                placeholder="Enter portfolio name"
                {...register("fullName", { required: true })}
                className={cn(errors.fullName && "border-red-500")}
              />
              {errors.fullName && (
                <p className="text-red-500 text-sm">
                  {"Portfolio name is required"}
                </p>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="profilePhoto">Profile Photo</Label>
              <Input
                id="profilePhoto"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
              />
              {selectedImage && (
                <div className="relative w-24 h-24 rounded-full overflow-hidden mt-2">
                  <img
                    src={URL.createObjectURL(selectedImage)}
                    alt="Selected Preview"
                    className="object-cover w-full h-full"
                  />
                </div>
              )}
              {portfolio?.profilePhoto && !selectedImage && (
                <div className="relative w-24 h-24 rounded-full overflow-hidden mt-2">
                  <img
                    src={portfolio.profilePhoto}
                    alt="Current Profile Photo"
                    className="object-cover w-full h-full"
                  />
                  <p className="text-xs text-gray-500 mt-1">Current Photo</p>
                </div>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="description">Description</Label>
            <TextArea
              id="description"
              placeholder="Enter portfolio description"
              {...register("description", { required: true })}
              className={cn(errors.description && "border-red-500")}
            />
            {errors.description && (
              <p className="text-red-500 text-sm">
                {"Description is required"}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="skill">Skills (comma-separated)</Label>
            <Input
              id="skill"
              placeholder="Enter your skills (e.g., React, Node.js, Design)"
              {...register("skill", { required: true })}
              className={cn(errors.skill && "border-red-500")}
            />
            {errors.skill && (
              <p className="text-red-500 text-sm">{"Skills are required"}</p>
            )}
          </div>

          <DialogFooter className="justify-center sm:justify-center items-center flex">
            <Button
              className="w-full md:w-1/2"
              disabled={isLoading}
              type="submit"
            >
              {isLoading ? "Updating..." : "Save Changes"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

const DeletePortfolioDialog = ({
  isOpen,
  onClose,
  portfolioId,
  setToastMessage,
  setToastOpen,
  setToastVariant,
}: {
  isOpen: boolean;
  onClose: () => void;
  portfolioId: string;
  setToastMessage: (message: string) => void;
  setToastOpen: (open: boolean) => void;
  setToastVariant: (variant: "default" | "destructive") => void;
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await dispatch(deletePortfolio(portfolioId)).unwrap();
      onClose();
      setToastMessage("Portfolio deleted successfully!");
      setToastVariant("default");
      router.push("/dashboard/portfolio");
      setToastOpen(true);
    } catch (error: any) {
      setToastMessage(
        error.message || "An error occurred while deleting the portfolio."
      );
      setToastVariant("destructive");
      setToastOpen(true);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Portfolio</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this portfolio? This action cannot
            be undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="justify-center sm:justify-center items-center flex">
          <Button
            variant="destructive"
            className="w-full md:w-1/2"
            onClick={handleDelete}
            disabled={isDeleting}
          >
            {isDeleting ? "Deleting..." : "Delete"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SinglePortfolioPage;
