const API_URL = `${
  process.env.NODE_ENV === "development"
    ? "http://localhost:3000"
    : process.env.VERCEL_PROJECT_PRODUCTION_URL
}/api/countries`;
const NUMBER_OF_CHOICES = 4;
const NUMBER_OF_QUESTIONS = 10;

export async function getCountries() {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error("Failed to fetch countries");
  }

  const { data } = await response.json();

  return data;
}

export async function getQuestion() {
  const countries = await getCountries();

  const choices = [];
  const usedIndices = new Set<number>();

  while (choices.length < NUMBER_OF_CHOICES) {
    const randomIndex = Math.floor(Math.random() * countries.length);
    if (!usedIndices.has(randomIndex)) {
      usedIndices.add(randomIndex);
      choices.push(countries[randomIndex]);
    }
  }

  const answer = choices[Math.floor(Math.random() * choices.length)];

  return { answer, choices };
}

export async function getQuestions() {
  const questions = [];

  for (let i = 0; i < NUMBER_OF_QUESTIONS; i++) {
    questions.push(await getQuestion());
  }

  return questions;
}
