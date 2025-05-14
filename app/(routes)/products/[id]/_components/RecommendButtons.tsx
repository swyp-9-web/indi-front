'use client';

import { useState } from 'react';

import { addItemReaction, removeItemReaction } from '@/lib/apis/reaction.api';
import { formatOverThousand } from '@/utils/formatNumber';

interface RecommendButtonsProps {
  likesCount: number;
  wantsCount: number;
  revisitsCount: number;
  itemId: number;
}

export default function RecommendButtons({
  likesCount,
  wantsCount,
  revisitsCount,
  itemId,
}: RecommendButtonsProps) {
  const [likes, setLikes] = useState(likesCount);
  const [wants, setWants] = useState(wantsCount);
  const [revisits, setRevisits] = useState(revisitsCount);

  const [liked, setLiked] = useState(false);
  const [wanted, setWanted] = useState(false);
  const [revisited, setRevisited] = useState(false);

  const handleReactionClick = async (type: 'LIKES' | 'WANTS' | 'REVISITS') => {
    let method = 'POST';
    if (type === 'LIKES') {
      const next = !liked;
      setLiked(next);
      setLikes((prev) => prev + (next ? 1 : -1));
      method = next ? 'POST' : 'DELETE';
    }
    if (type === 'WANTS') {
      const next = !wanted;
      setWanted(next);
      setWants((prev) => prev + (next ? 1 : -1));
      method = next ? 'POST' : 'DELETE';
    }
    if (type === 'REVISITS') {
      const next = !revisited;
      setRevisited(next);
      setRevisits((prev) => prev + (next ? 1 : -1));
      method = next ? 'POST' : 'DELETE';
    }

    try {
      if (method === 'POST') {
        addItemReaction(itemId, type);
      } else {
        removeItemReaction(itemId);
      }
    } catch (error) {
      console.error('Reaction failed', error);
    }
  };

  return (
    <div className="flex gap-1.5">
      <button
        className={`border-custom-gray-100 active:text-custom-background active:bg-custom-brand-primary text-custom-brand-primary rounded-4xl border-[1px] px-[13px] py-[8px] text-[14px] ${liked ? 'bg-custom-brand-primary/10' : ''}`}
        onClick={() => handleReactionClick('LIKES')}
      >
        💖 마음에 들어요 {formatOverThousand(likes)}
      </button>
      <button
        className={`border-custom-gray-100 text-custom-brand-primary rounded-4xl border-[1px] px-[13px] py-[8px] text-[14px] ${wanted ? 'bg-custom-brand-primary/10' : ''}`}
        onClick={() => handleReactionClick('WANTS')}
      >
        🖼️ 소장하고 싶어요 {formatOverThousand(wants)}
      </button>
      <button
        className={`border-custom-gray-100 text-custom-brand-primary rounded-4xl border-[1px] px-[13px] py-[8px] text-[14px] ${revisited ? 'bg-custom-brand-primary/10' : ''}`}
        onClick={() => handleReactionClick('REVISITS')}
      >
        👀 또 보고 싶어요 {formatOverThousand(revisits)}
      </button>
    </div>
  );
}
