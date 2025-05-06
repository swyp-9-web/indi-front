import ArtistInfoSection from './_components/ArtistInfoSection';
import ArtistProductsGrid from './_components/ArtistProductsGrid';

interface CategoryPageProps {
  params: Promise<{
    id: string;
  }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function Artist({ params, searchParams }: CategoryPageProps) {
  const { id: artistId } = await params;
  const { sortType = 'CREATED_RECENT' } = await searchParams;

  console.log(artistId, sortType);

  return (
    <main className="w-8xl mx-auto mt-25 flex items-start gap-15 px-20">
      <section className="relative w-66.25">
        <ArtistInfoSection />
      </section>

      <section className="flex-1">
        <ArtistProductsGrid />
      </section>
    </main>
  );
}
