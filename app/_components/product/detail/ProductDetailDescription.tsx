'use client';

import { useState } from 'react';

import { BookmarkIcon, CardBookmarkIcon } from '@/lib/icons';
import { formatNumberWithComma, formatOverThousand } from '@/utils/formatNumber';

export default function ProductDetailDescription() {
  return (
    <div className="flex flex-col">
      <div className="flex items-center gap-10">
        <h1 className="text-custom-brand-primary w-[26.6rem] text-left text-2xl">
          작품명작품명작품명작품명
        </h1>
        <div className="flex gap-5">
          <ScrapButton isScraped={false} hasScrapCount={false} totalScraped={2} />
        </div>
      </div>
    </div>
  );
}

interface ScrapButtonProps {
  isScraped: boolean;
  hasScrapCount: boolean;
  totalScraped: number;
}

// TODO: 스크랩 버튼 클릭 시 API 요청 필요, debounce 적용 필요
function ScrapButton({ isScraped, hasScrapCount, totalScraped }: ScrapButtonProps) {
  const [optimisticScraped, setOptimisticScraped] = useState(isScraped);
  const [optimisticScrapCount, setOptimisticScrapCount] = useState(totalScraped);

  const handleScrapButtonClick = () => {
    setOptimisticScraped((prev) => !prev);
    setOptimisticScrapCount((prev) => (optimisticScraped ? prev - 1 : prev + 1));
  };

  return (
    <button onClick={handleScrapButtonClick} className="h-6 w-6 cursor-pointer">
      {optimisticScraped ? <CardBookmarkIcon /> : <BookmarkIcon width={24} height={24} />}
      {hasScrapCount && (
        <p className="text-custom-brand-primary text-xs">
          {formatOverThousand(optimisticScrapCount)}
        </p>
      )}
    </button>
  );
}
