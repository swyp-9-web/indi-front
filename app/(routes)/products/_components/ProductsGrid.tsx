import { redirect } from 'next/navigation';

import InfiniteProductsGrid from '@/app/_components/product/InfiniteProductsGrid';
import ProductCard from '@/app/_components/product/ProductCard';
import { ROUTE_PATHS } from '@/constants';
import { fetchProductsList } from '@/lib/apis/products.api';
import { ProductsListQueryParams } from '@/lib/apis/products.type';

interface ProductsGridProps {
  queryParams: ProductsListQueryParams;
}

export default async function ProductsGrid({ queryParams }: ProductsGridProps) {
  const data = await fetchProductsList({ ...queryParams, limit: 20 });
  const products = data.result.items;

  const hasOnlyKeyword =
    'keyword' in queryParams && !Object.keys(queryParams).some((key) => key !== 'keyword');

  if (hasOnlyKeyword && products.length === 0) {
    const searchParams = new URLSearchParams(queryParams as Record<string, string>);

    redirect(`${ROUTE_PATHS.PRODUCTS_NO_RESULTS}?${searchParams.toString()}`);
  }

  return (
    <>
      <div className="mb-10 flex flex-wrap gap-x-5 gap-y-10">
        {products.map((product) => (
          <ProductCard hasScrapCount key={product.id} product={product} />
        ))}
      </div>
      {data.result.meta.hasNextPage && <InfiniteProductsGrid queryParams={queryParams} />}
    </>
  );
}
