'use client';

import { useEffect, useRef, useState } from 'react';

import ProductCard from '@/app/_components/shared/ProductCard';
import { ProductsListQueryParams } from '@/lib/apis/products.type';
import { useProductsInfiniteQuery } from '@/lib/queries/useProductsQueries';

interface InfiniteProductsGridProps {
  queryParams: ProductsListQueryParams;
}

export default function InfiniteProductsGrid({ queryParams }: InfiniteProductsGridProps) {
  const [startInfinite, setStartInfinite] = useState(false);
  const observerRef = useRef<HTMLDivElement | null>(null);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useProductsInfiniteQuery(
    queryParams,
    startInfinite
  );

  useEffect(() => {
    if (!startInfinite || !hasNextPage || isFetchingNextPage) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { rootMargin: '50px' }
    );

    const currentTarget = observerRef.current;
    if (currentTarget) {
      observer.observe(currentTarget);
    }

    return () => {
      if (currentTarget) observer.unobserve(currentTarget);
    };
  }, [startInfinite, hasNextPage, isFetchingNextPage, fetchNextPage]);

  return (
    <>
      {startInfinite && (
        <div className="mb-10 flex flex-wrap gap-x-5 gap-y-10">
          {data?.pages.map((page) =>
            page.result.items.map((product) => (
              <ProductCard hasScrapCount key={product.id} product={product} />
            ))
          )}
        </div>
      )}

      {!startInfinite && (
        <button
          onClick={() => setStartInfinite(true)}
          className="border-custom-gray-100 text-custom-brand-primary mx-auto mt-20 flex h-11.5 w-46 cursor-pointer items-center justify-center rounded-full border text-sm font-medium"
        >
          더보기
        </button>
      )}

      {startInfinite && hasNextPage && (
        <div ref={observerRef} className="mt-10 flex h-10 items-center justify-center">
          <div className="border-custom-gray-200 h-12 w-12 animate-spin rounded-full border-4 border-t-transparent" />
        </div>
      )}

      <div className="mb-25" />
    </>
  );
}
