import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';

import { fetchArtistAppliesList } from '@/lib/apis/admin.api';
import { fetchUserSummary } from '@/lib/apis/user.api';
import { QUERY_KEYS } from '@/lib/queries/queryKeys';

import AllowAndDisallow from './_components/AllowAndDisallow';
import Status from './_components/Status';
import ViewDetails from './_components/ViewDetails';

export default async function AdminPage() {
  const { result: artistApplies } = await fetchArtistAppliesList({ runtime: 'server' });
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
      <div className="mx-20 my-25">
        <div className="mx-auto flex max-w-7xl flex-col gap-10">
          <h1 className="text-custom-brand-primary text-2xl font-bold">아티스트 지원 목록</h1>
          {artistApplies.applies.length === 0 ? (
            <p>No applications found.</p>
          ) : (
            <div className="border-custom-brand-primary w-full overflow-x-auto rounded-2xl border-[1px]">
              <table className="divide-custom-brand-primary min-w-full divide-y bg-[##e0ded8]">
                <thead className="bg-gray-50">
                  <tr className="text-custom-gray-900 text-center whitespace-nowrap">
                    <th className="px-4 py-2 text-sm font-medium">번호</th>
                    <th className="px-4 py-2 text-sm font-medium">상태/반려수</th>
                    <th className="px-4 py-2 text-sm font-medium">유저 ID</th>
                    <th className="px-4 py-2 text-sm font-medium">닉네임</th>
                    <th className="px-4 py-2 text-sm font-medium">이메일</th>
                    <th className="px-4 py-2 text-sm font-medium">SNS 링크</th>
                    <th className="px-4 py-2 text-sm font-medium">생성일</th>
                    <th className="px-4 py-2 text-sm font-medium">설명</th>
                    <th className="px-4 py-2 text-sm font-medium">허용</th>
                    <th className="px-4 py-2 text-sm font-medium">상세보기</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {artistApplies.applies.map((apply) => (
                    <tr key={apply.id} className="text-custom-brand-primary text-center">
                      <td className="px-4 py-2 text-sm whitespace-nowrap">{apply.id}</td>
                      <td>
                        <Status status={apply.status} rejCount={apply.rejectedCount} />
                      </td>
                      <td className="px-4 py-2 text-sm whitespace-nowrap">{apply.user.id}</td>
                      <td className="px-4 py-2 text-sm whitespace-nowrap">{apply.user.nickname}</td>
                      <td className="px-4 py-2 text-sm whitespace-nowrap">{apply.email}</td>
                      <td className="px-4 py-2 text-sm whitespace-nowrap">
                        {apply.snsLink ? (
                          <a
                            href={apply.snsLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="rounded-2xl border-[1px] border-blue-600 px-2 py-1 text-blue-600"
                          >
                            링크
                          </a>
                        ) : (
                          '—'
                        )}
                      </td>
                      <td className="px-4 py-2 text-sm whitespace-nowrap">
                        {(() => {
                          const date = new Date(apply.createdAt);
                          const yy = String(date.getFullYear()).slice(-2);
                          const mm = String(date.getMonth() + 1).padStart(2, '0');
                          const dd = String(date.getDate()).padStart(2, '0');
                          return `${yy}.${mm}.${dd}`;
                        })()}
                      </td>
                      <td className="max-w-52 px-4 py-2 text-sm">
                        <span className="block truncate">{apply.artistAboutMe}</span>
                      </td>
                      <td>
                        <AllowAndDisallow userId={apply.user.id} applyedId={apply.id} />
                      </td>
                      <td>
                        <ViewDetails detail={apply} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </HydrationBoundary>
  );
}
