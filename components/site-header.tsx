"use client";

import { BRAND_NAME_UPPER } from "@/lib/branding";
import Link from "next/link";
import { Sun, Moon, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useTheme } from "next-themes";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export function SiteHeader() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  // After mounting, we can access the theme
  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  };

  // Function to handle navigation with scroll to top
  const handleNavigation = (path: string) => {
    router.push(path);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-purple-100 dark:border-purple-900 bg-white/80 dark:bg-gray-950/90 backdrop-blur-lg">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        <Link
          href="/"
          className="flex items-center gap-3"
          onClick={() => window.scrollTo(0, 0)}
        >
          <div className="relative h-10 w-10">
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-amber-300 to-purple-400 opacity-80"></div>
            <Sun className="relative h-10 w-10 text-white" />
          </div>
          <span className="text-xl font-cinzel font-bold tracking-wider text-purple-900 dark:text-purple-100 cosmic-title">
            {BRAND_NAME_UPPER}
          </span>
        </Link>

        <nav className="hidden md:flex md:items-center md:gap-8">
          {[
            { name: "Home", path: "/" },
            { name: "About Us", path: "/about" },
            { name: "Services", path: "/services" },
            { name: "Contact", path: "/contact" },
          ].map((item) => (
            <Link
              key={item.name}
              href={item.path}
              className="text-sm font-medium font-inter text-purple-700 dark:text-purple-300 transition-all duration-300 hover:text-amber-600 dark:hover:text-amber-400 hover:text-shadow-golden"
              onClick={() => window.scrollTo(0, 0)}
            >
              {item.name}
            </Link>
          ))}
          <Link href="/consultation" onClick={() => window.scrollTo(0, 0)}>
            <Button className="bg-gradient-to-r from-purple-500 to-purple-700 text-white hover:from-purple-600 hover:to-purple-800 dark:from-purple-600 dark:to-purple-900 font-inter font-medium">
              Book Consultation
            </Button>
          </Link>
          <Link href="/Kundali" onClick={() => window.scrollTo(0, 0)}>
            <Button className="bg-gradient-to-r from-purple-500 to-purple-700 text-white hover:from-purple-600 hover:to-purple-800 dark:from-purple-600 dark:to-purple-900 font-inter font-medium">
              Online Kundali
            </Button>
          </Link>
          <Button
            variant="ghost"
            size="icon"
            aria-label="Toggle Theme"
            className="ml-2"
            onClick={toggleTheme}
          >
            {mounted && resolvedTheme === "dark" ? (
              <Sun className="h-5 w-5 text-amber-300" />
            ) : (
              <Moon className="h-5 w-5 text-purple-700" />
            )}
          </Button>
        </nav>

        <div className="flex items-center md:hidden">
          <Button
            variant="ghost"
            size="icon"
            aria-label="Toggle Theme"
            className="mr-2"
            onClick={toggleTheme}
          >
            {mounted && resolvedTheme === "dark" ? (
              <Sun className="h-5 w-5 text-amber-300" />
            ) : (
              <Moon className="h-5 w-5 text-purple-700" />
            )}
          </Button>
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="text-purple-700 dark:text-purple-300"
              >
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="bg-white dark:bg-gray-950 border-purple-100 dark:border-purple-900"
            >
              {/* Title required for a11y; sr-only keeps it accessible but hidden */}
              <SheetHeader>
                <SheetTitle className="sr-only">Mobile navigation menu</SheetTitle>
              </SheetHeader>

              <nav className="flex flex-col gap-6 mt-8">
                {[
                  { name: "Home", path: "/" },
                  { name: "About Us", path: "/about" },
                  { name: "Services", path: "/services" },
                  { name: "Contact", path: "/contact" },
                ].map((item) => (
                  <Link
                    key={item.name}
                    href={item.path}
                    className="text-lg font-medium font-inter text-purple-700 dark:text-purple-300 transition-colors hover:text-amber-600 dark:hover:text-amber-400"
                    onClick={() => window.scrollTo(0, 0)}
                  >
                    {item.name}
                  </Link>
                ))}
                <Link href="/consultation" onClick={() => window.scrollTo(0, 0)}>
                  <Button className="mt-4 bg-gradient-to-r from-purple-500 to-purple-700 text-white hover:from-purple-600 hover:to-purple-800 dark:from-purple-600 dark:to-purple-900 font-inter font-medium">
                    Book Consultation
                  </Button>
                </Link>
                <Link href="/Kundali" onClick={() => window.scrollTo(0, 0)}>
                  <Button className="bg-gradient-to-r from-purple-500 to-purple-700 text-white hover:from-purple-600 hover:to-purple-800 dark:from-purple-600 dark:to-purple-900 font-inter font-medium">
                    Online Kundali
                  </Button>
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
