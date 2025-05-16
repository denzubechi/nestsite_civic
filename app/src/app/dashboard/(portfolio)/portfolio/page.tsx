"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { TextArea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchPortfolios,
  createPortfolio,
} from "@/store/slices/portfolioSlice";
import { RootState, AppDispatch } from "@/store";
import {
  ToastProvider,
  Toast,
  ToastTitle,
  ToastViewport,
} from "@/components/ui/toast";
import { useRouter } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";
import { DEPLOYED_URL } from "@/lib/utils";
import { motion } from "framer-motion";
const CLOUDINARY_CLOUD_NAME =
  process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || "dqny2b4gb";
const CLOUDINARY_UPLOAD_PRESET =
  process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || "demopayment";

const PortfolioPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const { portfolios, loading, error } = useSelector(
    (state: RootState) => state.portfolio
  );

  const [isOpen, setIsOpen] = useState(false);
  const [toastOpen, setToastOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastVariant, setToastVariant] = useState<"default" | "destructive">(
    "default"
  );

  useEffect(() => {
    dispatch(fetchPortfolios());
  }, [dispatch]);

  const handlePortfolioClick = (portfolioId: string) => {
    router.push(`/dashboard/portfolio/${portfolioId}`);
  };

  return (
    <ToastProvider swipeDirection="right">
      <div className="mx-1 md:mx-2 lg:mx-2 py-4">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-gray-100">
              Your Creative Showcase
            </h1>
            <p className="mt-1 text-md text-gray-500 dark:text-gray-400">
              Explore and manage unique portfolios.
            </p>
          </div>
          <Button
            onClick={() => setIsOpen(true)}
            className="bg-primary text-white font-semibold rounded-md shadow-md transition duration-300"
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              ></path>
            </svg>
            Create New
          </Button>
        </div>

        {loading && (
          <div className="px-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(3)].map((_, index) => (
              <motion.div
                key={index}
                className="rounded-xl shadow-md overflow-hidden bg-gray-100 dark:bg-gray-800 animate-pulse"
              >
                <div className="p-6">
                  <Skeleton className="w-20 h-5 bg-gray-300 dark:bg-gray-700 rounded-md mb-2" />
                  <Skeleton className="w-full h-3 bg-gray-300 dark:bg-gray-700 rounded-md mb-2" />
                  <Skeleton className="w-3/4 h-3 bg-gray-300 dark:bg-gray-700 rounded-md" />
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {error && (
          <div className="rounded-md bg-red-50 p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg
                  className="h-5 w-5 text-red-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800">
                  Error fetching portfolios
                </h3>
                <div className="mt-2 text-sm text-red-700">
                  <p>{error}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {!loading && portfolios.length > 0 ? (
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              duration: 0.5,
              delayChildren: 0.2,
              staggerChildren: 0.1,
            }}
          >
            {portfolios.map((portfolio) => (
              <motion.div
                key={portfolio.id}
                className="rounded-xl shadow-md overflow-hidden bg-white dark:bg-gray-900 hover:shadow-lg transition duration-300 transform hover:-translate-y-1"
                onClick={() => handlePortfolioClick(portfolio.id)}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                <div className="p-6">
                  <h2 className="font-semibold text-lg text-gray-900 dark:text-gray-100 mb-2">
                    {portfolio.fullName}
                  </h2>
                  <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2">
                    {portfolio.description}
                  </p>
                  {portfolio.profilePhoto && (
                    <div className="mt-4">
                      <img
                        src={portfolio.profilePhoto}
                        alt={portfolio.fullName}
                        className="w-full h-auto rounded-md object-cover aspect-square"
                      />
                    </div>
                  )}
                  <Button
                    size="sm"
                    className="mt-4 bg-primary text-white font-semibold rounded-md shadow-sm transition duration-200"
                  >
                    View Portfolio
                  </Button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          !loading && (
            <div className="text-center py-10">
              <svg
                className="mx-auto h-12 w-12 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 17v-2m3 2v-4m3 4v-2m3-9l-3 3m0-3l3 3m-3-3l-3 3m-9 5h9a2 2 0 002-2V7a2 2 0 00-2-2H9a2 2 0 00-2 2v8a2 2 0 002 2zm-6 0h.01m6 0h.01m6 0h.01"
                />
              </svg>
              <p className="mt-3 text-lg text-gray-500">
                You haven't created any portfolios yet.
              </p>
              <Button
                onClick={() => setIsOpen(true)}
                className="mt-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-md shadow-md transition duration-300"
              >
                Create Your First Portfolio
              </Button>
            </div>
          )
        )}

        <PortfolioDialog
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
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

export default PortfolioPage;

const PortfolioDialog = ({
  isOpen,
  onClose,
  setToastMessage,
  setToastOpen,
  setToastVariant,
}: {
  isOpen: boolean;
  onClose: () => void;
  setToastMessage: (message: string) => void;
  setToastOpen: (open: boolean) => void;
  setToastVariant: (variant: "default" | "destructive") => void;
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const { handleSubmit, register, reset, setValue } = useForm();

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
    let profilePhotoUrl: string | null = null;

    if (selectedImage) {
      profilePhotoUrl = await uploadImageToCloudinary(selectedImage);
      if (!profilePhotoUrl) {
        setIsLoading(false);
        return; // Stop submission if Cloudinary upload fails
      }
    }

    try {
      const portfolioData = { ...data, profilePhoto: profilePhotoUrl };
      const resultAction = await dispatch(createPortfolio(portfolioData));

      if (createPortfolio.fulfilled.match(resultAction)) {
        reset();
        setSelectedImage(null);
        onClose();
        setToastMessage("Portfolio created successfully!");
        setToastVariant("default");
        setToastOpen(true);
      } else {
        const errorMessage =
          resultAction.payload?.message ||
          "Failed to create portfolio. Please try again.";
        setToastMessage("Portfolio creation failed! " + errorMessage);
        setToastVariant("destructive");
        setToastOpen(true);
      }
    } catch (error: any) {
      setToastMessage(
        error.message ||
          "An unknown error occurred while creating the portfolio."
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
          <DialogTitle>Craft Your New Portfolio</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="flex flex-col gap-2">
              <Label htmlFor="name">Portfolio Name</Label>
              <Input
                id="name"
                placeholder="Give your portfolio a unique name"
                {...register("fullName", {
                  required: "Portfolio name is required",
                })}
              />
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
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="description">Brief Description</Label>
            <TextArea
              id="description"
              placeholder="Summarize your portfolio in a few words"
              {...register("description", {
                required: "Description is required",
              })}
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="skill">Key Skill/Area</Label>
            <TextArea
              id="skill"
              placeholder="Highlight your main skill or area of expertise"
              {...register("skill", { required: "Skill is required" })}
            />
          </div>

          <DialogFooter className="justify-end ">
            <Button
              type="button"
              variant="outline"
              className="my-2"
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button
              className="bg-primary my-2 text-white font-semibold rounded-md shadow-md transition duration-300"
              disabled={isLoading}
              type="submit"
            >
              {isLoading ? (
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
              ) : (
                "Create Portfolio"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
