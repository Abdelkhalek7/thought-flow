// app/api/user/[id]/favorites/route.ts

import { connectToDB } from "@/utils/database";
import Quote from "@/models/quote";
import User from "@/models/user";

export const GET = async (
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) => {
  const id = (await params).id; // Quote ID

  try {
    // Connect to the database
    await connectToDB();

    // Find the user by ID
    const user = await User.findById(id);
    if (!user) {
      return new Response("User not found", { status: 404 });
    }

    // Get all quotes where the user has favorited them
    const quotes = await Quote.find({ favorites: user._id }).populate(
      "creator",
      "username email"
    );
    if (!quotes.length) {
      return new Response("No favorite quotes found", { status: 404 });
    }

    // Return the list of favorite quotes
    return new Response(JSON.stringify(quotes), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error fetching favorite quotes:", error);
    return new Response("Internal server error", { status: 500 });
  }
};
