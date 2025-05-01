'use client';

import { useState } from 'react';

import Image from 'next/image';
import Link from 'next/link';

import { ROUTE_PATHS } from '@/constants';
import { Product } from '@/lib/apis/products.type';
import { CardBookmarkFilledIcon, CardBookmarkIcon } from '@/lib/icons';
import { cn } from '@/lib/utils';
import { formatNumberWithComma, formatOverThousand } from '@/utils/formatNumber';
import { getSizeLabelByValue } from '@/utils/itemUtils';

interface ProductCardProps {
  textColor?: 'dark' | 'light';
  hasScrapCount?: boolean;
  product: Product;
}

export default function ProductCard({
  textColor = 'dark',
  hasScrapCount = false,
  product,
}: ProductCardProps) {
  return (
    <article className="relative">
      <figure className="bg-custom-gray-100 relative flex h-76.5 w-76.5 items-center justify-center rounded-xl">
        {product.thumbnailImgUrl ? (
          <Image
            fill
            src={product.thumbnailImgUrl}
            className="rounded-xl object-cover"
            alt="작품 이미지"
          />
        ) : (
          <figcaption className="text-custom-gray-400 text-base">No Image</figcaption>
        )}
      </figure>

      <SizeBadge sizeValue={product.size} />

      <div className="absolute top-2.5 right-2.5 flex flex-col items-center justify-center gap-0">
        <ScrapButton
          isScraped={product.scrap.isScrapped}
          hasScrapCount={hasScrapCount}
          totalScraped={product.totalScraped}
        />
      </div>

      <div className="mt-2.5">
        <p className="mb-0.5 leading-0">
          <Link
            href={ROUTE_PATHS.ARTIST(String(product.artist.id))}
            className={cn(
              'text-xs font-semibold underline-offset-2 hover:underline',
              textColor === 'dark' ? 'text-custom-gray-300' : 'text-custom-gray-100'
            )}
          >
            {product.artist.nickname}
          </Link>
        </p>
        <h2 className="mb-1.5 leading-0">
          <Link
            href={ROUTE_PATHS.PRODUCT_DETAIL(String(product.id))}
            className={cn(
              'text-sm font-semibold underline-offset-2 hover:underline',
              textColor === 'dark' ? 'text-custom-brand-primary' : 'text-custom-background'
            )}
          >
            {product.name || 'untitled'}
          </Link>
        </h2>
        <p
          className={cn(
            'text-custom-brand-primary text-sm font-semibold',
            textColor === 'dark' ? 'text-custom-brand-primary' : 'text-custom-background'
          )}
        >
          {product.price ? `${formatNumberWithComma(product.price)}원` : '구매시 문의'}
        </p>
      </div>
    </article>
  );
}

interface SizeBadgeProps {
  sizeValue: string;
}

function SizeBadge({ sizeValue }: SizeBadgeProps) {
  const sizeLabel = getSizeLabelByValue(sizeValue);

  if (!sizeLabel || sizeValue === 'X') return null;

  return (
    <div className="text-custom-brand-primary bg-custom-background absolute top-4 left-4 rounded-full px-2.5 py-1.5 text-xs font-normal">
      {sizeLabel}
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
    <button onClick={handleScrapButtonClick} className="cursor-pointer">
      {optimisticScraped ? <CardBookmarkFilledIcon /> : <CardBookmarkIcon />}
      {hasScrapCount && (
        <p className="text-custom-background text-xs">{formatOverThousand(optimisticScrapCount)}</p>
      )}
    </button>
  );
}
