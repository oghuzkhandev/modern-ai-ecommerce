"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  PanelLeftClose,
  PanelLeft,
  Grid2X2,
  Grid3X3,
  LayoutGrid,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ProductFilters } from "./ProductFilters";
import { ProductGrid } from "./ProductGrid";
import { Pagination } from "./Pagination";
import type {
  ALL_CATEGORIES_QUERYResult,
  FILTER_PRODUCTS_BY_NAME_QUERYResult,
} from "@/sanity.types";

interface ProductSectionProps {
  categories: ALL_CATEGORIES_QUERYResult;
  products: FILTER_PRODUCTS_BY_NAME_QUERYResult;
  searchQuery: string;
}

const ITEMS_PER_PAGE_OPTIONS = [12, 24, 48];
const GRID_LAYOUTS = [
  { value: "2", label: "2 Columns", icon: Grid2X2, cols: 2 },
  { value: "3", label: "3 Columns", icon: Grid3X3, cols: 3 },
  { value: "4", label: "4 Columns", icon: LayoutGrid, cols: 4 },
];

export function ProductSection({
  categories,
  products,
  searchQuery,
}: ProductSectionProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [filtersOpen, setFiltersOpen] = useState(true);
  const [itemsPerPage, setItemsPerPage] = useState(24);
  const [gridLayout, setGridLayout] = useState("3");
  const [currentPage, setCurrentPage] = useState(1);

  // Calculate pagination
  const totalPages = Math.ceil(products.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProducts = products.slice(startIndex, endIndex);

  // Handle items per page change
  const handleItemsPerPageChange = (value: string) => {
    const newValue = parseInt(value);
    setItemsPerPage(newValue);
    setCurrentPage(1); // Reset to first page
  };

  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Scroll to top of products
    window.scrollTo({ top: 300, behavior: "smooth" });
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Header with controls */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        {/* Results count */}
        <div className="flex items-center gap-4">
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            Showing{" "}
            <span className="font-medium text-zinc-900 dark:text-zinc-100">
              {startIndex + 1}–{Math.min(endIndex, products.length)}
            </span>{" "}
            of{" "}
            <span className="font-medium text-zinc-900 dark:text-zinc-100">
              {products.length}
            </span>{" "}
            {searchQuery && (
              <span>
                for &quot;<span className="font-medium">{searchQuery}</span>
                &quot;
              </span>
            )}
          </p>
        </div>

        {/* Controls */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Items per page */}
          <Select
            value={itemsPerPage.toString()}
            onValueChange={handleItemsPerPageChange}
          >
            <SelectTrigger className="w-[140px] border-zinc-300 dark:border-zinc-700">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {ITEMS_PER_PAGE_OPTIONS.map((option) => (
                <SelectItem key={option} value={option.toString()}>
                  {option} per page
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Grid layout selector */}
          <div className="hidden lg:flex items-center gap-1 rounded-lg border border-zinc-300 p-1 dark:border-zinc-700">
            {GRID_LAYOUTS.map((layout) => {
              const Icon = layout.icon;
              return (
                <button
                  key={layout.value}
                  onClick={() => setGridLayout(layout.value)}
                  className={`rounded p-2 transition-colors ${
                    gridLayout === layout.value
                      ? "bg-zinc-900 text-white dark:bg-white dark:text-zinc-900"
                      : "text-zinc-600 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-800"
                  }`}
                  title={layout.label}
                >
                  <Icon className="h-4 w-4" />
                </button>
              );
            })}
          </div>

          {/* Filter toggle */}
          <Button
            variant="outline"
            size="sm"
            onClick={() => setFiltersOpen(!filtersOpen)}
            className="border-zinc-300 dark:border-zinc-700"
          >
            {filtersOpen ? (
              <>
                <PanelLeftClose className="h-4 w-4" />
                <span className="ml-2 hidden sm:inline">Hide Filters</span>
              </>
            ) : (
              <>
                <PanelLeft className="h-4 w-4" />
                <span className="ml-2 hidden sm:inline">Show Filters</span>
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Main content */}
      <div className="flex flex-col gap-8 lg:flex-row">
        {/* Sidebar Filters */}
        {filtersOpen && (
          <aside className="w-full shrink-0 lg:w-72">
            <ProductFilters categories={categories} />
          </aside>
        )}

        {/* Products Grid */}
        <main className="min-w-0 flex-1">
          <ProductGrid
            products={currentProducts}
            gridCols={parseInt(gridLayout)}
          />

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-12">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </div>
          )}

          {/* No results */}
          {products.length === 0 && (
            <div className="flex min-h-[400px] flex-col items-center justify-center rounded-xl border-2 border-dashed border-zinc-200 dark:border-zinc-800">
              <svg
                className="mb-4 h-12 w-12 text-zinc-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
                No products found
              </h3>
              <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                Try adjusting your filters or search terms
              </p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
