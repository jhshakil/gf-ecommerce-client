export type Product = {
  id: number;
  name: string;
  description: string;
  image: string;
  price: number;
  stock: number;
  ratting: number;
  categoryId: number;
  category: {
    id: number;
    name: string;
    slug: string;
    image: string;
  };
};

export type ProductFilter = {
  category?: number;
  minPrice?: number;
  maxPrice?: number;
  minRating?: number;
  search?: string;
};
