import { useEffect, useRef, useState } from 'react';

import { useInfiniteCommentHistory } from '@/lib/queries/useCommentsQueries';

import CommentHistory from './CommentHistory';

export default function CommentHistoryList() {
  const [startInfinite, setStartInfinite] = useState(false);
  const observerRef = useRef<HTMLDivElement | null>(null);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteCommentHistory({
    limit: 5,
  });

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
    <div className="border-custom-gray-100 border-t">
      {data?.pages.map((page) =>
        page.result.comments.map((item) => (
          <CommentHistory key={item.myComment.id} commentHistory={item} />
        ))
      )}

      {!startInfinite && data?.pages[0].result.meta.hasNextPage && (
        <button
          onClick={() => setStartInfinite(true)}
          className="border-custom-gray-100 mx-auto mt-17 flex h-11.5 w-46 cursor-pointer items-center justify-center rounded-full border text-sm font-medium"
        >
          더보기
        </button>
      )}

      {startInfinite && hasNextPage && (
        <div ref={observerRef} className="mt-10 flex h-10 items-center justify-center">
          <div className="border-custom-gray-200 h-12 w-12 animate-spin rounded-full border-4 border-t-transparent" />
        </div>
      )}
    </div>
  );
}
