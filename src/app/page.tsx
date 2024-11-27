import Question from "@/components/question";
import { getQuestions } from "@/lib/actions";
import { Suspense } from "react";

export default async function Home() {
  const questions = await getQuestions();

  return (
    <main className="container mx-auto max-w-2xl px-4 py-12 sm:py-24">
      <h1 className="text-2xl font-semibold">What country is this?</h1>

      <Suspense fallback={<p>Loading...</p>}>
        <Question questions={questions} />
      </Suspense>
    </main>
  );
}
