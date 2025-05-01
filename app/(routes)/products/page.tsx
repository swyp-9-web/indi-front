import { notFound } from 'next/navigation';

import ScrollToTopButton from '@/app/_components/shared/ScrollToTopButton';

import ProductsControls from './_components/ProductsControls';

interface ProductsPageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function Products({ searchParams }: ProductsPageProps) {
  const query = await searchParams;

  if (!query?.keyword) return notFound();

  return (
    <main className="w-8xl mx-auto mt-25 px-20">
      <h2 className="text-custom-brand-primary text-2xl font-bold">
        &quot;{query.keyword}&quot; 검색 결과
      </h2>

      <div className="mt-5 mb-2 flex flex-col gap-4">
        <ProductsControls />
      </div>

      <section>상품 리스트</section>

      <ScrollToTopButton />
    </main>
  );
}
