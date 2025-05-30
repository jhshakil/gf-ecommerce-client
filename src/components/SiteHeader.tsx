"use client";

import Link from "next/link";
import { useCart } from "@/context/cart.provider";
// import {
//   NavigationMenu,
//   NavigationMenuItem,
//   NavigationMenuLink,
//   NavigationMenuList,
//   navigationMenuTriggerStyle,
// } from "@/components/ui/navigation-menu";

import { buttonVariants } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { cn } from "@/lib/utils";
import SiteHeaderAction from "./SiteHeaderAction";
import { useAuth } from "@/context/auth.provider";

const SiteHeader = () => {
  const { cartCount } = useCart();
  const { user } = useAuth();

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="container flex h-16 items-center justify-between">
        <div className="text-2xl font-bold">
          <Link href={"/"}>GF Shop</Link>
        </div>
        {/* <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuLink
                className={navigationMenuTriggerStyle()}
                asChild
              >
                <Link href={"/"} passHref>
                  Home
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink
                className={navigationMenuTriggerStyle()}
                asChild
              >
                <Link href={"/products"} passHref>
                  Products
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu> */}

        <div className="flex items-center gap-4">
          <Link
            href={"/cart"}
            className={cn(
              buttonVariants({ variant: "outline", size: "icon" }),
              "relative"
            )}
          >
            <ShoppingCart className="h-4 w-4" />
            {cartCount > 0 && (
              <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
                {cartCount}
              </span>
            )}
          </Link>
          <div>
            {user?.email ? (
              <SiteHeaderAction />
            ) : (
              <Link href={"/login"} className={cn(buttonVariants())}>
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default SiteHeader;
