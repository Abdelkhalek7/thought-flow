import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Edit2, Save } from "lucide-react";
import { CldUploadWidget, CloudinaryUploadWidgetInfo } from "next-cloudinary";

interface Profile {
  username: string;
  email: string;
  image: string;
  bio: string;
  numQuotesCreated?: number;
  numFavorites?: number;
  createdAt?: string;
}

interface ProfileViewProps {
  profile: Profile;
  onSave: (profile: Profile) => void;
  onImageSave: (profile: Profile) => void;
}

export function ProfileView({
  profile,
  onSave,
  onImageSave,
}: ProfileViewProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState(profile);
  const [resource, setResource] = useState<
    string | CloudinaryUploadWidgetInfo | undefined
  >();
  console.log("🚀 ~ ProfileView ~ resource:", resource);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    setIsEditing(false);
    onSave(editedProfile);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setEditedProfile({ ...editedProfile, [e.target.name]: e.target.value });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">My Profile</h1>
      <div className="grid md:grid-cols-3 gap-8">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle className="flex justify-between items-center">
              Profile Information
              <Button
                variant="outline"
                size="sm"
                onClick={isEditing ? handleSave : handleEdit}
              >
                {isEditing ? (
                  <Save className="mr-2 h-4 w-4" />
                ) : (
                  <Edit2 className="mr-2 h-4 w-4" />
                )}
                {isEditing ? "Save" : "Edit"}
              </Button>
            </CardTitle>
            <CardDescription>Manage your profile information</CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username">Name</Label>
                <Input
                  id="username"
                  name="username"
                  value={editedProfile.username}
                  onChange={handleChange}
                  disabled={!isEditing}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={editedProfile.email}
                  onChange={handleChange}
                  disabled={!isEditing}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <Textarea
                  id="bio"
                  name="bio"
                  value={editedProfile.bio}
                  onChange={handleChange}
                  disabled={!isEditing}
                  rows={4}
                />
              </div>
            </form>
          </CardContent>
        </Card>
        <div className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Profile Picture</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center">
              <Avatar className="w-32 h-32 mb-4">
                <AvatarImage src={editedProfile.image} alt="Profile picture" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <CldUploadWidget
                signatureEndpoint="/api/sign-cloudinary-params"
                onSuccess={(result) => {
                  console.log("🚀 ~ ProfileView ~ result:", !result);
                  //   setResource(result?.info); // { public_id, secure_url, etc }

                  if (typeof result !== "string" && result?.info) {
                    if (result.info && typeof result.info !== "string") {
                      onImageSave({
                        ...editedProfile,
                        image: result.info.secure_url,
                      });
                      setEditedProfile({
                        ...editedProfile,
                        image: result?.info.secure_url,
                      });
                    }
                  }
                }}
                onQueuesEnd={(result, { widget }) => {
                  widget.close();
                }}
              >
                {({ open }) => {
                  function handleOnClick() {
                    setResource(undefined);
                    open();
                  }
                  return (
                    <button onClick={handleOnClick}>Upload an Image</button>
                  );
                }}
              </CldUploadWidget>
              <Button variant="outline">Change Picture</Button>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Account Statistics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p>Quotes Created: {editedProfile.numQuotesCreated}</p>
                <p>Favorites: {editedProfile.numFavorites}</p>
                <p>Member Since: {editedProfile.createdAt}</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      <Card className="mt-8">
        <CardHeader>
          <CardTitle>My Quotes</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="published">
            <TabsList>
              <TabsTrigger value="published">Published</TabsTrigger>
              <TabsTrigger value="drafts">Drafts</TabsTrigger>
            </TabsList>
            <TabsContent value="published">
              <p>Your published quotes will appear here.</p>
            </TabsContent>
            <TabsContent value="drafts">
              <p>Your draft quotes will appear here.</p>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
