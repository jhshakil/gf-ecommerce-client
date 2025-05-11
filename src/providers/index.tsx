"use client";

import { ProductProvider } from "@/context/product.provider";
import { CartProvider } from "@/context/cart.provider";

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <ProductProvider>
      <CartProvider>{children}</CartProvider>
    </ProductProvider>
  );
};

export default Providers;
