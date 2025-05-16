"use client";

import React, { useState, useEffect, useCallback } from "react";
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
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchStorefronts,
  createStorefront,
} from "@/store/slices/storefrontSlice";
import { RootState, AppDispatch } from "@/store";
import {
  ToastProvider,
  Toast,
  ToastTitle,
  ToastViewport,
} from "@/components/ui/toast";
import { useRouter } from "next/navigation";
import { DEPLOYED_URL } from "@/lib/utils";

import { Skeleton } from "@/components/ui/skeleton";
import { ImagePlus } from "lucide-react";
const CLOUDINARY_CLOUD_NAME =
  process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || "dqny2b4gb";
const CLOUDINARY_UPLOAD_PRESET =
  process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || "demopayment";

const StorefrontPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const { storefronts, fetchStorefrontsLoading, error } = useSelector(
    (state: RootState) => state.storefront
  );

  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [toastOpen, setToastOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastVariant, setToastVariant] = useState<"default" | "destructive">(
    "default"
  );

  useEffect(() => {
    dispatch(fetchStorefronts());
  }, [dispatch]);

  const handleStorefrontClick = (storefrontId: string) => {
    router.push(`/storefront/${storefrontId}`);
  };

  return (
    <ToastProvider swipeDirection="right">
      <div className="mx-1 md:mx-2 lg:mx-2 py-4">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight">
              Your Storefronts
            </h1>
          </div>
          <Button
            onClick={() => setIsCreateDialogOpen(true)}
            className="bg-primary"
          >
            <ImagePlus className="mr-2 h-4 w-4" />
            Create New Storefront
          </Button>
        </div>

        {fetchStorefrontsLoading && (
          <div className="flex justify-center items-center py-6">
            <Skeleton className="w-full h-20" />
            <Skeleton className="w-full h-20" />
          </div>
        )}

        {error && (
          <div className="rounded-md border border-destructive/20 bg-destructive/10 px-4 py-3 text-sm text-destructive">
            Failed to fetch storefronts: {error}
          </div>
        )}

        {!fetchStorefrontsLoading && storefronts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {storefronts.map((storefront) => (
              <div
                key={storefront.id}
                className="rounded-md border shadow-sm transition-shadow hover:shadow-lg cursor-pointer"
                onClick={() => handleStorefrontClick(storefront.id)}
              >
                {storefront.imageUrl && (
                  <div className="relative aspect-video w-full overflow-hidden rounded-t-md">
                    <img
                      src={storefront.imageUrl}
                      alt={storefront.name}
                      className="object-cover w-full h-full"
                    />
                  </div>
                )}
                <div className="p-4">
                  <h3 className="font-semibold text-lg mb-2">
                    {storefront.name}
                  </h3>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {storefront.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          !fetchStorefrontsLoading && (
            <div className="text-center py-8">
              <p className="text-lg text-muted-foreground mb-4">
                You have no storefronts yet.
              </p>
            </div>
          )
        )}

        <StorefrontDialog
          isOpen={isCreateDialogOpen}
          onClose={() => setIsCreateDialogOpen(false)}
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

export default StorefrontPage;

// Dialog Component to Create Storefront
const StorefrontDialog = ({
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
  const [uploadingImage, setUploadingImage] = useState(false);
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string | null>(null);
  const { handleSubmit, register, reset, setValue } = useForm();

  const uploadImageToCloudinary = useCallback(
    async (imageFile: File): Promise<string | null> => {
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
    },
    [
      CLOUDINARY_CLOUD_NAME,
      CLOUDINARY_UPLOAD_PRESET,
      setToastMessage,
      setToastOpen,
      setToastVariant,
    ]
  );

  const handleImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploadingImage(true);
      try {
        const imageUrl = await uploadImageToCloudinary(file);
        if (imageUrl) {
          setUploadedImageUrl(imageUrl);
          setValue("imageUrl", imageUrl);
        }
      } catch (error) {
        console.error("Upload failed", error);
      } finally {
        setUploadingImage(false);
      }
    }
  };

  const onSubmit = async (data: any) => {
    setIsLoading(true);
    try {
      const resultAction = await dispatch(createStorefront(data));

      if (createStorefront.fulfilled.match(resultAction)) {
        reset();
        setUploadedImageUrl(null);
        onClose();
        setToastMessage("Storefront created successfully!");
        setToastVariant("default");
        setToastOpen(true);
      } else {
        const errorMessage =
          resultAction.payload?.message ||
          "Failed to create storefront. Please try again.";
        throw new Error(errorMessage);
      }
    } catch (error: any) {
      setToastMessage(
        error.message ||
          "An unknown error occurred while creating the storefront."
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
          <DialogTitle>Create New Storefront</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="flex flex-col gap-2">
              <Label htmlFor="name">Storefront Name</Label>
              <Input
                id="name"
                placeholder="Enter storefront name"
                {...register("name", {
                  required: "Storefront name is required",
                })}
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="imageUpload">Storefront Image</Label>
              <Input
                id="imageUpload"
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                disabled={uploadingImage}
                className="hidden"
              />
              <Button variant="outline" asChild disabled={uploadingImage}>
                <label htmlFor="imageUpload" className="cursor-pointer">
                  {uploadingImage ? (
                    <>
                      Uploading...{" "}
                      <div className="animate-spin rounded-full h-7 w-7 border-t-2 border-b-2 border-purple-500"></div>
                    </>
                  ) : uploadedImageUrl ? (
                    <>
                      Image Uploaded <ImagePlus className="ml-2 h-4 w-4" />
                    </>
                  ) : (
                    <>
                      Upload Image <ImagePlus className="ml-2 h-4 w-4" />
                    </>
                  )}
                </label>
              </Button>

              {uploadedImageUrl && (
                <div className="relative aspect-video w-32 h-20 mt-2 overflow-hidden rounded-md">
                  <img
                    src={uploadedImageUrl}
                    alt="Uploaded Storefront Image"
                    className="object-cover w-full h-full"
                  />
                </div>
              )}
              <input
                type="hidden"
                {...register("imageUrl")}
                value={uploadedImageUrl || ""}
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="description">Description</Label>
            <Input
              id="description"
              placeholder="Enter storefront description"
              {...register("description", {
                required: "Description is required",
              })}
            />
          </div>

          <DialogFooter className="justify-end">
            <Button type="button" variant="secondary" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Creating..." : "Create Storefront"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
