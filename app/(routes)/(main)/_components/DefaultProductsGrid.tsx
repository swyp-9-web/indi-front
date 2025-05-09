'use client';

import InfiniteProductsGrid from '@/app/_components/product/InfiniteProductsGrid';
import ProductCard from '@/app/_components/product/ProductCard';
import { useDebounce } from '@/hooks/useDebounce';
import { ProductsListQueryParams } from '@/lib/apis/products.type';
import { useProductsQuery } from '@/lib/queries/useProductsQueries';
import { cn } from '@/lib/utils';
import { useMainPageFilter } from '@/stores/useMainPageFilter';

interface DefaultProductsGridProps {
  page: number;
  lastGrid?: boolean;
}

export default function DefaultProductsGrid({ page, lastGrid = false }: DefaultProductsGridProps) {
  const { categories, sizes } = useMainPageFilter();

  const debouncedCategories = useDebounce(categories);
  const debouncedSizes = useDebounce(sizes);

  const queryParams: ProductsListQueryParams = {
    categoryTypes: debouncedCategories,
    sizeTypes: debouncedSizes,
  };

  const { data, isLoading } = useProductsQuery({ ...queryParams, limit: 8, page });

  if (isLoading)
    return (
      <div className="w-8xl mx-auto my-15 flex h-199.5 items-center justify-center px-20">
        <div className="mt-25 flex items-center justify-center">
          <div className="border-custom-gray-200 h-12 w-12 animate-spin rounded-full border-4 border-t-transparent" />
        </div>
      </div>
    );

  return (
    <>
      <div
        className={cn(
          'w-8xl mx-auto my-15 flex flex-wrap gap-x-5 gap-y-10 px-20',
          lastGrid && 'mb-0'
        )}
      >
        {data?.result.items.map((product) => <ProductCard key={product.id} product={product} />)}
      </div>

      {lastGrid && data?.result.meta.hasNextPage && (
        <div className="w-8xl mx-auto mt-10 px-20">
          <InfiniteProductsGrid queryParams={{ ...queryParams, limit: 24 }} />
        </div>
      )}
    </>
  );
}
