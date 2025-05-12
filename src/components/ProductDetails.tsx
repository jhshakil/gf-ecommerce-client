"use client";

import { Star } from "lucide-react";
import Image from "next/image";
import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";
import { TProduct } from "@/types/product";
import { addToCartService } from "@/services/CartService";

type Props = {
  product: TProduct;
};

const ProductDetails = ({ product }: Props) => {
  return (
    <div className="container py-8">
      <div className="grid gap-8 md:grid-cols-3">
        <div className="overflow-hidden rounded-lg border bg-muted">
          <Image
            src={product.image ?? "/images/placeholder.jpg"}
            alt={product.name}
            width={500}
            height={500}
            priority
            className="w-full aspect-square object-cover"
          />
        </div>
        <div className="space-y-4 md:col-span-2">
          <h1 className="text-3xl font-bold">{product.name}</h1>
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold">
              ${product.price.toFixed(2)}
            </span>
            {product.stock > 0 ? (
              <span className="text-sm text-green-600">
                In Stock ({product.stock})
              </span>
            ) : (
              <span className="text-sm text-red-600">Out of Stock</span>
            )}
          </div>
          <div className="flex items-center gap-1">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-5 w-5 ${
                    i < Math.floor(product.rating)
                      ? "fill-yellow-400 text-yellow-400"
                      : "fill-muted text-muted-foreground"
                  }`}
                />
              ))}
            </div>
            <span className="text-sm text-muted-foreground">
              ({product.rating.toFixed(1)})
            </span>
          </div>
          <p className="text-muted-foreground">{product.description}</p>
          <div className="flex gap-4 pt-4">
            <Button
              size="lg"
              disabled={product.stock <= 0}
              onClick={() => addToCartService(product.id, 1)}
            >
              Add to Cart
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href="/cart">View Cart</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
