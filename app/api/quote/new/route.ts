import Quote from "@/models/quote";
import { connectToDB } from "@/utils/database";

export const POST = async (request: Request) => {
  const {
    userId,
    content: quote,
    category,
    author,
    isPrivate,
    isDraft,
  } = await request.json();
  console.log(
    "🚀 ~ POST ~ userId, quote, category, isPrivate, isDraft:",
    userId,
    quote,
    category,
    isPrivate,
    isDraft
  );

  try {
    await connectToDB();
    const newQuote = new Quote({
      creator: userId,
      author,
      quote,
      category,
      isPrivate,
      isDraft,
    });

    await newQuote.save();
    return new Response(JSON.stringify(newQuote), { status: 201 });
  } catch (error) {
    console.log("🚀 ~ POST ~ error:", error);
    return new Response("Failed to create a new quote", { status: 500 });
  }
};
