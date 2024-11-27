"use client";

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
      correct: "border-green-600 bg-green-50 fill-green-600 text-green-600",
      incorrect: "border-red-600 bg-red-50 fill-red-600 text-red-600",
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
  const [state, setState] = useState<"default" | "correct" | "incorrect">(
    "default",
  );

  const currentQuestion = questions[questionIndex];

  function handleQuestion() {
    if (!selectedCountry) return;

    setState(
      selectedCountry === currentQuestion.answer.name.common
        ? "correct"
        : "incorrect",
    );
  }

  function handleNextQuestion() {
    if (questionIndex < questions.length - 1) {
      setQuestionIndex((prev) => prev + 1);
      setSelectedCountry("");
      setState("default");
    } else {
      console.log("All questions are completed!");
    }
  }

  return (
    <>
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
                      : selectedCountry === choice.name.common
                        ? "selected"
                        : "default",
              })}
              disabled={state !== "default"}
            />
          </Label>
        ))}
      </RadioGroup>
      <div className="mt-12 flex w-full items-center justify-between sm:mt-16">
        {state === "default" || state === "correct" ? (
          <Button
            variant="secondary"
            size="lg"
            className="bg-border text-muted-foreground hover:bg-border/90"
            onClick={handleNextQuestion}
            disabled={state === "correct" || selectedCountry !== ""}
          >
            Skip
          </Button>
        ) : (
          <p className="text-sm text-muted-foreground">
            The correct answer is{" "}
            <span className="font-semibold">
              {currentQuestion.answer.name.common}
            </span>
          </p>
        )}

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
