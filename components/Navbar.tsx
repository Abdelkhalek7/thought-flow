"use client";

import { useState, useEffect } from "react";
import { Spinner } from "@/components/smallLoading";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Moon, Sun } from "lucide-react";
import {
  signIn,
  signOut,
  useSession,
  getProviders,
  ClientSafeProvider,
} from "next-auth/react";
// import { LoadingSpinner } from "./Loading";
export default function Navbar() {
  const { data: session, status } = useSession();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [providers, setProviders] = useState<Record<
    string,
    ClientSafeProvider
  > | null>(null);

  const [isDarkMode, setIsDarkMode] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (status === "loading") {
          return;
        }

        const res = await getProviders();
        setProviders(res);
      } catch (error) {
        console.error("Error fetching providers:", error);
      }
    };

    fetchData();
  }, [session, status]);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle("dark");
  };

  //   if (status === "loading") {
  //     return <LoadingSpinner />;
  //   }

  return (
    <nav className="flex items-center justify-between p-4 bg-background text-foreground">
      <div className="flex items-center">
        <Link href="/" className="text-xl font-bold">
          ThoughtFlow
        </Link>
      </div>
      <div className="flex items-center space-x-4">
        <Button variant="ghost" size="icon" onClick={toggleDarkMode}>
          {isDarkMode ? (
            <Sun className="h-10 w-10" />
          ) : (
            <Moon className="h-10 w-10" />
          )}
        </Button>
        {status === "loading" ? (
          <Spinner />
        ) : status == "authenticated" ? (
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Avatar>
                <AvatarImage
                  src={
                    session?.user?.image ||
                    "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y"
                  }
                />
                <AvatarFallback>{session?.user?.name}</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>
                {" "}
                <Link href="/profile">Profile</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href="/create-quote">Create New Quote</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>Favorites</DropdownMenuItem>
              <DropdownMenuItem onClick={() => signOut()}>
                signOut
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <>
            <Button
              key="Google"
              onClick={() => {
                signIn("google");
              }}
              variant="ghost"
              className="w-30 text-xl m-3"
            >
              Sign in
            </Button>

            {/* <Button className="w-30 text-xl m-3">Sign Up</Button> */}
          </>
        )}
      </div>
    </nav>
  );
}
