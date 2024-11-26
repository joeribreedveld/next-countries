import CountryChoicebox from "@/components/country-choicebox";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default async function Home() {
  const response = await fetch(
    "https://restcountries.com/v3.1/name/netherlands",
  );
  const result = await response.json();
  const country = result[0];

  return (
    <main className="container mx-auto max-w-2xl px-4 py-16 sm:py-24">
      <h1 className="text-2xl font-semibold">What country is this?</h1>
      <Image
        src={country.flags.svg}
        alt="Flag"
        width={288}
        height={192}
        className="mt-16 rounded-md"
      />
      <CountryChoicebox />
      <div className="mt-16 flex w-full items-center justify-between">
        <Button variant="secondary" size="lg">
          Skip
        </Button>
        <Button size="lg">Check</Button>
      </div>
    </main>
  );
}
