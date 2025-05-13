"use client";

import { ProductProvider } from "@/context/product.provider";
import { CartProvider } from "@/context/cart.provider";
import { AuthProvider } from "@/context/auth.provider";
import { Toaster } from "@/components/ui/sonner";

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <ProductProvider>
      <CartProvider>
        <AuthProvider>
          {children}
          <Toaster position="top-right" />
        </AuthProvider>
      </CartProvider>
    </ProductProvider>
  );
};

export default Providers;
