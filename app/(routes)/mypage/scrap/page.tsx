import { Suspense } from 'react';

import ProductsControls from './_components/ProductsControls';
import ProductsGrid from './_components/ProductsGrid';

interface MyScrapPageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function MyScrap({ searchParams }: MyScrapPageProps) {
  const queryParams = await searchParams;

  return (
    <main className="w-8xl mx-auto mt-25 px-20">
      <h2 className="text-custom-brand-primary text-2xl font-bold">스크랩 한 작품</h2>

      <div className="mt-5 mb-4.5 flex flex-col gap-4">
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
    </main>
  );
}
