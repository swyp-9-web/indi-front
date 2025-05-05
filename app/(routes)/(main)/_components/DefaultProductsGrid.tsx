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

  const { data } = useProductsQuery({ ...queryParams, limit: 8, page });

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
