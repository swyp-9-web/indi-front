'use client';

import { useState } from 'react';

import Image from 'next/image';
import Link from 'next/link';

import { ROUTE_PATHS } from '@/constants';
import { useDebouncedCallback } from '@/hooks/useDebounce';
import { Product } from '@/lib/apis/products.type';
import { CardBookmarkFilledIcon, CardBookmarkIcon } from '@/lib/icons';
import { useToggleProductScrap } from '@/lib/queries/useProductsQueries';
import { useUserSummary } from '@/lib/queries/useUserQueries';
import { cn } from '@/lib/utils';
import { useAuthDialog } from '@/stores/useAuthDialog';
import { formatNumberWithComma, formatOverThousand } from '@/utils/formatNumber';
import { getSizeLabelByValue } from '@/utils/item';

interface ProductCardProps {
  textColor?: 'dark' | 'light';
  hasScrapCount?: boolean;
  product: Product;
  size?: 'normal' | 'small';
}

export default function ProductCard({
  textColor = 'dark',
  hasScrapCount = false,
  product,
  size = 'normal',
}: ProductCardProps) {
  return (
    <article className="relative">
      <figure
        className={cn(
          'bg-custom-gray-100 relative flex h-76.25 w-76.25 items-center justify-center rounded-xl',
          size === 'small' && 'h-65 w-65'
        )}
      >
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
        <ScrapButton product={product} hasScrapCount={hasScrapCount} />
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
  product: Product;
  hasScrapCount: boolean;
}

function ScrapButton({ product, hasScrapCount }: ScrapButtonProps) {
  const [isScraped, setIsScraped] = useState(product.scrap.isScrapped);
  const [scrapCount, setScrapCount] = useState(product.totalScraped);

  const [serverScrapState, setServerScrapState] = useState(product.scrap.isScrapped);

  const { toggleIsOpen: toggleAuthDialogOpen } = useAuthDialog();
  const { data: user } = useUserSummary();
  const { mutate: toggleScrap } = useToggleProductScrap();

  const debouncedToggleScrap = useDebouncedCallback(
    (nextIsScraped: boolean, previousScrapCount: number) => {
      if (isScraped === serverScrapState) return;

      toggleScrap(
        { productId: product.id, isScraped: serverScrapState },
        {
          onSuccess: () => setServerScrapState(nextIsScraped),
          onError: () => {
            setIsScraped(serverScrapState);
            setScrapCount(previousScrapCount);
          },
        }
      );
    }
  );

  const handleScrapButtonClick = () => {
    if (!user || !user.result) {
      toggleAuthDialogOpen();
      return;
    }

    const nextIsScraped = !isScraped;
    const previousScrapCount = scrapCount;
    const nextScrapCount = isScraped ? previousScrapCount - 1 : previousScrapCount + 1;

    setIsScraped(nextIsScraped);
    setScrapCount(nextScrapCount);

    debouncedToggleScrap(nextIsScraped, previousScrapCount);
  };

  return (
    <button onClick={handleScrapButtonClick} className="cursor-pointer">
      {isScraped ? <CardBookmarkFilledIcon /> : <CardBookmarkIcon />}
      {hasScrapCount && (
        <p className="text-custom-background text-xs">{formatOverThousand(scrapCount)}</p>
      )}
    </button>
  );
}
