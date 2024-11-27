import Question from "@/components/question";
import { Suspense } from "react";

export default async function Home() {
  // const questions = await getQuestions();

  const questions = [
    {
      answer: {
        name: {
          common: "Afghanistan",
        },
        flags: {
          svg: "https://restcountries.com/data/afg.svg",
        },
      },
      choices: [
        {
          name: {
            common: "Afghanistan",
          },
          flags: {
            svg: "https://restcountries.com/data/afg.svg",
          },
        },
        {
          name: {
            common: "Albania",
          },
          flags: {
            svg: "https://restcountries.com/data/alb.svg",
          },
        },
        {
          name: {
            common: "Algeria",
          },
          flags: {
            svg: "https://restcountries.com/data/dza.svg",
          },
        },
        {
          name: {
            common: "Andorra",
          },
          flags: {
            svg: "https://restcountries.com/data/and.svg",
          },
        },
      ],
    },
  ];

  return (
    <main className="container mx-auto max-w-2xl px-4 py-16 sm:py-24">
      <h1 className="text-2xl font-semibold">What country is this?</h1>

      <Suspense fallback={<p>Loading...</p>}>
        <Question questions={questions} />
      </Suspense>
    </main>
  );
}
