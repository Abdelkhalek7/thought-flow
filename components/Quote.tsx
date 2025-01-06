import { useState } from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Heart, Edit, MoreVertical } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface QuoteProps {
  id: string;
  content: string;
  author: string;
  category: string;
  isPrivate: boolean;
  isDraft: boolean;
  creatorName: string;
  creatorAvatar: string;
  isFavorited: boolean;
  isCreator: boolean;
  onFavorite: (id: string) => void;
  onEdit: (id: string) => void;
}

export function Quote({
  id,
  content,
  author,
  category,
  isPrivate,
  isDraft,
  creatorName,
  creatorAvatar,
  isFavorited,
  isCreator,
  onFavorite,
  onEdit,
}: QuoteProps) {
  const [favorited, setFavorited] = useState(isFavorited);

  const handleFavorite = () => {
    onFavorite(id);
    setFavorited(!favorited);
  };

  return (
    <Card className="w-full max-w-md">
      <CardContent className="pt-6">
        <div className="flex justify-between items-start mb-4">
          <blockquote className="text-lg italic">{content}</blockquote>
          <Badge variant="secondary">{category}</Badge>
        </div>
        <p className="text-right">- {author}</p>
        {(isPrivate || isDraft) && (
          <div className="mt-2 flex justify-end space-x-2">
            {isPrivate && <Badge variant="outline">Private</Badge>}
            {isDraft && <Badge variant="outline">Draft</Badge>}
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Avatar className="w-8 h-8">
            <AvatarImage src={creatorAvatar} alt={creatorName} />
            <AvatarFallback>{creatorName.charAt(0)}</AvatarFallback>
          </Avatar>
          <span className="text-sm">{creatorName}</span>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="icon" onClick={handleFavorite}>
            <Heart
              className={`h-5 w-5 ${
                favorited ? "fill-red-500 text-red-500" : ""
              }`}
            />
          </Button>
          {isCreator && (
            <Button variant="ghost" size="icon" onClick={() => onEdit(id)}>
              <Edit className="h-5 w-5" />
            </Button>
          )}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <MoreVertical className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Share</DropdownMenuItem>
              <DropdownMenuItem>Report</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardFooter>
    </Card>
  );
}
