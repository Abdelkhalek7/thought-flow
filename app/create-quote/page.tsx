"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import axios from "axios";
import { useSession } from "next-auth/react";
import { Spinner } from "@/components/smallLoading";

export default function CreateQuotePage() {
  const { data: session } = useSession();
  const [isSaving, setIsSaving] = useState(false);
  const [quote, setQuote] = useState({
    content: "",
    author: "",
    category: "",
    isPrivate: false,
  });
  const handelDraft = () => {};

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setQuote({ ...quote, [e.target.name]: e.target.value });
    console.log("🚀 ~ CreateQuotePage ~ quote:", quote);
  };

  const handleSelectChange = (value: string) => {
    setQuote({ ...quote, category: value });
  };

  const handleSwitchChange = (checked: boolean) => {
    setQuote({ ...quote, isPrivate: checked });
  };

  const handleSubmit = (e: React.FormEvent) => {
    setIsSaving(true);
    e.preventDefault();
    // Here you would typically send the quote to your backend
    axios
      .post("/api/quote/new", {
        ...quote,
        userId: session?.user?.id,
        isDraft: false,
      })
      .then((response) => {
        console.log("Quote submitted successfully:", response.data);
        setIsSaving(false);
        // Reset form  after successful submission
        setQuote({
          content: "",
          author: "",
          category: "",
          isPrivate: false,
        });
      });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Create New Quote</h1>
      <Card>
        <form onSubmit={handleSubmit}>
          <CardHeader>
            <CardTitle>New Quote</CardTitle>
            <CardDescription>
              Share your inspiration with the world
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="content">Quote Content</Label>
              <Textarea
                id="content"
                name="content"
                value={quote.content}
                onChange={handleChange}
                placeholder="Enter your quote here..."
                required
                rows={4}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="author">Author</Label>
              <Input
                id="author"
                name="author"
                value={quote.author}
                onChange={handleChange}
                required
                placeholder="Who said or wrote this?"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select onValueChange={handleSelectChange} required>
                <SelectTrigger>
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="inspiration">Inspiration</SelectItem>
                  <SelectItem value="motivation">Motivation</SelectItem>
                  <SelectItem value="wisdom">Wisdom</SelectItem>
                  <SelectItem value="humor">Humor</SelectItem>
                  <SelectItem value="love">Love</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                id="isPrivate"
                checked={quote.isPrivate}
                onCheckedChange={handleSwitchChange}
              />
              <Label htmlFor="isPrivate">Make this quote private</Label>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={handelDraft}>
              Save as Draft
            </Button>
            <Button type="submit">
              {isSaving ? <Spinner /> : "Publish Quote"}
            </Button>
          </CardFooter>
        </form>
      </Card>
      <Alert className="mt-8">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Tip</AlertTitle>
        <AlertDescription>
          Double-check your quote for accuracy before publishing. You can always
          edit it later!
        </AlertDescription>
      </Alert>
    </div>
  );
}
