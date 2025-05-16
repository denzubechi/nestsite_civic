"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation"; 
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { ToastProvider, Toast, ToastTitle, ToastViewport } from "@/components/ui/toast";
import { Skeleton } from "@/components/ui/skeleton"; // For loading state
import { BACKEND_URL } from "@/lib/utils"; // Importing BACKEND_URL
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";

const StorefrontPage = () => {
  const { name } = useParams();
  const [storefront, setStorefront] = useState<any>(null); // Storefront data
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [toastOpen, setToastOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastVariant, setToastVariant] = useState<"default" | "destructive">("default");
  const [selectedCategory, setSelectedCategory] = useState<string>("all"); // Default to "all" for showing all products

  useEffect(() => {
    const fetchStorefront = async () => {
      try {
        const response = await fetch(`${BACKEND_URL}/api/v1/global/storefront/${name}`);
        const result = await response.json();

        if (!response.ok) {
          throw new Error(result.message || "Failed to fetch storefront data");
        }

        setStorefront(result);
        setLoading(false);
      } catch (error: any) {
        setError(error.message);
        setLoading(false);
        setToastMessage(error.message);
        setToastVariant("destructive");
        setToastOpen(true);
      }
    };

    if (name) {
      fetchStorefront();
    }
  }, [name]);

  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategory(categoryId);
  };

  const filteredProducts = selectedCategory !== "all"
    ? storefront?.categories.find((category: any) => category.id === selectedCategory)?.products || []
    : storefront?.categories.flatMap((category: any) => category.products) || [];

  return (
    <ToastProvider swipeDirection="right">
      <div className="container mx-auto py-8">
        {/* <h1 className="text-3xl font-semibold mb-6 text-center">Storefront: {name}</h1> */}

        {loading ? (
          <Skeleton className="h-20 w-full" />
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : storefront ? (
          <div>
            {/* Storefront Details */}
            <div className="bg-white p-6 rounded-lg shadow-lg mb-8 flex flex-col items-center text-center">
              <img
                src={storefront.imageUrl || "/placeholder.jpg"}
                alt={storefront.name}
                className="w-64 h-64 object-cover rounded-full shadow-lg mb-4"
              />
              <h2 className="text-4xl font-bold mt-4">{storefront.name}</h2>
              <p className="mt-2 text-gray-700">{storefront.description}</p>
            </div>

            {/* Category Select Menu */}
            <div className="flex justify-center mb-8">
              <div className="w-full max-w-md">
                <Label htmlFor="categorySelect" className="text-xl font-semibold mb-2">
                  Filter by Category
                </Label>
                <Select onValueChange={handleCategoryChange} defaultValue="all">
                  <SelectTrigger id="categorySelect">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Products</SelectItem>
                    {storefront.categories.map((category: any) => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Products */}
            <h3 className="text-2xl font-bold mb-4 text-center">
              {selectedCategory === "all" ? "All Products" : "Filtered Products"}
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProducts.map((product: any) => (
                <div key={product.id} className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition">
                  <img
                    src={product.productImageUrl || "/placeholder.jpg"}
                    alt={product.name}
                    className="w-full h-40 object-cover rounded-lg mb-4"
                  />
                  <h5 className="text-xl font-semibold">{product.name}</h5>
                  <p className="text-gray-700 mt-2">{product.description}</p>
                  <p className="text-green-600 font-bold mt-2">${product.price}</p>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <p className="text-gray-500">Storefront not found</p>
        )}

        <Toast open={toastOpen} onOpenChange={setToastOpen} variant={toastVariant}>
          <ToastTitle>{toastMessage}</ToastTitle>
        </Toast>
        <ToastViewport />
      </div>
    </ToastProvider>
  );
};

export default StorefrontPage;
