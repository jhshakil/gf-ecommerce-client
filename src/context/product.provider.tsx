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
  pagination: {
    page: number;
    pageSize: number;
    total: number;
  };
  setFilters: (filters: TProductFilter) => void;
  setPage: (page: number) => void;
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
  const [pagination, setPagination] = useState({
    page: 1,
    pageSize: 12,
    total: 0,
  });

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const params = {
        ...filters,
        page: pagination.page,
        limit: pagination.pageSize,
      };
      const resProducts = await getProductsService(params);
      if (resProducts) {
        const { data, total } = resProducts;
        setProducts(data);
        setPagination((prev) => ({ ...prev, total }));
      }
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

  const setPage = (page: number) => {
    setPagination((prev) => ({ ...prev, page }));
  };

  useEffect(() => {
    fetchProducts();
  }, [filters, pagination.page]);

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
        pagination,
        setFilters,
        setPage,
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
