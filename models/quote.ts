import { Schema, model, models } from "mongoose";

// Define the Comment Schema
const CommentSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  comment: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Main Quote Schema
const QuoteSchema = new Schema({
  creator: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  quote: {
    type: String,
    required: [true, "quote is required."],
  },
  author: {
    type: String,
    required: [true, "Author is required."],
  },
  category: {
    type: String,
    required: [true, "Category is required."],
  },
  isPrivate: {
    type: Boolean,
    default: false,
  },
  isDraft: {
    type: Boolean,
    default: false,
  },
  // Favorites field - an array of user IDs who have favorited this quote
  favorites: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  // Comments field - an array of comment objects
  comments: [CommentSchema],
});

// Create the Quote model
const Quote = models.Quote || model("Quote", QuoteSchema);

export default Quote;
