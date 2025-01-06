import { connectToDB } from "@/utils/database";
import User from "@/models/user";

interface UserUpdateRequest {
  email?: string;
  username?: string;
  image?: string;
  bio?: string;
  numQuotesCreated?: number;
  numFavorites?: number;
}

export const PUT = async (
  request: Request,
  { params }: { params: Promise<{ id: string }> }
): Promise<Response> => {
  try {
    const id = (await params).id;

    // Connect to the database
    await connectToDB();

    // Extract user ID from the query params

    if (!id || typeof id !== "string") {
      return new Response("Invalid user ID", { status: 404 });
    }

    // Parse the request body
    const { username, image, bio }: UserUpdateRequest = await request.json();

    // Find the user by ID
    const user = await User.findById(id);
    if (!user) {
      return new Response("User not found", { status: 404 });
    }

    // Update the user's data
    if (username) user.username = username;
    if (image) user.image = image;
    if (bio) user.bio = bio;

    // Save the updated user
    await user.save();

    return new Response("User updated successfully", { status: 200 });
  } catch (error) {
    console.error("Error updating user:", error);
    return new Response("Internal server error", { status: 500 });
  }
};

export const PATCH = async (
  request: Request,
  { params }: { params: Promise<{ id: string }> }
): Promise<Response> => {
  try {
    const id = (await params).id;

    // Connect to the database
    await connectToDB();

    // Extract user ID from the query params

    if (!id || typeof id !== "string") {
      return new Response("Invalid user ID", { status: 404 });
    }

    // Parse the request body
    const { image }: UserUpdateRequest = await request.json();

    // Find the user by ID
    const user = await User.findById(id);
    if (!user) {
      return new Response("User not found", { status: 404 });
    }

    // Update the user's data
    if (image) user.image = image;

    // Save the updated user
    await user.save();

    return new Response("User updated successfully", { status: 200 });
  } catch (error) {
    console.error("Error updating user:", error);
    return new Response("Internal server error", { status: 500 });
  }
};
