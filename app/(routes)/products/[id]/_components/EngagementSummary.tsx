'use client';

import { SmsIcon } from '@/lib/icons';
import { useProductComments } from '@/lib/queries/useCommentsQueries';
import { formatOverThousand } from '@/utils/formatNumber';

interface EngagementSummaryProps {
  productId: number;
  reactionTotal: number;
}

export default function EngagementSummary({ productId, reactionTotal }: EngagementSummaryProps) {
  const { data } = useProductComments(productId, { page: 1, limit: 3 });
  const count = data?.result.totalComments ?? 0;

  return (
    <div className="mb-15 flex gap-1.5">
      <div className="border-custom-gray-100 flex items-center justify-center gap-1 rounded-4xl border-[1px] px-2.5 py-1.5">
        <div className="flex -space-x-2">
          <div className="bg-custom-brand-secondary border-custom-background z-10 flex h-6 w-6 items-center justify-center rounded-full border-[1px] text-[14px]">
            💖
          </div>
          <div className="bg-custom-brand-secondary flex h-6 w-6 items-center justify-center rounded-full text-[14px]">
            👀
          </div>
        </div>
        {formatOverThousand(reactionTotal)}
      </div>
      <div className="border-custom-gray-100 flex items-center justify-center gap-1 rounded-4xl border-[1px] px-2.5 py-1.5">
        <SmsIcon />
        {formatOverThousand(count)}
      </div>
    </div>
  );
}
