"use client";

import { useState, useEffect } from "react";
import axios from "axios";

import { EditQuoteModal } from "@/components/EditQuoteModal";
import { Quote } from "@/components/Quote";

import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search } from "lucide-react";

interface IQuote {
  _id: string;
  content: string;
  author: string;
  creatorName: string;
  creatorAvatar: string;
  isFavorited: boolean;
  isPrivate: boolean;
  isCreator: boolean;
  isDraft: boolean;
  category?: string;
}
interface QuoteDTO {
  _id: string;
  quote: string;
  author: string;
  category: string;
  creator: {
    username: string;
    image: string;
  };
  isFavorited: boolean;
  isPrivate: boolean;
  isDraft: boolean;
}

interface LoggedInContentProps {
  userID: string;
}

export const LoggedInContent = ({ userID }: LoggedInContentProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("latest");
  const [filterBy, setFilterBy] = useState("all");
  const [quotes, setQuotes] = useState<IQuote[]>([]);
  const [editingQuote, setEditingQuote] = useState<{
    id: string;
    content: string;
    author: string;
    category: string;
    isPrivate: boolean;
    isDraft: boolean;
  } | null>(null);

  useEffect(() => {
    axios.get("/api/quote?id=" + userID).then((res) => {
      const formattedQuotes = res.data.map((quote: QuoteDTO) => ({
        _id: quote._id,
        content: quote.quote,
        author: quote.author,
        category: quote.category,
        creatorName: quote.creator.username,
        creatorAvatar: quote.creator.image,
        isFavorited: quote.isFavorited,
        isPrivate: quote.isPrivate,
        isCreator: true,
      }));
      setQuotes(formattedQuotes);

      console.log("🚀 ~ axios.get ~ formattedQuotes:", formattedQuotes);
    });
  }, [sortBy, filterBy, userID]);

  const handleFavorite = async (id: string) => {
    console.log(`Favorited quote with id: ${id}`);

    try {
      const response = await fetch(`/api/quote/${id}/favorite`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: userID }),
      });

      if (response.ok) {
        console.log("Quote favorited successfully");
      } else {
        console.error("Error favoriting quote:", await response.text());
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleEdit = (id: string) => {
    const quoteToEdit = quotes.find((quote) => quote._id === id);
    if (quoteToEdit) {
      setEditingQuote({
        id: quoteToEdit._id,
        content: quoteToEdit.content,
        author: quoteToEdit.author,
        category: quoteToEdit.category || "",
        isPrivate: quoteToEdit.isPrivate,
        isDraft: quoteToEdit.isDraft,
      });
    }
  };

  const handleSaveEdit = (updatedQuote: {
    content: string;
    author: string;
    category: string;
    isPrivate: boolean;
    isDraft: boolean;
  }) => {
    if (editingQuote) {
      setQuotes(
        quotes.map((quote) =>
          quote._id === editingQuote.id ? { ...quote, ...updatedQuote } : quote
        )
      );
      axios.patch(`/api/quote/${editingQuote.id}`, updatedQuote);
      setEditingQuote(null);
    }
  };

  const filteredQuotes = quotes.filter(
    (quote) =>
      (quote.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
        quote.author.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (filterBy === "all" ||
        (filterBy === "favorites" && quote.isFavorited) ||
        (filterBy === "my-quotes" && quote.isCreator))
  );

  return (
    <>
      <section className="mb-8">
        <div className="flex gap-4">
          <div className="relative flex-grow">
            <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              type="text"
              placeholder="Search quotes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="latest">Latest</SelectItem>
              <SelectItem value="oldest">Oldest</SelectItem>
              <SelectItem value="popular">Most Popular</SelectItem>
            </SelectContent>
          </Select>
          <Select value={filterBy} onValueChange={setFilterBy}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Quotes</SelectItem>
              <SelectItem value="favorites">Favorites</SelectItem>
              <SelectItem value="my-quotes">My Quotes</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Explore Quotes</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredQuotes.map((quote) => (
            <Quote
              key={quote._id}
              id={quote._id}
              content={quote.content}
              author={quote.author}
              creatorName={quote.creatorName}
              creatorAvatar={quote.creatorAvatar}
              isFavorited={quote.isFavorited}
              isCreator={quote.isCreator}
              category={quote.category || ""}
              isPrivate={quote.isPrivate}
              isDraft={quote.isDraft}
              onFavorite={handleFavorite}
              onEdit={handleEdit}
            />
          ))}
        </div>
      </section>

      <EditQuoteModal
        isOpen={!!editingQuote}
        onClose={() => setEditingQuote(null)}
        onSave={handleSaveEdit}
        quote={editingQuote}
      />
    </>
  );
};
