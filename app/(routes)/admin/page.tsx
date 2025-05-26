import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';

import { fetchUserSummary } from '@/lib/apis/user.api';
import { QUERY_KEYS } from '@/lib/queries/queryKeys';

import ArtistsList from './_components/ArtistsList';

export default async function AdminPage() {
  async function prepareDehydratedState() {
    const queryClient = new QueryClient();
    await queryClient.prefetchQuery({
      queryKey: QUERY_KEYS.user.summary,
      queryFn: () => fetchUserSummary({ runtime: 'server' }),
    });
    return dehydrate(queryClient);
  }
  const dehydrateState = await prepareDehydratedState();

  return (
    <HydrationBoundary state={dehydrateState}>
      <div className="mx-20 my-10">
        <div className="mx-auto flex max-w-7xl flex-col gap-5">
          <h1 className="text-custom-brand-primary text-2xl font-bold">아티스트 지원 목록</h1>
          <ArtistsList />
        </div>
      </div>
    </HydrationBoundary>
  );
}
