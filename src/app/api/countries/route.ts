export const dynamic = "force-static";

export async function GET() {
  const response = await fetch(
    "https://restcountries.com/v3.1/all?fields=name,flags",
  );
  const data = await response.json();

  return Response.json({ data });
}
