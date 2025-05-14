'use client';

import { useState } from 'react';

import { createEmoji, deleteEmoji } from '@/lib/apis/emoji.api';
import { Emoji, EmojiType } from '@/lib/apis/emoji.type';
import { useUserSummary } from '@/lib/queries/useUserQueries';
import { formatOverThousand } from '@/utils/formatNumber';

interface RecommendButtonsProps {
  likesCount: number;
  wantsCount: number;
  revisitsCount: number;
  itemId: number;
  itemsReactions: Emoji[];
}

export default function RecommendButtons({
  likesCount,
  wantsCount,
  revisitsCount,
  itemId,
  itemsReactions,
}: RecommendButtonsProps) {
  const { data } = useUserSummary();
  const user = data?.result ?? null;

  const [userEmojis, setUserEmojis] = useState<Emoji[]>(itemsReactions);
  const [reactions, setReactions] = useState({
    [EmojiType.LIKES]: likesCount,
    [EmojiType.WANTS]: wantsCount,
    [EmojiType.REVISITS]: revisitsCount,
  });

  const isActive = (emojiType: EmojiType) =>
    userEmojis.some((e) => e.emojiType === emojiType && e.userName === user?.nickname);

  const toggleEmoji = async (emojiType: EmojiType) => {
    const existing = userEmojis.find(
      (e) => e.emojiType === emojiType && e.userName === user?.nickname
    );

    if (existing) {
      await deleteEmoji(existing.id);
      setUserEmojis((prev) => prev.filter((e) => e.id !== existing.id));
      setReactions((prev) => ({
        ...prev,
        [emojiType]: prev[emojiType] - 1,
      }));
    } else {
      const res = await createEmoji({ itemId, emojiType });
      const newEmoji: Emoji = {
        id: res.result,
        itemId,
        emojiType,
        userName: user?.nickname ?? '',
        createdAt: new Date().toISOString(),
      };
      setUserEmojis((prev) => [...prev, newEmoji]);
      setReactions((prev) => ({
        ...prev,
        [emojiType]: prev[emojiType] + 1,
      }));
    }
  };

  return (
    <div className="flex gap-1.5">
      <button
        className={`border-custom-gray-100 rounded-4xl border-[1px] px-[13px] py-[8px] text-[14px] ${
          isActive(EmojiType.LIKES)
            ? 'text-custom-background bg-custom-brand-primary'
            : 'text-custom-brand-primary'
        }`}
        onClick={() => toggleEmoji(EmojiType.LIKES)}
      >
        💖 마음에 들어요 {formatOverThousand(reactions[EmojiType.LIKES])}
      </button>
      <button
        className={`border-custom-gray-100 rounded-4xl border-[1px] px-[13px] py-[8px] text-[14px] ${
          isActive(EmojiType.WANTS)
            ? 'text-custom-background bg-custom-brand-primary'
            : 'text-custom-brand-primary'
        }`}
        onClick={() => toggleEmoji(EmojiType.WANTS)}
      >
        🖼️ 소장하고 싶어요 {formatOverThousand(reactions[EmojiType.WANTS])}
      </button>
      <button
        className={`border-custom-gray-100 rounded-4xl border-[1px] px-[13px] py-[8px] text-[14px] ${
          isActive(EmojiType.REVISITS)
            ? 'text-custom-background bg-custom-brand-primary'
            : 'text-custom-brand-primary'
        }`}
        onClick={() => toggleEmoji(EmojiType.REVISITS)}
      >
        👀 또 보고 싶어요 {formatOverThousand(reactions[EmojiType.REVISITS])}
      </button>
    </div>
  );
}
