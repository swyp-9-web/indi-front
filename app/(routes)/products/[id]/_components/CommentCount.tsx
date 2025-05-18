'use client';

import { SmsIcon } from '@/lib/icons';
import { useProductComments } from '@/lib/queries/useCommentsQueries';
import { formatOverThousand } from '@/utils/formatNumber';

export default function CommentCount({ productId }: { productId: number }) {
  const { data } = useProductComments(productId, { page: 1, limit: 3 });

  const count = data?.result.totalComments ?? 0;

  return (
    <>
      <div className="border-custom-gray-100 flex items-center justify-center gap-1 rounded-4xl border-[1px] px-2.5 py-1.5">
        <SmsIcon />
        {formatOverThousand(count)}
      </div>
    </>
  );
}
