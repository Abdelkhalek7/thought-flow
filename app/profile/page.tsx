"use client";
import axios from "axios";
import { format } from "date-fns";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { LoadingSpinner } from "@/components/Loading";
import { ProfileView } from "@/components/ProfileView";
import { toast } from "@/hooks/use-toast";

interface Profile {
  username: string;
  email: string;
  image: string;
  bio: string;
  numQuotesCreated?: number;
  numFavorites?: number;
  createdAt?: string;
}

export default function ProfilePage() {
  const { data: session, status, update } = useSession();
  const router = useRouter();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (status === "loading") {
      return;
    }

    if (status === "unauthenticated") {
      router.push("/");
      return;
    }

    if (session?.user) {
      setProfile({
        username: session.user.username || "",
        email: session.user.email || "",
        image: session.user.image || "",
        bio: session.user.bio || "",
        numQuotesCreated: session.user.numQuotesCreated || 0,
        numFavorites: session.user.numFavorites || 0,
        createdAt: session.user.createdAt
          ? format(new Date(session.user.createdAt), "MMMM do, yyyy")
          : "",
      });
      setIsLoading(false);
    }
  }, [status, session, router]);

  const handleSave = (updatedProfile: Profile) => {
    if (session?.user?.id) {
      axios
        .put(`/api/user/${session.user.id}`, {
          username: updatedProfile.username,
          image: updatedProfile.image,
          bio: updatedProfile.bio,
        })
        .then((response) => {
          console.log("Profile updated successfully:", response.data);
          fetch(`/api/revalidate?path=/profile`, {
            method: "POST",
          }).then(() => {
            toast({
              title: "Profile updated",
              description: "Your profile has been successfully updated.",
            });

            // Refresh the current route
            update().then(() => {
              setProfile(updatedProfile);
              router.refresh();
            });
          });
        })
        .catch((error) => {
          console.error("Error updating profile:", error);
        });
    }
  };

  const handleImgSave = (updatedProfile: Profile) => {
    if (session?.user?.id) {
      axios
        .patch(`/api/user/${session.user.id}`, {
          image: updatedProfile.image,
        })
        .then((response) => {
          console.log("Profile updated successfully:", response.data);
          fetch(`/api/revalidate?path=/profile`, {
            method: "POST",
          }).then(() => {
            toast({
              title: "Profile updated",
              description: "Your profile has been successfully updated.",
            });

            // Refresh the current route
            update().then(() => {
              setProfile(updatedProfile);
              router.refresh();
            });
          });
        })
        .catch((error) => {
          console.error("Error updating profile:", error);
        });
    }
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return profile ? (
    <ProfileView
      profile={profile}
      onSave={handleSave}
      onImageSave={handleImgSave}
    />
  ) : null;
}
