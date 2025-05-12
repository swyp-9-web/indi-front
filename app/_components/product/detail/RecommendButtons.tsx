'use client';

import { useState } from 'react';

import { API_BASE_URL } from '@/constants/url';
import { formatOverThousand } from '@/utils/formatNumber';

interface RecommendButtonsProps {
  likesCount: number;
  wantsCount: number;
  revisitsCount: number;
  itemId: number;
  initialReactions: { likes: number; wants: number; revisits: number };
}

export default function RecommendButtons({
  likesCount,
  wantsCount,
  revisitsCount,
  itemId,
  initialReactions,
}: RecommendButtonsProps) {
  const [likes, setLikes] = useState(likesCount);
  const [wants, setWants] = useState(wantsCount);
  const [revisits, setRevisits] = useState(revisitsCount);

  const handleReactionClick = async (type: 'likes' | 'wants' | 'revisits') => {
    if (type === 'likes') setLikes((prev) => prev + 1);
    if (type === 'wants') setWants((prev) => prev + 1);
    if (type === 'revisits') setRevisits((prev) => prev + 1);

    try {
      await fetch(`${API_BASE_URL.CLIENT}/api/v1/items/${itemId}/reactions`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type }),
      });
    } catch (error) {
      console.error('Reaction failed', error);
    }
  };

  return (
    <div className="flex gap-1.5">
      <button
        className="border-custom-gray-100 text-custom-brand-primary rounded-4xl border-[1px] px-[13px] py-[8px] text-[14px]"
        onClick={() => handleReactionClick('likes')}
      >
        💖 마음에 들어요 {formatOverThousand(likes)}
      </button>
      <button
        className="border-custom-gray-100 text-custom-brand-primary rounded-4xl border-[1px] px-[13px] py-[8px] text-[14px]"
        onClick={() => handleReactionClick('wants')}
      >
        🖼️ 소장하고 싶어요 {formatOverThousand(wants)}
      </button>
      <button
        className="border-custom-gray-100 text-custom-brand-primary rounded-4xl border-[1px] px-[13px] py-[8px] text-[14px]"
        onClick={() => handleReactionClick('revisits')}
      >
        👀 또 보고 싶어요 {formatOverThousand(revisits)}
      </button>
    </div>
  );
}
