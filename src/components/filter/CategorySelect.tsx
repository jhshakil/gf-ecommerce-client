"use client";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TCategory } from "@/types/category";
import { TProductFilter } from "@/types/product";
import { useState } from "react";

type Props = {
  categories: TCategory[];
  filters: TProductFilter;
  setFilters: (filters: TProductFilter) => void;
};

const CategorySelect = ({ categories, filters, setFilters }: Props) => {
  const [selectedCat, setSelectedCat] = useState<string>();

  return (
    <Select
      disabled={!categories.length}
      value={selectedCat}
      onValueChange={(value) => {
        setSelectedCat(value);
        setFilters({
          ...filters,
          category: selectedCat ? parseInt(selectedCat) : undefined,
        });
      }}
    >
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select Category" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {categories.map((category, i) => (
            <SelectItem
              key={`home-select-category-${i}-${category.id}`}
              value={String(category.id)}
            >
              {category.name}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default CategorySelect;
