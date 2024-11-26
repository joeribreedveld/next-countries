"use client";

import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { TCountry } from "@/lib/types";
import { cn } from "@/lib/utils";
import { useState } from "react";

export default function CountryChoicebox({ choices }: { choices: TCountry[] }) {
  const [selectedCountry, setSelectedCountry] = useState("");

  return (
    <RadioGroup
      defaultValue={selectedCountry}
      className="mx-auto mt-12 grid max-w-3xl gap-3 sm:grid-cols-2"
      onValueChange={(value) => setSelectedCountry(value)}
    >
      {choices.map((choice) => (
        <Label
          key={choice.name.common}
          htmlFor={choice.name.common}
          className={cn(
            "flex h-16 items-center justify-between rounded-md border bg-white px-6 capitalize hover:cursor-pointer",
            selectedCountry === choice.name.common &&
              "border-blue-400 bg-blue-50 text-blue-600",
          )}
        >
          <span className="text-sm">{choice.name.common}</span>
          <RadioGroupItem
            value={choice.name.common}
            id={choice.name.common}
            className={cn(
              "h-4 w-4 text-inherit",
              selectedCountry === choice.name.common &&
                "border-blue-600 bg-white fill-blue-600 text-blue-600",
            )}
          />
        </Label>
      ))}
    </RadioGroup>
  );
}
