import Quote from "@/models/quote";
import { connectToDB } from "@/utils/database";

export const GET = async (request: Request) => {
  const url = new URL(request.url);
  console.log("🚀 ~ GET ~ url:", url);
  const id = url.searchParams.get("id"); // replace "paramName" with the actual query param name you want to get
  console.log("🚀 ~ GET ~ id:", id);

  try {
    await connectToDB();

    const quotes = await Quote.find({}).populate("creator");

    const quotesWithFavoriteFlag = await Promise.all(
      quotes.map(async (quote) => {
        const isFavorited = quote.favorites.includes(id);
        return { ...quote.toObject(), isFavorited };
      })
    );

    return new Response(JSON.stringify(quotesWithFavoriteFlag), {
      status: 200,
    });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return new Response("Failed to fetch all quotes", { status: 500 });
  }
};
