import * as React from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";
import { cn } from "./ui/utils";

interface GemstoneSliderProps extends React.ComponentProps<typeof SliderPrimitive.Root> {
  color?: string;
}

export function GemstoneSlider({
  className,
  defaultValue,
  value,
  min = 0,
  max = 100,
  color = "#9333EA",
  ...props
}: GemstoneSliderProps) {
  const _values = React.useMemo(
    () =>
      Array.isArray(value)
        ? value
        : Array.isArray(defaultValue)
          ? defaultValue
          : [min, max],
    [value, defaultValue, min, max],
  );

  return (
    <SliderPrimitive.Root
      data-slot="slider"
      defaultValue={defaultValue}
      value={value}
      min={min}
      max={max}
      className={cn(
        "relative flex w-full touch-none items-center select-none data-[disabled]:opacity-50",
        className,
      )}
      {...props}
    >
      <SliderPrimitive.Track
        data-slot="slider-track"
        className="relative h-3 w-full grow overflow-hidden rounded-full bg-gray-200"
      >
        <SliderPrimitive.Range
          data-slot="slider-range"
          className="absolute h-full transition-all"
          style={{
            background: `linear-gradient(to right, ${color}99, ${color})`
          }}
        />
      </SliderPrimitive.Track>
      {Array.from({ length: _values.length }, (_, index) => (
        <SliderPrimitive.Thumb
          data-slot="slider-thumb"
          key={index}
          className="block size-6 shrink-0 rounded-full border-2 shadow-lg transition-all hover:scale-110 focus-visible:ring-4 focus-visible:outline-hidden disabled:pointer-events-none disabled:opacity-50"
          style={{
            backgroundColor: 'white',
            borderColor: color,
            boxShadow: `0 4px 12px ${color}40`
          }}
        />
      ))}
    </SliderPrimitive.Root>
  );
}
