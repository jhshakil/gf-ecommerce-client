import { TCategory } from "./category";

export type TProduct = {
  id: number;
  name: string;
  description: string;
  image: string;
  price: number;
  stock: number;
  rating: number;
  categoryId: number;
  category: TCategory;
};

export type TProductFilter = {
  category?: number;
  minPrice?: number;
  maxPrice?: number;
  minRating?: number;
  search?: string;
};
