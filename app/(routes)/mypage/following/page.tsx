'use client';

import ScrollToTopButton from '@/app/_components/shared/ScrollToTopButton';
import { useFollowingArtists } from '@/lib/queries/useFollowingQueries';
import { formatOverThousand } from '@/utils/formatNumber';

import FollowingArtistList from './_components/FollowingArtistList';
import NoFollowingArtists from './_components/NoFollowingArtists';

export default function MyFollowing() {
  const { data, isLoading } = useFollowingArtists({ page: 1, limit: 5 });

  if (isLoading)
    return (
      <div className="mt-100 flex items-center justify-center">
        <div className="border-custom-gray-200 h-12 w-12 animate-spin rounded-full border-4 border-t-transparent" />
      </div>
    );

  const artists = data?.result.artists ?? [];
  const followingCount = data?.result.totalFollowing ?? 0;

  return (
    <main className="w-8xl mx-auto mt-20 px-20">
      <h2 className="text-custom-brand-primary mb-15 text-2xl font-bold">
        {`팔로잉 중인 작가(${formatOverThousand(followingCount)})`}
      </h2>

      {followingCount ? (
        <FollowingArtistList artists={artists} meta={data?.result.meta} />
      ) : (
        <NoFollowingArtists />
      )}

      <div className="mb-25" />

      <ScrollToTopButton />
    </main>
  );
}
