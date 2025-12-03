import axios from "axios";
import { loadingService } from "./loading";
const API_URL = process.env.NEXT_PUBLIC_API_URL;
// const API_URL = "http://localhost:5000/api";

export interface Product {
  _id: string;
  name: string;
  categoryId: {
    _id: string;
    name: string;
    image?: string;
  };
  sellingPrice: number;
  beforePrice?: number;
  offerPercentage?: number;
  images: string[];
  colors: string[];
  youtubeVideoLinks: string[];
  dimensionImage?: string;
  productOverview?: string;
  specifications?: {
    designs?: string;
    material?: string;
    seater?: string;
    upholsteryMaterial?: string;
    legMaterial?: string;
    dimensions?: string;
    foam?: string;
    armrest?: string;
    shape?: string;
    note?: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface CreateProductData {
  name: string;
  categoryId: string;
  sellingPrice: number;
  beforePrice?: number;
  offerPercentage?: number;
  images?: File[];
  dimensionImage?: File;
  colors?: string[];
  youtubeVideoLinks?: string[];
  productOverview?: string;
  specifications?: {
    designs?: string;
    material?: string;
    seater?: string;
    upholsteryMaterial?: string;
    legMaterial?: string;
    dimensions?: string;
    foam?: string;
    armrest?: string;
    shape?: string;
    note?: string;
  };
}

// CREATE PRODUCT

export const createProduct = async (data: CreateProductData) => {
  loadingService.startLoading(); // Add here
  try {
    const formData = new FormData();

    formData.append("name", data.name);
    formData.append("categoryId", data.categoryId);
    formData.append("sellingPrice", data.sellingPrice.toString());

    if (data.beforePrice) {
      formData.append("beforePrice", data.beforePrice.toString());
    }

    if (data.offerPercentage) {
      formData.append("offerPercentage", data.offerPercentage.toString());
    }

    if (data.colors && data.colors.length > 0) {
      formData.append("colors", JSON.stringify(data.colors));
    }

    if (data.youtubeVideoLinks && data.youtubeVideoLinks.length > 0) {
      formData.append(
        "youtubeVideoLinks",
        JSON.stringify(data.youtubeVideoLinks)
      );
    }

    if (data.productOverview) {
      formData.append("productOverview", data.productOverview);
    }
    if (data.specifications) {
      formData.append("specifications", JSON.stringify(data.specifications));
    }
    // Append multiple product images
    if (data.images && data.images.length > 0) {
      data.images.forEach((image) => {
        formData.append("images", image);
      });
    }

    // Append dimension image
    if (data.dimensionImage) {
      formData.append("dimensionImage", data.dimensionImage);
    }

    const response = await axios.post(`${API_URL}/admin/products`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  } finally {
    loadingService.stopLoading(); // Add here
  }
};

// GET ALL PRODUCTS (with optional category filter)
export const getProducts = async (categoryId?: string) => {
  loadingService.startLoading(); // Add here
  try {
    const params = categoryId ? { categoryId } : {};
    const response = await axios.get(`${API_URL}/admin/products`, { params });
    return response.data;
  } finally {
    loadingService.stopLoading(); // Add here
  }
};

// GET SINGLE PRODUCT
export const getProductById = async (id: string) => {
  loadingService.startLoading(); // Add here
  try {
    const response = await axios.get(`${API_URL}/admin/products/${id}`);
    return response.data;
  } finally {
    loadingService.stopLoading(); // Add here
  }
};

// UPDATE PRODUCT
export const updateProduct = async (
  id: string,
  data: Partial<CreateProductData> & { existingImages?: string[] } // Add this type
) => {
  loadingService.startLoading(); // Add here
  try {
    const formData = new FormData();

    if (data.name) formData.append("name", data.name);
    if (data.categoryId) formData.append("categoryId", data.categoryId);
    if (data.sellingPrice)
      formData.append("sellingPrice", data.sellingPrice.toString());
    if (data.beforePrice)
      formData.append("beforePrice", data.beforePrice.toString());
    if (data.offerPercentage)
      formData.append("offerPercentage", data.offerPercentage.toString());
    if (data.productOverview)
      formData.append("productOverview", data.productOverview);
    if (data.specifications) {
      formData.append("specifications", JSON.stringify(data.specifications));
    }
    if (data.colors && data.colors.length > 0) {
      formData.append("colors", JSON.stringify(data.colors));
    }

    if (data.youtubeVideoLinks && data.youtubeVideoLinks.length > 0) {
      formData.append(
        "youtubeVideoLinks",
        JSON.stringify(data.youtubeVideoLinks)
      );
    }
    // Add existing images that should be kept
    if (data.existingImages) {
      formData.append("existingImages", JSON.stringify(data.existingImages));
    }

    // Append new product images if provided
    if (data.images && data.images.length > 0) {
      data.images.forEach((image) => {
        formData.append("images", image);
      });
    }

    // Append new dimension image if provided
    if (data.dimensionImage) {
      formData.append("dimensionImage", data.dimensionImage);
    }

    const response = await axios.put(
      `${API_URL}/admin/products/${id}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return response.data;
  } finally {
    loadingService.stopLoading(); // Add here
  }
};

// DELETE PRODUCT
export const deleteProduct = async (id: string) => {
  loadingService.startLoading(); // Add here
  try {
    const response = await axios.delete(`${API_URL}/admin/products/${id}`);
    return response.data;
  } finally {
    loadingService.stopLoading(); // Add here
  }
};
