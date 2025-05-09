import { Suspense } from 'react';

import ScrollToTopButton from '@/app/_components/shared/ScrollToTopButton';

import ArtistInfoSection from './_components/ArtistInfoSection';
import ArtistProductsGrid from './_components/ArtistProductsGrid';

interface CategoryPageProps {
  params: Promise<{
    id: string;
  }>;
  searchParams: Promise<{ [key: string]: string | undefined }>;
}

export default async function Artist({ params, searchParams }: CategoryPageProps) {
  const [{ id: artistId }, { sortType }] = await Promise.all([params, searchParams]);

  return (
    <main className="w-8xl mx-auto mt-15 flex items-start gap-15 px-20">
      <Suspense
        fallback={
          <div className="mt-25 flex w-66.25 items-center justify-center">
            <div className="border-custom-gray-200 h-12 w-12 animate-spin rounded-full border-4 border-t-transparent" />
          </div>
        }
      >
        <ArtistInfoSection artistId={Number(artistId)} />
      </Suspense>

      <Suspense
        fallback={
          <div className="mt-25 flex flex-1 items-center justify-center">
            <div className="border-custom-gray-200 h-12 w-12 animate-spin rounded-full border-4 border-t-transparent" />
          </div>
        }
      >
        <ArtistProductsGrid artistId={Number(artistId)} sortType={sortType ?? 'CREATED_RECENT'} />
      </Suspense>

      <ScrollToTopButton />
    </main>
  );
}
