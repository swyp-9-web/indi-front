'use client';

import { notFound } from 'next/navigation';

import { useArtistApplies } from '@/hooks/useArtistApplies';
import { useUserSummary } from '@/lib/queries/useUserQueries';

import PageNavigator from '../../products/[id]/_components/CommentSection/PageNavigator';

import ArtistRow from './ArtistRow';

export default function ArtistsList() {
  const { data: userData, isLoading: userLoading } = useUserSummary();
  const user = userData?.result ?? null;
  const { data, loading, currentPage, setCurrentPage, totalPage } = useArtistApplies(1, 10);

  if (userLoading) return <p>관리자 인증 확인 중...</p>;
  if (user?.role !== 'ADMIN') notFound();
  if (loading || !data) return <p>Loading...</p>;

  return (
    <>
      {data.result.applies.length === 0 ? (
        <p>결과가 없습니다.</p>
      ) : (
        <div className="...">
          <table role="grid" aria-rowcount={data.result.meta.totalApplies} className="...">
            <thead className="bg-gray-50">
              <tr className="text-custom-gray-900 text-center whitespace-nowrap">
                <th className="px-4 py-2 text-sm font-medium">번호</th>
                <th className="px-4 py-2 text-sm font-medium">상태</th>
                <th className="px-4 py-2 text-sm font-medium">유저ID</th>
                <th className="px-4 py-2 text-sm font-medium">닉네임</th>
                <th className="px-4 py-2 text-sm font-medium">이메일</th>
                <th className="px-4 py-2 text-sm font-medium">SNS 링크</th>
                <th className="px-4 py-2 text-sm font-medium">신청일</th>
                <th className="px-4 py-2 text-sm font-medium">자기소개</th>
                <th className="px-4 py-2 text-sm font-medium">승인/거절</th>
                <th className="px-4 py-2 text-sm font-medium">상세보기</th>
              </tr>
            </thead>
            <tbody>
              {data.result.applies.map((apply) => (
                <ArtistRow key={apply.id} apply={apply} />
              ))}
            </tbody>
          </table>
        </div>
      )}
      <PageNavigator
        currentPage={currentPage}
        totalPage={totalPage}
        onPageChange={setCurrentPage}
      />
    </>
  );
}
