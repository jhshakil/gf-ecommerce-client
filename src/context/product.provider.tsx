"use client";

import { getCategoriesService } from "@/services/CategoryService";
import { getProductsService } from "@/services/ProductService";
import { TCategory } from "@/types/category";
import { TProduct, TProductFilter } from "@/types/product";
import { createContext, useContext, useEffect, useState } from "react";

type ProductContextType = {
  products: TProduct[];
  categories: TCategory[];
  loading: boolean;
  filters: TProductFilter;
  setFilters: (filters: TProductFilter) => void;
  fetchProducts: () => Promise<void>;
  fetchCategories: () => Promise<void>;
};

const productContext = createContext<ProductContextType | undefined>(undefined);

export const ProductProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [products, setProducts] = useState<TProduct[]>([]);
  const [categories, setCategories] = useState<TCategory[]>([]);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState<TProductFilter>({});

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const resProducts = await getProductsService(filters);
      if (resProducts) setProducts(resProducts);
    } catch (error) {
      console.error("Failed to fetch products", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const resCategories = await getCategoriesService();
      if (resCategories) setCategories(resCategories);
    } catch (error) {
      console.error("failed to fetch categories", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [filters]);

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <productContext.Provider
      value={{
        products,
        categories,
        loading,
        filters,
        setFilters,
        fetchProducts,
        fetchCategories,
      }}
    >
      {children}
    </productContext.Provider>
  );
};

export const useProducts = () => {
  const context = useContext(productContext);
  if (context === undefined) {
    throw new Error("useProducts must be used within a ProductProvider");
  }

  return context;
};
