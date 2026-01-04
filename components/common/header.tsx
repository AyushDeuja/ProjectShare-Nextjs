"use client";

import Link from "next/link";
import {
  BuildingIcon,
  CompassIcon,
  HomeIcon,
  LoaderIcon,
  MenuIcon,
  SparklesIcon,
  XIcon,
} from "lucide-react";
import { Button } from "../ui/button";
import { SignedIn, SignedOut, SignInButton, SignUpButton } from "@clerk/nextjs";
import { Suspense, useState } from "react";
import CustomUserButton from "./custom-user-button";

const Logo = () => {
  return (
    <Link href="/" className="flex items-center gap-2">
      <div className="size-8 rounded-lg bg-primary flex items-center justify-center">
        <SparklesIcon className="size-4 text-primary-foreground" />
      </div>
      <span className="text-xl font-bold">
        Pr<span className="text-primary">Oject</span>Share
      </span>
    </Link>
  );
};

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur">
      <div className="wrapper px-4 md:px-12">
        <div className="flex h-16 items-center justify-between">
          <Logo />

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            <Link
              href="/"
              className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50"
            >
              <HomeIcon className="size-4" />
              Home
            </Link>

            <Link
              href="/explore"
              className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50"
            >
              <CompassIcon className="size-4" />
              Explore
            </Link>
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-3">
            <Suspense fallback={<LoaderIcon className="size-4 animate-spin" />}>
              <SignedOut>
                <SignInButton />
                <SignUpButton>
                  <Button>Sign Up</Button>
                </SignUpButton>
              </SignedOut>

              <SignedIn>
                <Button asChild>
                  <Link href="/submit">
                    <SparklesIcon className="size-4 mr-1" />
                    Submit Project
                  </Link>
                </Button>
                <CustomUserButton />
              </SignedIn>
            </Suspense>
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden" onClick={() => setOpen(!open)}>
            {open ? <XIcon /> : <MenuIcon />}
          </button>
        </div>

        {/* Mobile Menu */}
        {open && (
          <div className="md:hidden border-t py-4 space-y-4">
            <Link
              href="/"
              onClick={() => setOpen(false)}
              className="flex items-center gap-2 px-3 py-2 text-sm font-medium"
            >
              <HomeIcon className="size-4" />
              Home
            </Link>

            <Link
              href="/explore"
              onClick={() => setOpen(false)}
              className="flex items-center gap-2 px-3 py-2 text-sm font-medium"
            >
              <CompassIcon className="size-4" />
              Explore
            </Link>

            <Suspense fallback={<LoaderIcon className="size-4 animate-spin" />}>
              <SignedOut>
                <SignInButton />
                <SignUpButton>
                  <Button className="w-full">Sign Up</Button>
                </SignUpButton>
              </SignedOut>

              <SignedIn>
                <Button asChild className="w-full">
                  <Link href="/submit">Submit Project</Link>
                </Button>
                <CustomUserButton />
              </SignedIn>
            </Suspense>
          </div>
        )}
      </div>
    </header>
  );
}
