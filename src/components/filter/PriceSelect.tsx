"use client";

import { useMemo, useState } from "react";
import { Slider } from "@/components/ui/slider";
import { TProductFilter } from "@/types/product";
import { debounce } from "@/lib/utils";

type Props = {
  filters: TProductFilter;
  setFilters: (filters: TProductFilter) => void;
};

const PriceSelect = ({ filters, setFilters }: Props) => {
  const [value, setValue] = useState([10, 10000]);

  // Debounce the filter update
  const debouncedSetFilter = useMemo(() => {
    return debounce((val: number[]) => {
      setFilters({
        ...filters,
        minPrice: val[0],
        maxPrice: val[1],
      });
    }, 300);
  }, [filters]);

  return (
    <div className="grid w-full gap-3">
      <div className="flex items-center justify-end">
        <span className="text-muted-foreground text-sm">
          {value.join(" - ")}
        </span>
      </div>
      <Slider
        value={value}
        onValueChange={(val) => {
          setValue(val);
          debouncedSetFilter(val);
        }}
        min={0}
        max={10000}
        step={1}
      />
    </div>
  );
};

export default PriceSelect;
