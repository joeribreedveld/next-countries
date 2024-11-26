import CountryChoicebox from "@/components/country-choicebox";
import { Button } from "@/components/ui/button";
import { getQuestion } from "@/lib/actions";
import Image from "next/image";

export default async function Home() {
  const { country, choices } = await getQuestion();

  return (
    <main className="container mx-auto max-w-2xl px-4 py-16 sm:py-24">
      <h1 className="text-2xl font-semibold">What country is this?</h1>
      <Image
        src={country.flags.svg}
        alt="Flag"
        width={288}
        height={192}
        className="mt-16 aspect-video h-48 rounded-md object-cover"
      />
      <CountryChoicebox choices={choices} />
      <div className="mt-16 flex w-full items-center justify-between">
        <Button variant="secondary" size="lg">
          Skip
        </Button>
        <Button size="lg">Check</Button>
      </div>
    </main>
  );
}
