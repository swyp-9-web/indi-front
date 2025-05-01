import { notFound } from 'next/navigation';

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
    </main>
  );
}
