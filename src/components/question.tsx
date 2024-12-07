"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { TCountry } from "@/lib/types";
import { cva } from "class-variance-authority";
import Image from "next/image";
import { useState } from "react";

const labelVariants = cva(
  "flex h-16 items-center justify-between gap-4 rounded-md border bg-white px-6 capitalize hover:cursor-pointer",
  {
    variants: {
      state: {
        default: "",
        selected: "border-blue-400 bg-blue-50 text-blue-600",
        correct: "border-green-400 bg-green-50 text-green-600",
        incorrect: "border-red-400 bg-red-50 text-red-600",
        correctHighlight: "border-green-400 bg-green-50 text-green-600",
      },
    },
    defaultVariants: {
      state: "default",
    },
  },
);

const radioItemVariants = cva("h-4 w-4 text-inherit", {
  variants: {
    state: {
      default: "",
      selected: "border-blue-600 bg-white fill-blue-600 text-blue-600",
      correct: "border-green-600 bg-white fill-green-600 text-green-600",
      incorrect: "border-red-600 bg-white fill-red-600 text-red-600",
      correctHighlight:
        "border-green-600 bg-white fill-green-600 text-green-600",
    },
  },
  defaultVariants: {
    state: "default",
  },
});

const buttonStateVariants = cva("bg-primary text-white hover:bg-primary/90", {
  variants: {
    state: {
      default: "",
      correct: "bg-green-600 hover:bg-green-600/90",
      incorrect: "bg-red-600 hover:bg-red-600/90",
    },
  },
  defaultVariants: {
    state: "default",
  },
});

const badgeVariants = cva(
  "h-6 !max-w-5 py-0 px-0 !max-h-5 overflow-hidden rounded-full !text-transparent",
  {
    variants: {
      status: {
        correct: "sm:bg-green-100 bg-green-200 border-green-400 text-green-600",
        incorrect: "sm:bg-red-100 bg-red-200 border-red-400 text-red-600",
        skipped: "sm:bg-zinc-100 bg-zinc-200 border-zinc-400 text-zinc-600",
      },
    },
    defaultVariants: {
      status: "correct",
    },
  },
);

export default function Question({
  questions,
}: {
  questions: {
    answer: TCountry;
    choices: TCountry[];
  }[];
}) {
  const [questionIndex, setQuestionIndex] = useState(0);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [state, setState] = useState<
    "default" | "correct" | "incorrect" | "finished"
  >("default");
  const [results, setResults] = useState<{
    [key: string]: { correct: boolean; selected?: string };
  }>({});

  const currentQuestion = questions[questionIndex];

  function handleRestart() {
    setQuestionIndex(0);
    setSelectedCountry("");
    setState("default");
    setResults({});
  }

  function handleQuestion() {
    if (!selectedCountry) return;

    const isCorrect = selectedCountry === currentQuestion.answer.name.common;
    setState(isCorrect ? "correct" : "incorrect");

    setResults((prev) => ({
      ...prev,
      [currentQuestion.answer.name.common]: {
        correct: isCorrect,
        selected: !isCorrect ? selectedCountry : undefined,
      },
    }));
  }

  function handleNextQuestion() {
    if (questionIndex < questions.length - 1) {
      setQuestionIndex((prev) => prev + 1);
      setSelectedCountry("");
      setState("default");
    } else {
      setState("finished");
    }
  }

  if (state === "finished") {
    return (
      <>
        <h1 className="text-2xl font-semibold">Results</h1>
        <ul className="mt-12 grid gap-3 sm:mt-16">
          {questions.map((question) => (
            <li
              key={question.answer.name.common}
              className="flex items-center justify-between gap-8 rounded-md border bg-white p-4"
            >
              <div className="flex items-center gap-6">
                <Image
                  src={question.answer.flags.svg}
                  alt="Flag"
                  width={72}
                  height={48}
                  className="aspect-video h-10 w-16 rounded-sm object-cover sm:h-12 sm:w-20"
                />
                <h2 className="text-sm font-semibold">
                  {question.answer.name.common}
                  {!results[question.answer.name.common]?.correct &&
                    results[question.answer.name.common]?.selected && (
                      <span className="ml-4 hidden font-medium text-muted-foreground line-through sm:block">
                        {results[question.answer.name.common].selected}
                      </span>
                    )}
                </h2>
              </div>
              <Badge
                className={badgeVariants({
                  status: results[question.answer.name.common]?.correct
                    ? "correct"
                    : results[question.answer.name.common]?.selected
                      ? "incorrect"
                      : "skipped",
                })}
              >
                {results[question.answer.name.common]?.correct
                  ? "Correct"
                  : results[question.answer.name.common]?.selected
                    ? "Incorrect"
                    : "Skipped"}
              </Badge>
            </li>
          ))}
        </ul>
        <Button
          size="lg"
          onClick={() => handleRestart()}
          className="mt-12 bg-primary text-white hover:bg-primary/90 sm:mt-16"
        >
          Restart
        </Button>
      </>
    );
  }

  return (
    <>
      <h1 className="text-2xl font-semibold">What country is this?</h1>
      <Image
        src={currentQuestion.answer.flags.svg}
        alt="Flag"
        width={288}
        height={192}
        className="mt-12 aspect-video h-48 rounded-md object-cover sm:mt-16"
      />
      <RadioGroup
        value={selectedCountry}
        className="mx-auto mt-12 grid gap-3 sm:grid-cols-2"
        onValueChange={(value) =>
          state === "default" && setSelectedCountry(value)
        }
        disabled={state !== "default"}
      >
        {currentQuestion.choices.map((choice) => (
          <Label
            key={choice.name.common}
            htmlFor={choice.name.common}
            className={labelVariants({
              state:
                state === "correct" && selectedCountry === choice.name.common
                  ? "correct"
                  : state === "incorrect" &&
                      selectedCountry === choice.name.common
                    ? "incorrect"
                    : state === "incorrect" &&
                        choice.name.common ===
                          currentQuestion.answer.name.common
                      ? "correctHighlight"
                      : selectedCountry === choice.name.common
                        ? "selected"
                        : "default",
            })}
          >
            <span className="line-clamp-1 text-sm">{choice.name.common}</span>

            <RadioGroupItem
              value={choice.name.common}
              id={choice.name.common}
              className={radioItemVariants({
                state:
                  state === "correct" && selectedCountry === choice.name.common
                    ? "correct"
                    : state === "incorrect" &&
                        selectedCountry === choice.name.common
                      ? "incorrect"
                      : state === "incorrect" &&
                          choice.name.common ===
                            currentQuestion.answer.name.common
                        ? "correctHighlight"
                        : selectedCountry === choice.name.common
                          ? "selected"
                          : "default",
              })}
            />
          </Label>
        ))}
      </RadioGroup>
      <div className="mt-12 flex w-full items-center justify-between gap-12 sm:mt-16">
        <Button
          variant="secondary"
          size="lg"
          className="bg-border text-muted-foreground hover:bg-border/90"
          onClick={handleNextQuestion}
          disabled={state !== "default"}
        >
          Skip
        </Button>
        <Button
          size="lg"
          onClick={state === "default" ? handleQuestion : handleNextQuestion}
          className={buttonStateVariants({ state })}
        >
          {state === "default" ? "Check" : "Continue"}
        </Button>
      </div>
    </>
  );
}
