import { Suspense } from 'react';

import { notFound } from 'next/navigation';

import ScrollToTopButton from '@/app/_components/shared/ScrollToTopButton';
import { CATEGORY_VALUES } from '@/constants';
import { getCategoryLabelByValue } from '@/utils/item';

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

  // category value값이 올바르지 않은 경우 notFound
  if (!CATEGORY_VALUES.includes(categoryValue)) {
    notFound();
  }

  const queryParams = { categoryTypes: categoryValue, ...query };

  return (
    <main className="w-8xl mx-auto mt-25 px-20">
      <h2 className="text-custom-brand-primary text-2xl font-bold">
        {getCategoryLabelByValue(categoryValue)}
      </h2>

      <div className="mt-4.5 mb-4.5 flex items-center justify-end">
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
          <ProductsGrid queryParams={queryParams} />
        </Suspense>
      </section>

      <ScrollToTopButton />
    </main>
  );
}
