import InfiniteProductsGrid from '@/app/_components/product/InfiniteProductsGrid';
import ProductCard from '@/app/_components/product/ProductCard';
import { fetchProductsList } from '@/lib/apis/products.api';

import NoArtistProducts from './NoArtistProducts';
import ProductsControls from './ProductsControls';

interface ArtistProductsGridProps {
  artistId: number;
  sortType: string;
}

export default async function ArtistProductsGrid({ sortType, artistId }: ArtistProductsGridProps) {
  const queryParams = { sortType, limit: 15, artistId };

  const data = await fetchProductsList(queryParams);
  const products = data.result.items ?? [];

  return (
    <section className="flex-1">
      <div className="mb-2 flex justify-end">
        <ProductsControls />
      </div>

      {products ? (
        <div className="mb-10 flex flex-wrap gap-x-5 gap-y-10">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} hasScrapCount />
          ))}
        </div>
      ) : (
        <NoArtistProducts />
      )}

      {data.result.meta.hasNextPage && <InfiniteProductsGrid queryParams={queryParams} />}

      <div className="mb-25" />
    </section>
  );
}
