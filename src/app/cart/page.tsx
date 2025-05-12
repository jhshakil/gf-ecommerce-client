"use client";

import { Button } from "@/components/ui/button";
import { useCart } from "@/context/cart.provider";
import Image from "next/image";
import Link from "next/link";

const Page = () => {
  const {
    cart,
    loading,
    cartTotal,
    updateCartItem,
    removeFromCart,
    clearCart,
  } = useCart();

  if (loading) {
    return (
      <div className="container py-8">
        <div className="space-y-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="h-32 animate-pulse rounded-lg bg-muted" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="container py-8">
      <h1 className="mb-8 text-3xl font-bold">Your Cart</h1>

      {cart.length === 0 ? (
        <div className="flex flex-col items-center justify-center space-y-4 py-12">
          <h3 className="text-xl font-semibold">Your cart is empty</h3>
          <p className="text-muted-foreground">
            Start shopping to add items to your cart
          </p>
          <Button asChild>
            <Link href="/">Browse Products</Link>
          </Button>
        </div>
      ) : (
        <div className="grid gap-8 md:grid-cols-3">
          <div className="space-y-4 md:col-span-2">
            {cart.map((item) => (
              <div
                key={item.product.id}
                className="flex gap-4 rounded-lg border p-4"
              >
                <div className="relative h-24 w-24 overflow-hidden rounded-md bg-muted">
                  <Image
                    src={item.product.image ?? "/images/placeholder.jpg"}
                    alt={item.product.name}
                    fill
                    priority
                    className="object-cover"
                  />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between">
                    <h3 className="font-medium">{item.product.name}</h3>
                    <span className="font-bold">
                      ${(item.product.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    ${item.product.price.toFixed(2)} each
                  </p>
                  <div className="mt-2 flex items-center gap-4">
                    <input
                      type="number"
                      min="1"
                      max={item.product.stock}
                      value={item.quantity}
                      onChange={(e) =>
                        updateCartItem(
                          item.product.id,
                          parseInt(e.target.value)
                        )
                      }
                      className="w-16 rounded border p-1 text-center"
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeFromCart(item.product.id)}
                    >
                      Remove
                    </Button>
                  </div>
                </div>
              </div>
            ))}
            <div className="flex justify-end">
              <Button variant="outline" onClick={clearCart}>
                Clear Cart
              </Button>
            </div>
          </div>
          <div className="rounded-lg border p-6">
            <h2 className="mb-4 text-xl font-semibold">Order Summary</h2>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${cartTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>Free</span>
              </div>
              <div className="flex justify-between border-t pt-4 font-bold">
                <span>Total</span>
                <span>${cartTotal.toFixed(2)}</span>
              </div>
              <Button className="w-full" asChild>
                <Link href="/checkout">Checkout</Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Page;
