import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';

import { fetchUserSummary } from '@/lib/apis/user.api';
import { QUERY_KEYS } from '@/lib/queries/queryKeys';

import HeaderCenterSection from './HeaderCenterSection';
import HeaderLeftSection from './HeaderLeftSection';
import HeaderRightSection from './HeaderRightSection';

export default async function GlobalNavBar() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: QUERY_KEYS.user.summary,
    queryFn: () => fetchUserSummary(),
  });

  const dehydrateState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydrateState}>
      <header className="border-custom-gray-100 bg-custom-background absolute inset-x-0 top-0 z-50 h-14 border-b">
        <div className="w-8xl mx-auto flex h-full items-center justify-between px-6">
          <HeaderLeftSection />
          <HeaderCenterSection />
          <HeaderRightSection />
        </div>
      </header>
    </HydrationBoundary>
  );
}
