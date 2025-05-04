import InfiniteProductsGrid from '@/app/_components/product/InfiniteProductsGrid';
import ProductCard from '@/app/_components/product/ProductCard';
import { fetchProductsList } from '@/lib/apis/products.api';
import { ProductsListQueryParams } from '@/lib/apis/products.type';

import NoScrapProducts from './NoScrapProducts';

interface ProductsGridProps {
  queryParams: ProductsListQueryParams;
}

export default async function ProductsGrid({ queryParams }: ProductsGridProps) {
  const data = await fetchProductsList({
    sortType: 'SCRAP_ITEM_RECENT',
    ...queryParams,
    limit: 20,
  });
  const products = data.result.items;

  if (products.length === 0) return <NoScrapProducts />;

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
