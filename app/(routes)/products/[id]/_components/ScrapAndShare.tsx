'use client';

import { useEffect, useState } from 'react';

import { useScrapToggle } from '@/hooks/useScrapToggle';
import type { ProductDetail } from '@/lib/apis/products.type';
import { BookmarkFilledIcon, BookmarkIcon, ShareIcon } from '@/lib/icons';
import toast from '@/lib/toast';
import { formatOverThousand } from '@/utils/formatNumber';

interface ScrapAndShareProps {
  product: ProductDetail;
}

export default function ScrapAndShare({ product }: ScrapAndShareProps) {
  const { isScraped, toggleIsScraped } = useScrapToggle(product.itemId, product.viewer.isScrapped);
  const [count, setCount] = useState(product.totalScrapCount);
  const [url, setUrl] = useState('');

  useEffect(() => {
    setUrl(window.location.href);
  }, []);

  const handleShareClick = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(url);
      toast.default('현재 페이지 URL이 복사되었습니다.');
    } else {
      toast.error('클립보드 지원이 필요합니다.');
    }
  };

  const handleScrap = async () => {
    try {
      toggleIsScraped();

      setCount((prev) => prev + (isScraped ? -1 : 1));
    } catch {
      toast.error('스크랩 처리에 실패했습니다.');
    }
  };

  return (
    <div className="flex items-center gap-[17px]">
      <button onClick={handleScrap} className="cursor-pointer">
        {isScraped ? <BookmarkFilledIcon /> : <BookmarkIcon />}
        <p className="text-custom-brand-primary text-xs">{formatOverThousand(count)}</p>
      </button>

      <button onClick={handleShareClick} className="cursor-pointer">
        <ShareIcon className="!h-6 !w-6" />
      </button>
    </div>
  );
}
