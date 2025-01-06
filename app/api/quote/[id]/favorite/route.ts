// app/api/quote/[id]/favorites/route.ts

import { connectToDB } from "@/utils/database";
import Quote from "@/models/quote";

export const PUT = async (
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) => {
  const id = (await params).id; // Quote ID
  console.log("🚀 ~ id:", id);
  const { userId } = await request.json(); // User ID from the request body
  console.log("🚀 ~ userId:", userId);

  try {
    // Connect to the database
    await connectToDB();

    // Find the quote by ID
    const quote = await Quote.findById(id);
    console.log("🚀 ~ quote:", quote);
    if (!quote) {
      return new Response("Quote not found", { status: 404 });
    }

    // Check if the user has favorited this quote
    if (!quote.favorites.includes(userId)) {
      quote.favorites.push(userId);
      await quote.save();

      return new Response("Favorite added successfully", { status: 200 });
    }

    // Remove the user from the favorites list
    quote.favorites = quote.favorites.filter(
      (favorite: string) => favorite.toString() !== userId
    );
    await quote.save();

    return new Response("Favorite removed successfully", { status: 200 });
  } catch (error) {
    console.error("Error removing favorite:", error);
    return new Response("Internal server error", { status: 500 });
  }
};
