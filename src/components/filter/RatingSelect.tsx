"use client";

import { useState } from "react";
import { Slider } from "@/components/ui/slider";

const RatingSelect = () => {
  const [value, setValue] = useState([1, 5]);

  return (
    <div className="grid w-full gap-3">
      <div className="flex items-center justify-end">
        <span className="text-muted-foreground text-sm">
          {value.join("- ")}
        </span>
      </div>
      <Slider value={value} onValueChange={setValue} min={1} max={5} step={1} />
    </div>
  );
};

export default RatingSelect;
