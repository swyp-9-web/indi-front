import { Suspense } from 'react';

import ScrollToTopButton from '@/app/_components/shared/ScrollToTopButton';
import { getCategoryLabelByValue } from '@/utils/itemUtils';

import InfiniteProductsGrid from './_components/InfiniteProductsGrid';
import ProductsControls from './_components/ProductsControls';
import ProductsGrid from './_components/ProductsGrid';

interface CategoryPageProps {
  params: Promise<{
    category_value: string;
  }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function ProductsCategory({ params, searchParams }: CategoryPageProps) {
  const [{ category_value: categoryValue }, query] = await Promise.all([params, searchParams]);

  return (
    <main className="w-8xl mx-auto mt-25 px-20">
      <h2 className="text-custom-brand-primary text-2xl font-bold">
        {getCategoryLabelByValue(categoryValue)}
      </h2>

      <div className="mt-4.5 mb-6 flex items-center justify-end">
        <ProductsControls />
      </div>

      <section>
        <Suspense
          fallback={
            <div className="mt-25 flex items-center justify-center">
              <div className="border-custom-gray-200 h-12 w-12 animate-spin rounded-full border-4 border-t-transparent" />
            </div>
          }
        >
          <ProductsGrid queryParams={{ categoryTypes: categoryValue, ...query }} />
        </Suspense>
        <InfiniteProductsGrid />
      </section>

      <ScrollToTopButton />
    </main>
  );
}
