'use client';

import { useEffect, useRef, useState } from 'react';

import { useInfiniteFollowingArtists } from '@/lib/queries/useFollowingQueries';

import FollowingArtistRow from './FollowingArtistRow';

export default function InfiniteArtistList() {
  const [startInfinite, setStartInfinite] = useState(false);
  const observerRef = useRef<HTMLDivElement | null>(null);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteFollowingArtists(
    { limit: 5 },
    startInfinite
  );

  useEffect(() => {
    if (!startInfinite || !hasNextPage || isFetchingNextPage) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { rootMargin: '50px' }
    );

    const current = observerRef.current;
    if (current) observer.observe(current);

    return () => {
      if (current) observer.unobserve(current);
    };
  }, [startInfinite, hasNextPage, isFetchingNextPage, fetchNextPage]);

  return (
    <>
      {startInfinite &&
        data?.pages.map((page) =>
          page.result.artists.map((artist) => (
            <FollowingArtistRow key={artist.id} artist={artist} />
          ))
        )}

      {!startInfinite && (
        <button
          onClick={() => setStartInfinite(true)}
          className="border-custom-gray-100 text-custom-brand-primary mx-auto mt-20 flex h-11.5 w-46 cursor-pointer items-center justify-center rounded-full border text-sm font-medium"
        >
          더보기
        </button>
      )}

      {startInfinite && hasNextPage && (
        <div ref={observerRef} className="mt-10 flex h-10 items-center justify-center">
          <div className="border-custom-gray-200 h-12 w-12 animate-spin rounded-full border-4 border-t-transparent" />
        </div>
      )}
    </>
  );
}
