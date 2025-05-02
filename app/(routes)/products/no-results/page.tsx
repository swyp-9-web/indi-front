import { notFound } from 'next/navigation';

import { FindInPageIcon } from '@/lib/icons';

interface NoResultsPageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function NoResults({ searchParams }: NoResultsPageProps) {
  const query = await searchParams;

  if (!query?.keyword) return notFound();

  return (
    <main className="w-8xl mx-auto mt-40 flex flex-col items-center justify-center">
      <FindInPageIcon />
      <h2 className="text-custom-brand-primary mt-4 mb-6 text-center text-2xl font-bold">
        &quot;{query.keyword}&quot;에 대한
        <br />
        검색 결과가 없습니다.
      </h2>
      <p className="text-custom-gray-400 text-sm">검색어를 다시 한 번 확인해주세요.</p>
    </main>
  );
}
