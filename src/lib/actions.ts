export async function getCountries() {
  const response = await fetch("http://localhost:3000/api/countries");

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

  while (choices.length < 4) {
    const randomIndex = Math.floor(Math.random() * countries.length);
    if (!usedIndices.has(randomIndex)) {
      usedIndices.add(randomIndex);
      choices.push(countries[randomIndex]);
    }
  }

  const country = choices[Math.floor(Math.random() * choices.length)];

  return { country, choices };
}
