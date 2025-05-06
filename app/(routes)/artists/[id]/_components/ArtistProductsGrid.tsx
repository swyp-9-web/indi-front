import ProductCard from '@/app/_components/product/ProductCard';
import { fetchProductsList } from '@/lib/apis/products.api';

import NoArtistProducts from './NoArtistProducts';
import ProductsControls from './ProductsControls';

interface ArtistProductsGridProps {
  artistId: number;
  sortType: string;
}

export default async function ArtistProductsGrid({ sortType, artistId }: ArtistProductsGridProps) {
  const data = await fetchProductsList({ sortType, limit: 15, artistId });
  const products = data.result.items ?? [];

  return (
    <section className="flex-1">
      <div className="mb-2 flex justify-end">
        <ProductsControls />
      </div>

      {products ? (
        <div className="flex flex-wrap gap-x-5 gap-y-10">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} hasScrapCount />
          ))}
        </div>
      ) : (
        <NoArtistProducts />
      )}
    </section>
  );
}
