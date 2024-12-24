"use client";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import React, { useState } from "react";
import ColorPicker from "react-best-gradient-color-picker";

export default function ColorPickerPopover({
  defaultColor,
  onChange,
  id,
  className,
  ...props
}: {
  defaultColor: string;
  onChange: (color: string) => void;
  id?: string;
  className?: string;
}) {
  const [color, setColor] = useState(defaultColor);
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);

    if (!open) {
      if (defaultColor !== color) {
        onChange(color);
      }
    }
  };

  return (
    <div id={id} className={className} {...props}>
      <Popover open={isOpen} onOpenChange={handleOpenChange}>
        <PopoverTrigger>
          <div className="p-2 border rounded-md bg-white hover:bg-slate-100">
            <div
              className="p-2 px-4"
              style={{
                backgroundColor: color,
              }}
            ></div>
          </div>
        </PopoverTrigger>
        <PopoverContent align="start" className="w-fit">
          <ColorPicker
            className="mt-2"
            value={color}
            onChange={setColor}
            width={300}
            height={160}
            hideGradientControls
            hideGradientStop
            hideGradientAngle
            hideGradientType
            hideColorGuide
            hideAdvancedSliders
            hideEyeDrop
            hidePresets
            hideColorTypeBtns
            hideControls
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
