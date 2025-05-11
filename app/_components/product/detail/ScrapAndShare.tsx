'use client';

import { useEffect, useState } from 'react';

import Link from 'next/link';

import { useScrapToggle } from '@/hooks/useScrapToggle';
import type { ProductDetail } from '@/lib/apis/products.type';
import { BookmarkFilledIcon } from '@/lib/icons/index';
import { BookmarkIcon } from '@/lib/icons/index';
import { ShareIcon } from '@/lib/icons/index';
import { formatOverThousand } from '@/utils/formatNumber';

interface ScrapAndShareProps {
  product: ProductDetail;
  hasCount: boolean;
}

export default function ScrapAndShare({ product, hasCount }: ScrapAndShareProps) {
  const { isScraped, toggleIsScraped } = useScrapToggle(product.itemId, product.viewer.isScrapped);
  const [url, setUrl] = useState('');

  useEffect(() => {
    setUrl(window.location.href);
  }, []);

  const handleShareClick = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(url);
      alert('현재 페이지 URL이 복사되었습니다.');
    } else {
      alert('클립보드 지원이 필요합니다.');
    }
  };

  return (
    <div className="flex items-center gap-[17px]">
      <button>
        <button onClick={toggleIsScraped} className="cursor-pointer">
          {isScraped ? <BookmarkFilledIcon /> : <BookmarkIcon />}
          {hasCount && (
            <p className="text-custom-background text-custom-brand-primary text-xs">
              {formatOverThousand(product.totalScrapCount)}+
            </p>
          )}
        </button>
      </button>
      <button onClick={handleShareClick} className="cursor-pointer">
        <ShareIcon className="!h-6 !w-6" />
      </button>
    </div>
  );
}
