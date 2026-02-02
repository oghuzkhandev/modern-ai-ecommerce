"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function HeroSection() {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-zinc-50 via-white to-amber-50/30 dark:from-zinc-950 dark:via-zinc-900 dark:to-amber-950/10">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:64px_64px]" />

      <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          {/* Main heading */}
          <h1 className="text-4xl font-light tracking-tight text-zinc-900 dark:text-zinc-100 sm:text-6xl lg:text-7xl">
            Elevate Your
            <span className="block font-serif italic text-amber-600 dark:text-amber-500">
              Living Space
            </span>
          </h1>

          <p className="mt-6 text-lg leading-8 text-zinc-600 dark:text-zinc-400">
            Discover timeless furniture crafted with precision and passion.
            <span className="block">
              Where exceptional design meets uncompromising quality.
            </span>
          </p>

          {/* CTA Buttons */}
          <div className="mt-10 flex items-center justify-center gap-4">
            <Button
              asChild
              size="lg"
              className="bg-zinc-900 px-8 text-white hover:bg-zinc-800 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-100"
            >
              <Link href="/#products">
                Explore Collection
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-zinc-300 px-8 hover:bg-zinc-50 dark:border-zinc-700 dark:hover:bg-zinc-800"
            >
              <Link href="/?category=sofas">New Arrivals</Link>
            </Button>
          </div>

          {/* Subtle divider */}
          <div className="mt-16 flex items-center justify-center gap-8 text-sm text-zinc-500 dark:text-zinc-500">
            <span>Premium Quality</span>
            <span>•</span>
            <span>Sustainable Materials</span>
            <span>•</span>
            <span>Timeless Design</span>
          </div>
        </div>
      </div>
    </div>
  );
}
