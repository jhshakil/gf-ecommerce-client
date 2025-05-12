"use client";

import { useCart } from "@/context/cart.provider";
import { TProduct } from "@/types/product";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";

type Props = {
  product: TProduct;
};

const ProductCard = ({ product }: Props) => {
  const { addToCart } = useCart();

  return (
    <div className="group relative overflow-hidden rounded-lg border shadow-sm transition-all hover:shadow-md">
      <Link href={`/products/${product.id}`} className="block">
        <div className="relative aspect-square overflow-hidden bg-gray-100">
          <Image
            src={product.image ?? "/images/placeholder.jpg"}
            alt={product.name}
            width={400}
            height={400}
            className="h-full w-full object-cover transition-all group-hover:scale-105"
          />
          <Badge className="absolute top-2 right-2">
            {product.category.name}
          </Badge>
        </div>
        <div className="p-4">
          <h3 className="text-lg font-semibold">{product.name}</h3>

          <div className="mt-2 flex items-center justify-between">
            <span className="font-bold">${product.price.toFixed(2)}</span>
            <span className="text-sm text-gray-500">
              {product.rating} ★ ({product.stock} in stock)
            </span>
          </div>
        </div>
      </Link>
      <div className="p-4 pt-0">
        <Button
          className="w-full"
          onClick={(e) => {
            e.preventDefault();
            addToCart(product.id, 1);
          }}
        >
          Add to Cart
        </Button>
      </div>
    </div>
  );
};

export default ProductCard;
