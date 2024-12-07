"use server";

import { TCountry } from "@/lib/types";
import { revalidatePath } from "next/cache";

const API_URL = `${
  process.env.NODE_ENV === "development"
    ? "http://localhost:3000"
    : "https://" + process.env.VERCEL_PROJECT_PRODUCTION_URL
}/api/countries`;
const NUMBER_OF_CHOICES = 4;
const NUMBER_OF_QUESTIONS = 10;

export async function getCountries() {
  const response = await fetch(API_URL, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch countries");
  }

  const { data } = await response.json();

  return data;
}

export async function getQuestion(availableCountries: TCountry[]) {
  const choices = [];
  const usedIndices = new Set<number>();

  // Select random countries for choices
  while (choices.length < NUMBER_OF_CHOICES) {
    const randomIndex = Math.floor(Math.random() * availableCountries.length);
    if (!usedIndices.has(randomIndex)) {
      usedIndices.add(randomIndex);
      choices.push(availableCountries[randomIndex]);
    }
  }

  const answer = choices[Math.floor(Math.random() * choices.length)];

  return { answer, choices };
}

export async function getQuestions() {
  const countries = await getCountries();
  const questions = [];
  const usedAnswers = new Set<string>();

  // Create unique questions
  while (questions.length < NUMBER_OF_QUESTIONS) {
    const availableCountries = countries.filter(
      (country: TCountry) => !usedAnswers.has(country.name.common),
    );

    // Check if there are enough available countries left to form a question
    if (availableCountries.length < NUMBER_OF_CHOICES) {
      throw new Error("Not enough unique countries to generate questions");
    }

    const question = await getQuestion(availableCountries);

    // Add the answer to the usedAnswers set to avoid duplicates
    usedAnswers.add(question.answer.name.common);
    questions.push(question);
  }

  return questions;
}

export async function refresh() {
  revalidatePath("/");
}
