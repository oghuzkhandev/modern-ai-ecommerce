import { sanityFetch } from "@/sanity/lib/live";
import { ALL_CATEGORIES_QUERY } from "@/sanity/queries/categories";
import {
  FEATURED_PRODUCTS_QUERY,
  FILTER_PRODUCTS_BY_NAME_QUERY,
  FILTER_PRODUCTS_BY_PRICE_ASC_QUERY,
  FILTER_PRODUCTS_BY_PRICE_DESC_QUERY,
  FILTER_PRODUCTS_BY_RELEVANCE_QUERY,
} from "@/sanity/queries/products";
import { Suspense } from "react";
import { FeaturedCarousel } from "@/components/app/FeaturedCarousel";
import { FeaturedCarouselSkeleton } from "@/components/app/FeaturedCarouselSkeleton";
import { CategoryTiles } from "@/components/app/CategoryTiles";
import { ProductSection } from "@/components/app/ProductSection";
import { NewsletterSection } from "@/components/app/NewsletterSection";
import { HeroSection } from "@/components/app/HeroSection";
import { Footer } from "@/components/app/Footer";

interface PageProps {
  searchParams: Promise<{
    q?: string;
    category?: string;
    color?: string;
    material?: string;
    minPrice?: string;
    maxPrice?: string;
    sort?: string;
    inStock?: string;
  }>;
}

export default async function Home({ searchParams }: PageProps) {
  const params = await searchParams;

  const searchQuery = params.q ?? "";
  const categorySlug = params.category ?? "";
  const color = params.color ?? "";
  const material = params.material ?? "";
  const minPrice = Number(params.minPrice) || 0;
  const maxPrice = Number(params.maxPrice) || 0;
  const sort = params.sort ?? "name";
  const inStock = params.inStock === "true";

  const getQuery = () => {
    if (searchQuery && sort === "relevance") {
      return FILTER_PRODUCTS_BY_RELEVANCE_QUERY;
    }
    switch (sort) {
      case "price_asc":
        return FILTER_PRODUCTS_BY_PRICE_ASC_QUERY;
      case "price_desc":
        return FILTER_PRODUCTS_BY_PRICE_DESC_QUERY;
      case "relevance":
        return FILTER_PRODUCTS_BY_RELEVANCE_QUERY;
      default:
        return FILTER_PRODUCTS_BY_NAME_QUERY;
    }
  };

  // Fetch all data in parallel
  const [{ data: products }, { data: categories }, { data: featuredProducts }] =
    await Promise.all([
      sanityFetch({
        query: getQuery(),
        params: {
          searchQuery,
          categorySlug,
          color,
          material,
          minPrice,
          maxPrice,
          sort,
          inStock,
        },
      }),
      sanityFetch({
        query: ALL_CATEGORIES_QUERY,
      }),
      sanityFetch({
        query: FEATURED_PRODUCTS_QUERY,
      }),
    ]);

  // Determine if we're on the homepage (no filters applied)
  const isHomepage =
    !searchQuery &&
    !categorySlug &&
    !color &&
    !material &&
    !minPrice &&
    !maxPrice &&
    sort === "name" &&
    !inStock;

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-900">
      <HeroSection />

      {/* Featured Products Carousel - Only on homepage */}
      {isHomepage && featuredProducts.length > 0 && (
        <Suspense fallback={<FeaturedCarouselSkeleton />}>
          <FeaturedCarousel products={featuredProducts} />
        </Suspense>
      )}

      {/* Category Navigation Banner */}
      <div className="border-b border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950">
        <div className="mx-auto max-w-7xl px-4 pt-8 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
            {categorySlug
              ? `Shop ${categorySlug.charAt(0).toUpperCase() + categorySlug.slice(1)}`
              : searchQuery
                ? `Search Results`
                : "Shop All Products"}
          </h1>
          <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
            {searchQuery
              ? `Showing results for "${searchQuery}"`
              : "Premium furniture for your home"}
          </p>
        </div>

        {/* Category Tiles - Full width */}
        <div className="mt-6">
          <CategoryTiles
            categories={categories}
            activeCategory={categorySlug || undefined}
          />
        </div>
      </div>

      {/* Main Product Section */}
      <div
        id="products"
        className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8"
      >
        <ProductSection
          categories={categories}
          products={products}
          searchQuery={searchQuery}
        />
      </div>

      {/* Newsletter Section - Only on homepage */}
      <div id="newsletter" className="mt-40">
        {isHomepage && <NewsletterSection />}
      </div>

      {/* Trust Badges - Always show */}
      <section className="border-t border-zinc-200 bg-white py-12 dark:border-zinc-800 dark:bg-zinc-950">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            <div className="text-center">
              <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-amber-100 dark:bg-amber-900/30">
                <svg
                  className="h-6 w-6 text-amber-600 dark:text-amber-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <h3 className="font-semibold text-zinc-900 dark:text-zinc-100">
                Quality Guaranteed
              </h3>
              <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
                Premium materials
              </p>
            </div>

            <div className="text-center">
              <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/30">
                <svg
                  className="h-6 w-6 text-blue-600 dark:text-blue-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <h3 className="font-semibold text-zinc-900 dark:text-zinc-100">
                Fast Delivery
              </h3>
              <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
                2-5 business days
              </p>
            </div>

            <div className="text-center">
              <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-900/30">
                <svg
                  className="h-6 w-6 text-emerald-600 dark:text-emerald-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
              </div>
              <h3 className="font-semibold text-zinc-900 dark:text-zinc-100">
                Secure Payment
              </h3>
              <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
                100% protected
              </p>
            </div>

            <div className="text-center">
              <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-purple-100 dark:bg-purple-900/30">
                <svg
                  className="h-6 w-6 text-purple-600 dark:text-purple-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6"
                  />
                </svg>
              </div>
              <h3 className="font-semibold text-zinc-900 dark:text-zinc-100">
                Easy Returns
              </h3>
              <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
                30-day policy
              </p>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
