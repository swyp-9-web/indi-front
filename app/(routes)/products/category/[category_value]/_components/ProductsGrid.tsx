import ProductCard from '@/app/_components/shared/ProductCard';
import { productListMock } from '@/lib/mocks/product-list.mock';

export default function ProductsGrid() {
  const products = productListMock.result.items;

  return (
    <>
      <div className="mb-10 flex gap-5">
        {products.slice(0, 4).map((product) => (
          <ProductCard hasScrapCount key={product.id} product={product} />
        ))}
      </div>
      <div className="mb-10 flex gap-5">
        {products.slice(4, 8).map((product) => (
          <ProductCard hasScrapCount key={product.id} product={product} />
        ))}
      </div>
      <div className="mb-10 flex gap-5">
        {products.slice(0, 4).map((product) => (
          <ProductCard hasScrapCount key={product.id} product={product} />
        ))}
      </div>
      <div className="mb-10 flex gap-5">
        {products.slice(4, 8).map((product) => (
          <ProductCard hasScrapCount key={product.id} product={product} />
        ))}
      </div>
      <div className="mb-10 flex gap-5">
        {products.slice(0, 4).map((product) => (
          <ProductCard hasScrapCount key={product.id} product={product} />
        ))}
      </div>
    </>
  );
}
