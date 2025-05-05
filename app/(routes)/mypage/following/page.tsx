'use client';

import ScrollToTopButton from '@/app/_components/shared/ScrollToTopButton';
import { formatOverThousand } from '@/utils/formatNumber';

import FollowingArtistList from './_components/FollowingArtistList';
import NoFollowingArtists from './_components/NoFollowingArtists';

export default function MyFollowing() {
  const followingCount = 30;

  return (
    <main className="w-8xl mx-auto mt-20 px-20">
      <h2 className="text-custom-brand-primary mb-15 text-2xl font-bold">
        {`팔로잉 중인 작가(${formatOverThousand(followingCount)})`}
      </h2>

      {followingCount ? <FollowingArtistList /> : <NoFollowingArtists />}

      <ScrollToTopButton />
    </main>
  );
}
