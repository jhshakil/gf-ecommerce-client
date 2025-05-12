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

const HomeProducts = () => {
  return (
    <div className="container py-[100px]">
      <h2 className="text-[58px] leading-none font-bold text-center">
        NEW ARRIVALS
      </h2>
      <div className="mt-[55px]">
        <div className="grid grid-cols-3 justify-between gap-4">
          <CategorySelect />
          <div>
            <div className="border border-border rounded-full px-2 flex justify-between gap-2 items-center">
              <Input
                placeholder="Search Product"
                className="border-none focus:outline-none focus-visible:border-none focus-visible:ring-0"
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
                  <PriceSelect />
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuLabel>Filter by Rating</DropdownMenuLabel>
                <DropdownMenuItem>
                  <RatingSelect />
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeProducts;
