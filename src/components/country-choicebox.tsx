"use client";

import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";
import { useState } from "react";

const countries = ["germany", "netherlands", "england", "italy"];

export default function CountryChoicebox() {
  const [selectedCountry, setSelectedCountry] = useState("");

  return (
    <RadioGroup
      defaultValue={selectedCountry}
      className="mx-auto mt-12 grid max-w-3xl gap-3 sm:grid-cols-2"
      onValueChange={(value) => setSelectedCountry(value)}
    >
      {countries.map((country) => (
        <Label
          key={country}
          htmlFor={country}
          className={cn(
            "flex h-16 items-center justify-between rounded-md border bg-white px-6 capitalize hover:cursor-pointer",
            selectedCountry === country && "border-primary",
          )}
        >
          <span className="text-sm">{country}</span>
          <RadioGroupItem value={country} id={country} className="h-4 w-4" />
        </Label>
      ))}
    </RadioGroup>
  );
}
