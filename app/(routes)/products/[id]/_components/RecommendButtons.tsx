'use client';

import { useState } from 'react';

import { useRequireAuth } from '@/hooks/useRequireAuth';
import { addItemReaction, removeItemReaction } from '@/lib/apis/reaction.api';
import { formatOverThousand } from '@/utils/formatNumber';

interface RecommendButtonsProps {
  likesCount: number;
  wantsCount: number;
  revisitsCount: number;
  itemId: number;
  hasLike: boolean;
  hasWant: boolean;
  hasRevisit: boolean;
  likeId: number | null;
  wantId: number | null;
  revisitId: number | null;
  onReactionChange?: (counts: {
    likesCount: number;
    wantsCount: number;
    revisitsCount: number;
  }) => void;
}

export default function RecommendButtons({
  likesCount,
  wantsCount,
  revisitsCount,
  itemId,
  hasLike,
  hasWant,
  hasRevisit,
  likeId,
  wantId,
  revisitId,
  onReactionChange,
}: RecommendButtonsProps) {
  const { checkAuth } = useRequireAuth();

  const [likes, setLikes] = useState(likesCount);
  const [wants, setWants] = useState(wantsCount);
  const [revisits, setRevisits] = useState(revisitsCount);

  const [liked, setLiked] = useState(hasLike);
  const [wanted, setWanted] = useState(hasWant);
  const [revisited, setRevisited] = useState(hasRevisit);

  const [emojiIds, setEmojiIds] = useState({
    LIKES: likeId,
    WANTS: wantId,
    REVISITS: revisitId,
  });

  const optimisticToggle = async (
    type: 'LIKES' | 'WANTS' | 'REVISITS',
    current: boolean,
    setState: (v: boolean) => void,
    count: number,
    setCount: (v: number) => void
  ) => {
    checkAuth(async () => {
      const next = !current;
      const originalCount = count;
      const originalState = current;
      const prevEmojiId = emojiIds[type];

      setState(next);
      setCount(next ? originalCount + 1 : originalCount - 1);

      try {
        if (next) {
          const response = await addItemReaction(itemId, type);
          const newId = response?.result;
          setEmojiIds((prev) => ({ ...prev, [type]: newId }));
        } else {
          if (prevEmojiId != null) {
            await removeItemReaction(prevEmojiId);
            setEmojiIds((prev) => ({ ...prev, [type]: null }));
          }
        }
      } catch (err) {
        console.error(`Reaction ${type} failed`, err);
        setState(originalState);
        setCount(originalCount);
      }
    });
  };

  return (
    <div className="flex gap-1.5">
      <button
        className={`border-custom-gray-100 cursor-pointer rounded-4xl border-[1px] px-[13px] py-[8px] text-[14px] ${liked ? 'text-custom-background bg-custom-brand-primary' : 'text-custom-brand-primary'}`}
        onClick={() => {
          const newLikes = liked ? likes - 1 : likes + 1;
          optimisticToggle('LIKES', liked, setLiked, likes, setLikes);
          onReactionChange?.({ likesCount: newLikes, wantsCount: wants, revisitsCount: revisits });
        }}
      >
        💖 마음에 들어요
        {formatOverThousand(likes)}
      </button>
      <button
        className={`border-custom-gray-100 cursor-pointer rounded-4xl border-[1px] px-[13px] py-[8px] text-[14px] ${wanted ? 'text-custom-background bg-custom-brand-primary' : 'text-custom-brand-primary'}`}
        onClick={() => {
          const newWants = wanted ? wants - 1 : wants + 1;
          optimisticToggle('WANTS', wanted, setWanted, wants, setWants);
          onReactionChange?.({ likesCount: likes, wantsCount: newWants, revisitsCount: revisits });
        }}
      >
        🖼️ 소장하고 싶어요
        {formatOverThousand(wants)}
      </button>
      <button
        className={`border-custom-gray-100 cursor-pointer rounded-4xl border-[1px] px-[13px] py-[8px] text-[14px] ${revisited ? 'text-custom-background bg-custom-brand-primary' : 'text-custom-brand-primary bg-custom-background'}`}
        onClick={() => {
          const newRevisits = revisited ? revisits - 1 : revisits + 1;
          optimisticToggle('REVISITS', revisited, setRevisited, revisits, setRevisits);
          onReactionChange?.({ likesCount: likes, wantsCount: wants, revisitsCount: newRevisits });
        }}
      >
        👀 또 보고 싶어요
        {formatOverThousand(revisits)}
      </button>
    </div>
  );
}
