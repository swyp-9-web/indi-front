import ProductCard from '@/app/_components/shared/ProductCard';
import { productListMock } from '@/lib/mocks/product-list.mock';

export default function DefaultProductsSection() {
  const data = productListMock.products;

  return (
    <>
      <div className="flex w-full gap-x-5">
        {data.slice(0, 4).map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      <div className="mt-7.5 flex w-full gap-x-5">
        {data.slice(4, 8).map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </>
  );
}
