import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';

import ScrollToTopButton from '@/app/_components/shared/ScrollToTopButton';
import { fetchProductsList } from '@/lib/apis/products.api';
import { QUERY_KEYS } from '@/lib/queries/queryKeys';

import DefaultProductsFilter from './_components/DefaultProductsFilter';
import DefaultProductsGrid from './_components/DefaultProductsGrid';
import HeroSection from './_components/HeroSection';
import SpecialProductsSection from './_components/SpecialProductsSection';

export default async function Home() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: QUERY_KEYS.products.list({ page: 1, limit: 8, sortType: 'SCRAPED_TOP' }),
    queryFn: async () => await fetchProductsList({ page: 1, limit: 8, sortType: 'SCRAPED_TOP' }),
    staleTime: 60 * 60 * 1000,
  });
  await queryClient.prefetchQuery({
    queryKey: QUERY_KEYS.products.list({ page: 1, limit: 8, sortType: 'REACTED_TOP' }),
    queryFn: async () => await fetchProductsList({ page: 1, limit: 8, sortType: 'REACTED_TOP' }),
    staleTime: 60 * 60 * 1000,
  });

  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <HeroSection />

      <div className="w-8xl mx-auto mt-15 mb-17.5 px-20">
        <h2 className="text-custom-brand-primary mb-5 text-2xl font-bold">아르테고의 최신 작품</h2>
        <DefaultProductsFilter />
      </div>

      <section>
        <DefaultProductsGrid page={1} />
        <SpecialProductsSection title="주목할 만한 작품" variant="primary" sort="SCRAPED_TOP" />
        <DefaultProductsGrid page={2} />
        <SpecialProductsSection title="반응 좋은 작품" variant="secondary" sort="REACTED_TOP" />
        <DefaultProductsGrid page={3} />
      </section>

      <ScrollToTopButton />
    </HydrationBoundary>
  );
}
