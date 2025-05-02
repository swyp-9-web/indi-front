import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';

import ScrollToTopButton from '@/app/_components/shared/ScrollToTopButton';
import { fetchProductsList } from '@/lib/apis/products.api';
import { QUERY_KEYS } from '@/lib/queries/queryKeys';

import DefaultProductsFilter from './_components/DefaultProductsFilter';
import DefaultProductsSection from './_components/DefaultProductsSection';
import HeroSection from './_components/HeroSection';
import InfiniteProductsSection from './_components/InfiniteProductsSection';
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

      <div className="w-8xl mx-auto mt-15 px-21">
        <h2 className="text-custom-brand-primary mb-5 text-2xl font-bold">아르테고의 최신 작품</h2>
        <DefaultProductsFilter />
      </div>

      <DefaultProductsSection />
      <SpecialProductsSection title="주목할 만한 작품" variant="primary" sort="SCRAPED_TOP" />
      <DefaultProductsSection />
      <SpecialProductsSection title="반응 좋은 작품" variant="secondary" sort="REACTED_TOP" />
      <InfiniteProductsSection />

      <ScrollToTopButton />
    </HydrationBoundary>
  );
}
