'use client';

import dynamic from 'next/dynamic';

import CommentHistoryList from './_components/CommentHistoryList';
import UserSupportSection from './_components/UserSupportSection';

const UserProfilePanel = dynamic(() => import('./_components/UserProfilePanel'), {
  ssr: false,
});

export default function MyPage() {
  return (
    <main className="w-8xl mx-auto flex gap-15 p-25">
      <div className="w-90">
        <UserProfilePanel />
        <UserSupportSection />
      </div>
      <div className="flex-1">
        <h2 className="text-custom-brand-primary mb-4.5 text-2xl font-bold">댓글 활동 내역</h2>
        <CommentHistoryList />
      </div>
    </main>
  );
}
