import ProductCard from '@/app/_components/shared/ProductCard';
import { productListMock } from '@/lib/mocks/product-list.mock';

export default function InfiniteProductsSection() {
  const data = productListMock.result.items;

  return (
    <section className="w-8xl mx-auto mt-15 px-21">
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
      <button className="border-custom-gray-100 text-custom-brand-primary mx-auto mt-20 flex h-11.5 w-46 cursor-pointer items-center justify-center rounded-full border text-sm font-medium">
        더보기
      </button>
    </section>
  );
}
