"use client";

import CategorySelect from "./filter/CategorySelect";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import PriceSelect from "./filter/PriceSelect";
import RatingSelect from "./filter/RatingSelect";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useProducts } from "@/context/product.provider";
import ProductCard from "./ProductCard";
import { useMemo, useState } from "react";
import { debounce } from "@/lib/utils";
import Pagination from "./Pagination";

const HomeProducts = () => {
  const { products, categories, loading, filters, setFilters } = useProducts();
  const [searchValue, setSearchValue] = useState("");

  const handleSearchChange = useMemo(() => {
    return debounce((value: string) => {
      setFilters({ ...filters, search: value });
    }, 300);
  }, [filters]);

  return (
    <div className="container py-[50px] md:py-[100px]">
      <h2 className="text-[32px] md:text-[42px] lg:text-[58px] leading-none font-bold text-center">
        NEW ARRIVALS
      </h2>
      <div className="mt-[55px]">
        <div className="hidden md:grid grid-cols-4 justify-between gap-4">
          <CategorySelect
            categories={categories}
            setFilters={setFilters}
            filters={filters}
          />
          <div className="col-span-2 flex justify-center">
            <div className="lg:w-[400px] border border-border rounded-sm pe-2 flex justify-between gap-2 items-center">
              <Input
                placeholder="Search Product"
                className="border-none focus:outline-none focus-visible:border-none focus-visible:ring-0"
                value={searchValue}
                onChange={(e) => {
                  setSearchValue(e.target.value);
                  handleSearchChange(e.target.value);
                }}
              />
              <Search />
            </div>
          </div>
          <div className="flex justify-end">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="w-[100px]">
                  Filter
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end">
                <DropdownMenuLabel>Filter by Price</DropdownMenuLabel>
                <DropdownMenuItem>
                  <PriceSelect setFilters={setFilters} filters={filters} />
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuLabel>Filter by Rating</DropdownMenuLabel>
                <DropdownMenuItem>
                  <RatingSelect setFilters={setFilters} filters={filters} />
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <div className="flex md:hidden flex-col gap-4">
          <div>
            <div className="border border-border rounded-sm pe-2 flex justify-between gap-2 items-center">
              <Input
                placeholder="Search Product"
                className="border-none focus:outline-none focus-visible:border-none focus-visible:ring-0"
                value={searchValue}
                onChange={(e) => {
                  setSearchValue(e.target.value);
                  handleSearchChange(e.target.value);
                }}
              />
              <Search />
            </div>
          </div>
          <div className="flex justify-between items-center gap-3">
            <CategorySelect
              categories={categories}
              setFilters={setFilters}
              filters={filters}
            />

            <div className="flex justify-end">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="w-[100px]">
                    Filter
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end">
                  <DropdownMenuLabel>Filter by Price</DropdownMenuLabel>
                  <DropdownMenuItem>
                    <PriceSelect setFilters={setFilters} filters={filters} />
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuLabel>Filter by Rating</DropdownMenuLabel>
                  <DropdownMenuItem>
                    <RatingSelect setFilters={setFilters} filters={filters} />
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-[55px]">
        {loading ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-64 animate-pulse rounded-lg bg-muted" />
            ))}
          </div>
        ) : products.length > 0 ? (
          <>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
            <div className="mt-8">
              <Pagination />
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center space-y-4 py-12">
            <h3 className="text-xl font-semibold">No products found</h3>
            <p className="text-muted-foreground">
              Try adjusting your search or filter to find what you are looking
              for.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomeProducts;
