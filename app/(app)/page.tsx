import Image from "next/image";
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
import { Skeleton } from "@/components/ui/skeleton";
import { FeaturedCarousel } from "@/components/app/FeaturedCarousel";

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
  const minPrice = params.minPrice ? parseFloat(params.minPrice) : 0;
  const maxPrice = params.maxPrice ? parseFloat(params.maxPrice) : 0;
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

  /** Get products */
  const { data: products } = await sanityFetch({
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
  });

  /** Get all categories */
  const { data: categories } = await sanityFetch({
    query: ALL_CATEGORIES_QUERY,
  });

  /** Get featured products for homepage carousel */
  const { data: featuredProducts } = await sanityFetch({
    query: FEATURED_PRODUCTS_QUERY,
  });

  return (
    <div>
      {/* Products Carousel */}
      <Suspense
        fallback={
          <div>
            <Skeleton className="h-[400px] w-full" />
            "Loading featured products..."
          </div>
        }
      >
        <FeaturedCarousel products={featuredProducts} />
      </Suspense>
    </div>
  );
}
