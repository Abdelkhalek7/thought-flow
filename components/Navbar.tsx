"use client";

import { useState, useEffect } from "react";
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
export default function Navbar() {
  const { data: session } = useSession();
  const [providers, setProviders] = useState<Record<
    string,
    ClientSafeProvider
  > | null>(null);

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  useEffect(() => {
    (async () => {
      const res = await getProviders();
      setProviders(res);
    })();
  }, []);
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle("dark");
  };

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
        {isLoggedIn ? (
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Create New Quote</DropdownMenuItem>
              <DropdownMenuItem>Favorites</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <Button
                  key={provider.name}
                  onClick={() => {
                    signIn(provider.id);
                  }}
                  variant="ghost"
                  className="w-30 text-xl m-3"
                >
                  Sign in
                </Button>
              ))}

            <Button className="w-30 text-xl m-3">Sign Up</Button>
          </>
        )}
      </div>
    </nav>
  );
}
