"use client";

import { useState } from "react";
import { Slider } from "@/components/ui/slider";

const PriceSelect = () => {
  const [value, setValue] = useState([10, 10000]);

  return (
    <div className="grid w-full gap-3">
      <div className="flex items-center justify-end">
        <span className="text-muted-foreground text-sm">
          {value.join("- ")}
        </span>
      </div>
      <Slider
        value={value}
        onValueChange={setValue}
        min={0}
        max={10000}
        step={1}
      />
    </div>
  );
};

export default PriceSelect;
