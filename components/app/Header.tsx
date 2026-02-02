"use client";

import Link from "next/link";
import { Package, ShoppingBag, Sparkles, User, Search } from "lucide-react";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCartActions, useTotalItems } from "@/lib/store/cart-store-provider";
import { useChatActions, useIsChatOpen } from "@/lib/store/chat-store-provider";

export function Header() {
  const { openCart } = useCartActions();
  const { openChat } = useChatActions();
  const isChatOpen = useIsChatOpen();
  const totalItems = useTotalItems();

  return (
    <header className="sticky top-0 z-50 border-b border-zinc-200/50 bg-white/95 backdrop-blur-xl supports-[backdrop-filter]:bg-white/60 dark:border-zinc-800/50 dark:bg-zinc-950/95 dark:supports-[backdrop-filter]:bg-zinc-950/60">
      {/* Top bar - announcement */}
      <div className="border-b border-zinc-200/50 bg-zinc-50/50 dark:border-zinc-800/50 dark:bg-zinc-900/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-10 items-center justify-center text-sm">
            <p className="text-zinc-600 dark:text-zinc-400">
              <span className="hidden sm:inline">
                Free shipping on orders over £500 •
              </span>{" "}
              <span className="font-medium">New Collection Available</span>
            </p>
          </div>
        </div>
      </div>

      {/* Main header */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between gap-8">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-amber-500 to-amber-600 shadow-lg shadow-amber-500/25 transition-shadow group-hover:shadow-xl group-hover:shadow-amber-500/30">
              <svg
                className="h-6 w-6 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                />
              </svg>
            </div>
            <span className="text-xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
              Luxe Home
            </span>
          </Link>

          {/* Navigation - Desktop */}
          <nav className="hidden lg:flex items-center gap-8">
            <Link
              href="/"
              className="text-sm font-medium text-zinc-600 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
            >
              Shop All
            </Link>
            <Link
              href="/?category=sofas"
              className="text-sm font-medium text-zinc-600 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
            >
              Living Room
            </Link>
            <Link
              href="/?category=beds"
              className="text-sm font-medium text-zinc-600 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
            >
              Bedroom
            </Link>
            <Link
              href="/?category=outdoor"
              className="text-sm font-medium text-zinc-600 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
            >
              Outdoor
            </Link>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-3">
            {/* Search */}
            <div className="hidden md:block">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
                <Input
                  type="search"
                  placeholder="Search..."
                  className="w-64 border-zinc-200 bg-zinc-50/50 pl-9 text-sm placeholder:text-zinc-400 focus-visible:ring-amber-500 dark:border-zinc-800 dark:bg-zinc-900/50"
                />
              </div>
            </div>

            {/* My Orders - Only when signed in */}
            <SignedIn>
              <Button
                asChild
                variant="ghost"
                size="sm"
                className="hidden md:flex gap-2"
              >
                <Link href="/orders">
                  <Package className="h-4 w-4" />
                  <span className="text-sm">Orders</span>
                </Link>
              </Button>
            </SignedIn>

            {/* AI Shopping Assistant */}
            {!isChatOpen && (
              <Button
                onClick={openChat}
                size="sm"
                className="gap-2 bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-md shadow-amber-500/25 hover:from-amber-600 hover:to-amber-700 hover:shadow-lg hover:shadow-amber-500/30"
              >
                <Sparkles className="h-4 w-4" />
                <span className="hidden md:inline text-sm font-medium">
                  AI Assistant
                </span>
              </Button>
            )}

            {/* Cart Button */}
            <Button
              variant="ghost"
              size="icon"
              className="relative h-10 w-10"
              onClick={openCart}
            >
              <ShoppingBag className="h-5 w-5" />
              {totalItems > 0 && (
                <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-amber-600 text-xs font-semibold text-white ring-2 ring-white dark:ring-zinc-950">
                  {totalItems > 9 ? "9+" : totalItems}
                </span>
              )}
              <span className="sr-only">Cart ({totalItems})</span>
            </Button>

            {/* User */}
            <SignedIn>
              <UserButton
                afterSwitchSessionUrl="/"
                appearance={{
                  elements: {
                    avatarBox:
                      "h-10 w-10 ring-2 ring-zinc-200 dark:ring-zinc-800",
                  },
                }}
              >
                <UserButton.MenuItems>
                  <UserButton.Link
                    label="My Orders"
                    labelIcon={<Package className="h-4 w-4" />}
                    href="/orders"
                  />
                </UserButton.MenuItems>
              </UserButton>
            </SignedIn>
            <SignedOut>
              <SignInButton mode="modal">
                <Button variant="ghost" size="icon" className="h-10 w-10">
                  <User className="h-5 w-5" />
                  <span className="sr-only">Sign in</span>
                </Button>
              </SignInButton>
            </SignedOut>
          </div>
        </div>
      </div>
    </header>
  );
}
