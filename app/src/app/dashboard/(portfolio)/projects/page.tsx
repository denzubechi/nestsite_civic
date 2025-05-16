"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProjects,
  createProject,
  updateProject,
  deleteProject,
} from "@/store/slices/projectSlice";
import { fetchPortfolios } from "@/store/slices/portfolioSlice";
import { RootState, AppDispatch } from "@/store";
import {
  ToastProvider,
  Toast,
  ToastTitle,
  ToastViewport,
} from "@/components/ui/toast";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog";
import { useRouter } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";
import { motion } from "framer-motion";
import { TextArea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem as RadixSelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Portfolio {
  id: string;
  fullName: string;
}

interface Project {
  id: string;
  portfolioId: string;
  name: string;
  liveUrl: string | null;
  imageUrl: string | null;
  description: string | null;
}

const CLOUDINARY_CLOUD_NAME =
  process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || "dqny2b4gb";
const CLOUDINARY_UPLOAD_PRESET =
  process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || "demopayment";

const ProjectPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const {
    projects,
    fetchLoading,
    createLoading,
    updateLoading,
    deleteLoading,
    error,
  } = useSelector((state: RootState) => state.project);
  const {
    portfolios,
    loading: portfolioLoading,
    error: portfolioError,
  } = useSelector((state: RootState) => state.portfolio);

  const [viewState, setViewState] = useState<"list" | "create" | "edit">(
    "list"
  );
  const [projectToEdit, setProjectToEdit] = useState<Project | null>(null);
  const [toastOpen, setToastOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastVariant, setToastVariant] = useState<"default" | "destructive">(
    "default"
  );
  const [selectedPortfolioId, setSelectedPortfolioId] = useState<
    string | undefined
  >("");
  const [isLoading, setIsLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  const [projectName, setProjectName] = useState("");
  const [projectLiveUrl, setProjectLiveUrl] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [selectedPortfolio, setSelectedPortfolio] = useState<
    string | undefined
  >("");

  const { handleSubmit, register, reset, watch, setValue } = useForm({
    defaultValues: {
      name: "",
      liveUrl: "",
      description: "",
      portfolioId: "",
    },
  });
  const watchSelectedPortfolio = watch("portfolioId");

  useEffect(() => {
    dispatch(fetchPortfolios());
  }, [dispatch]);

  const handlePortfolioChange = (portfolioId: string) => {
    setSelectedPortfolioId(portfolioId);
    if (portfolioId) {
      dispatch(fetchProjects(portfolioId));
    }
  };

  const handleEditClick = (project: Project) => {
    setProjectToEdit(project);
    setViewState("edit");
    // Populate the form with the project data
    setValue("name", project.name);
    setValue("liveUrl", project.liveUrl || "");
    setValue("description", project.description || "");
    setValue("portfolioId", project.portfolioId);
    setSelectedImage(null); // Reset selected image when editing
  };

  const handleCancelCreate = () => {
    setViewState("list");
    reset();
    setSelectedImage(null);
  };

  const handleCancelEdit = () => {
    setProjectToEdit(null);
    setViewState("list");
    reset();
    setSelectedImage(null);
  };

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

  const handleCreateProjectSubmitSimple = async () => {
    if (!selectedPortfolio) {
      setToastMessage("Please select a portfolio.");
      setToastVariant("destructive");
      setToastOpen(true);
      return;
    }

    setIsLoading(true);
    let imageUrl: string | null = null;

    if (selectedImage) {
      imageUrl = await uploadImageToCloudinary(selectedImage);
      if (!imageUrl) {
        setIsLoading(false);
        return;
      }
    }

    try {
      const projectData = {
        name: projectName,
        liveUrl: projectLiveUrl,
        description: projectDescription,
        portfolioId: selectedPortfolio,
        imageUrl,
      };
      const resultAction = await dispatch(
        createProject({
          portfolioId: selectedPortfolio,
          newProject: projectData,
        })
      );

      if (createProject.fulfilled.match(resultAction)) {
        setProjectName("");
        setProjectLiveUrl("");
        setProjectDescription("");
        setSelectedPortfolio(undefined);
        setSelectedImage(null);
        setViewState("list");
        setToastMessage("Project created successfully!");
        setToastVariant("default");
        setToastOpen(true);
      } else {
        const errorMessage =
          resultAction.payload || "Failed to create project. Please try again.";
        setToastMessage("Project creation failed! " + errorMessage);
        setToastVariant("destructive");
        setToastOpen(true);
      }
    } catch (error: any) {
      setToastMessage(
        error.message || "An unknown error occurred while creating the project."
      );
      setToastVariant("destructive");
      setToastOpen(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditProjectSubmitSimple = async () => {
    if (!projectToEdit?.id) {
      setToastMessage("No project to update.");
      setToastVariant("destructive");
      setToastOpen(true);
      return;
    }

    setIsLoading(true);
    let imageUrl: string | null = projectToEdit.imageUrl;

    if (selectedImage) {
      imageUrl = await uploadImageToCloudinary(selectedImage);
      if (!imageUrl) {
        setIsLoading(false);
        return;
      }
    }

    try {
      const updatedProjectData = {
        name: projectName,
        liveUrl: projectLiveUrl,
        description: projectDescription,
        portfolioId: selectedPortfolio || projectToEdit.portfolioId,
        imageUrl,
      };

      const resultAction = await dispatch(
        updateProject({
          projectId: projectToEdit.id, // Provide the projectId
          updatedProject: updatedProjectData, // Provide the updated project data
        })
      );

      if (updateProject.fulfilled.match(resultAction)) {
        setProjectName("");
        setProjectLiveUrl("");
        setProjectDescription("");
        setSelectedPortfolio(undefined);
        setSelectedImage(null);
        setProjectToEdit(null);
        setViewState("list");
        setToastMessage("Project updated successfully!");
        setToastVariant("default");
        setToastOpen(true);
      } else {
        const errorMessage =
          resultAction.payload || "Failed to update project. Please try again.";
        setToastMessage("Project update failed! " + errorMessage);
        setToastVariant("destructive");
        setToastOpen(true);
      }
    } catch (error: any) {
      setToastMessage(
        error.message || "An unknown error occurred while updating the project."
      );
      setToastVariant("destructive");
      setToastOpen(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ToastProvider swipeDirection="right">
      <div className="mx-1 md:mx-2 lg:mx-2 py-4">
        {viewState === "list" && (
          <>
            <div className="flex justify-between items-center mb-6">
              <div>
                <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-gray-100">
                  Your Projects
                </h1>
                <p className="mt-1 text-md text-gray-500 dark:text-gray-400">
                  Manage and showcase your amazing projects.
                </p>
              </div>
              <Button
                onClick={() => setViewState("create")}
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
                Add New Project
              </Button>
            </div>

            <div className="mb-4">
              <Label htmlFor="portfolio">Select Portfolio</Label>
              <Select
                onValueChange={handlePortfolioChange}
                value={selectedPortfolioId}
              >
                <SelectTrigger className="w-[300px]">
                  <SelectValue placeholder="Choose a portfolio" />
                </SelectTrigger>
                <SelectContent>
                  {portfolioLoading ? (
                    <RadixSelectItem disabled value="loading">
                      Loading portfolios...
                    </RadixSelectItem>
                  ) : portfolioError ? (
                    <RadixSelectItem disabled value="error">
                      Error loading portfolios
                    </RadixSelectItem>
                  ) : portfolios.length > 0 ? (
                    portfolios.map((portfolio) => (
                      <RadixSelectItem key={portfolio.id} value={portfolio.id}>
                        {portfolio.fullName}
                      </RadixSelectItem>
                    ))
                  ) : (
                    <RadixSelectItem disabled value="empty">
                      No portfolios available
                    </RadixSelectItem>
                  )}
                </SelectContent>
              </Select>
              {!selectedPortfolioId && (
                <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                  Please select a portfolio to view its projects.
                </p>
              )}
            </div>

            {selectedPortfolioId && fetchLoading && (
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

            {selectedPortfolioId && error && (
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
                      Error fetching projects
                    </h3>
                    <div className="mt-2 text-sm text-red-700">
                      <p>{error}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {selectedPortfolioId && !fetchLoading && projects.length > 0 ? (
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
                {projects.map((project) => (
                  <motion.div
                    key={project.id}
                    className="rounded-xl shadow-md overflow-hidden bg-white dark:bg-gray-900 hover:shadow-lg transition duration-300 transform hover:-translate-y-1"
                  >
                    <div className="p-6 flex flex-col justify-between h-full">
                      <div>
                        <h2 className="font-semibold text-lg text-gray-900 dark:text-gray-100 mb-2">
                          {project.name}
                        </h2>
                        <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2">
                          {project.description}
                        </p>
                        {project.imageUrl && (
                          <div className="mt-4">
                            <img
                              src={project.imageUrl}
                              alt={project.name}
                              className="w-full h-auto rounded-md object-cover aspect-square"
                            />
                          </div>
                        )}
                      </div>
                      <div className="mt-4 flex justify-end space-x-2">
                        <Button
                          onClick={() => handleEditClick(project)}
                          aria-label="Edit"
                          disabled={updateLoading || deleteLoading}
                          variant={"outline"}
                        >
                          Edit
                        </Button>
                        <Button
                          aria-label="Delete"
                          disabled={updateLoading || deleteLoading}
                          variant={"destructive"}
                        >
                          Delete
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              selectedPortfolioId &&
              !fetchLoading && (
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
                    No projects have been added to this portfolio yet.
                  </p>
                  <Button
                    onClick={() => setViewState("create")}
                    className="mt-4 bg-primary text-white font-semibold rounded-md shadow-md transition duration-300"
                  >
                    Add New Project
                  </Button>
                </div>
              )
            )}
          </>
        )}

        {viewState === "create" && (
          <div className="relative bg-white dark:bg-gray-800 rounded-lg shadow-sm w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                Add New Project
              </h2>
              <button
                onClick={handleCancelCreate}
                className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition duration-200"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  ></path>
                </svg>
              </button>
            </div>
            <div className="grid gap-4">
              <div className="flex flex-col gap-2">
                <Label htmlFor="portfolioId">Portfolio</Label>
                <Select
                  value={selectedPortfolio}
                  onValueChange={(value) => setSelectedPortfolio(value)}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue
                      placeholder={
                        portfolios.find((p) => p.id === selectedPortfolio)
                          ?.fullName || "Select a portfolio"
                      }
                    />
                  </SelectTrigger>
                  <SelectContent>
                    {portfolioLoading ? (
                      <RadixSelectItem disabled value="loading">
                        Loading portfolios...
                      </RadixSelectItem>
                    ) : portfolioError ? (
                      <RadixSelectItem disabled value="error">
                        Error loading portfolios
                      </RadixSelectItem>
                    ) : portfolios.length > 0 ? (
                      portfolios.map((portfolio) => (
                        <RadixSelectItem
                          key={portfolio.id}
                          value={portfolio.id}
                        >
                          {portfolio.fullName}
                        </RadixSelectItem>
                      ))
                    ) : (
                      <RadixSelectItem disabled value="empty">
                        No portfolios available
                      </RadixSelectItem>
                    )}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="name">Project Name</Label>
                <Input
                  id="name"
                  placeholder="Give your project a unique name"
                  value={projectName}
                  onChange={(e) => setProjectName(e.target.value)}
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="liveUrl">Live URL (Optional)</Label>
                <Input
                  id="liveUrl"
                  type="url"
                  placeholder="Link to the live project"
                  value={projectLiveUrl}
                  onChange={(e) => setProjectLiveUrl(e.target.value)}
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="imageFile">Image (Optional)</Label>
                <Input
                  id="imageFile"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                />
                {selectedImage && (
                  <div className="relative w-24 h-24 rounded-md overflow-hidden mt-2">
                    <img
                      src={URL.createObjectURL(selectedImage)}
                      alt="Selected Preview"
                      className="object-cover w-full h-full"
                    />
                  </div>
                )}
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="description">Description (Optional)</Label>
                <TextArea
                  id="description"
                  placeholder="Describe your project"
                  value={projectDescription}
                  onChange={(e) => setProjectDescription(e.target.value)}
                />
              </div>

              <div className="flex justify-end gap-2 mt-4">
                <Button
                  type="button"
                  variant="outline"
                  className="my-2"
                  onClick={handleCancelCreate}
                >
                  Cancel
                </Button>
                <Button
                  className="bg-primary my-2 text-white font-semibold rounded-md shadow-md transition duration-300"
                  disabled={isLoading}
                  onClick={handleCreateProjectSubmitSimple}
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
                    "Submit"
                  )}
                </Button>
              </div>
            </div>
          </div>
        )}

        {viewState === "edit" && projectToEdit && (
          <div className="relative bg-white dark:bg-gray-800 rounded-lg shadow-sm w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                Edit Project
              </h2>
              <button
                onClick={handleCancelEdit}
                className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition duration-200"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  ></path>
                </svg>
              </button>
            </div>
            <div className="grid gap-4">
              <div className="flex flex-col gap-2">
                <Label htmlFor="portfolioId">Portfolio</Label>
                <Select
                  value={selectedPortfolio || projectToEdit.portfolioId}
                  onValueChange={(value) => setSelectedPortfolio(value)}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue
                      placeholder={
                        portfolios.find(
                          (p) =>
                            p.id ===
                            (selectedPortfolio || projectToEdit.portfolioId)
                        )?.fullName || "Select a portfolio"
                      }
                    />
                  </SelectTrigger>
                  <SelectContent>
                    {portfolioLoading ? (
                      <RadixSelectItem disabled value="loading">
                        Loading portfolios...
                      </RadixSelectItem>
                    ) : portfolioError ? (
                      <RadixSelectItem disabled value="error">
                        Error loading portfolios
                      </RadixSelectItem>
                    ) : portfolios.length > 0 ? (
                      portfolios.map((portfolio) => (
                        <RadixSelectItem
                          key={portfolio.id}
                          value={portfolio.id}
                        >
                          {portfolio.fullName}
                        </RadixSelectItem>
                      ))
                    ) : (
                      <RadixSelectItem disabled value="empty">
                        No portfolios available
                      </RadixSelectItem>
                    )}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="name">Project Name</Label>
                <Input
                  id="name"
                  placeholder="Give your project a unique name"
                  value={projectName}
                  onChange={(e) => setProjectName(e.target.value)}
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="liveUrl">Live URL (Optional)</Label>
                <Input
                  id="liveUrl"
                  type="url"
                  placeholder="Link to the live project"
                  value={projectLiveUrl}
                  onChange={(e) => setProjectLiveUrl(e.target.value)}
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="imageFile">Image (Optional)</Label>
                <Input
                  id="imageFile"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                />
                {selectedImage && (
                  <div className="relative w-24 h-24 rounded-md overflow-hidden mt-2">
                    <img
                      src={URL.createObjectURL(selectedImage)}
                      alt="Selected Preview"
                      className="object-cover w-full h-full"
                    />
                  </div>
                )}
                {projectToEdit.imageUrl && !selectedImage && (
                  <div className="relative w-24 h-24 rounded-md overflow-hidden mt-2">
                    <img
                      src={projectToEdit.imageUrl}
                      alt="Current Project Image"
                      className="object-cover w-full h-full"
                    />
                    <p className="text-xs text-gray-500 mt-1">Current Image</p>
                  </div>
                )}
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="description">Description (Optional)</Label>
                <TextArea
                  id="description"
                  placeholder="Describe your project"
                  value={projectDescription}
                  onChange={(e) => setProjectDescription(e.target.value)}
                />
              </div>

              <div className="flex justify-end gap-2 mt-4">
                <Button
                  type="button"
                  variant="outline"
                  className="my-2"
                  onClick={handleCancelEdit}
                >
                  Cancel
                </Button>
                <Button
                  className="bg-primary my-2 text-white font-semibold rounded-md shadow-md transition duration-300"
                  disabled={isLoading}
                  onClick={handleEditProjectSubmitSimple}
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
                    "Update"
                  )}
                </Button>
              </div>
            </div>
          </div>
        )}
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

export default ProjectPage;
