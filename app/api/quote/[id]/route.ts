import Quote from "@/models/quote";
import { connectToDB } from "@/utils/database";

export const GET = async (
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) => {
  try {
    await connectToDB();

    const quote = await Quote.findById((await params).id).populate("creator");
    if (!quote) return new Response("Quote Not Found", { status: 404 });

    return new Response(JSON.stringify(quote), { status: 200 });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return new Response("Internal Server Error", { status: 500 });
  }
};

export const PATCH = async (
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) => {
  const {
    content: quote,
    author,
    category,
    isPrivate,
    isDraft,
  } = await request.json();
  console.log("🚀 ~ category:", category);

  try {
    await connectToDB();

    // Find the existing quote by ID
    const existingQuote = await Quote.findById((await params).id);

    if (!existingQuote) {
      return new Response("Quote not found", { status: 404 });
    }

    // Update the quote with new data
    existingQuote.quote = quote;
    existingQuote.category = category;
    existingQuote.isPrivate = isPrivate;
    existingQuote.isDraft = isDraft;
    existingQuote.author = author;

    await existingQuote.save();

    return new Response("Successfully updated the Quotes", { status: 200 });
  } catch (error) {
    console.log("🚀 ~ error:", error);
    return new Response("Error Updating Quote", { status: 500 });
  }
};

export const DELETE = async (
  request: Request,
  {
    params,
  }: {
    params: Promise<{ id: string }>;
  }
) => {
  try {
    await connectToDB();

    // Find the quote by ID and remove it
    await Quote.findByIdAndDelete((await params).id);

    return new Response("Quote deleted successfully", { status: 200 });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return new Response("Error deleting quote", { status: 500 });
  }
};
