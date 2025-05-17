import Image from 'next/image';
import Link from 'next/link';

import { ROUTE_PATHS } from '@/constants';
import { Product } from '@/lib/apis/products.type';
import { cn } from '@/lib/utils';
import { formatNumberWithComma } from '@/utils/formatNumber';
import { getSizeLabelByValue } from '@/utils/item';

import ScrapButton from './ScrapButton';

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
    <article className={cn('relative w-76.25', size === 'small' && 'w-65')}>
      <figure
        className={cn(
          'bg-custom-gray-100 relative flex h-76.25 w-76.25 items-center justify-center rounded-lg',
          size === 'small' && 'h-65 w-65'
        )}
      >
        {product.thumbnailImgUrl ? (
          <Link href={ROUTE_PATHS.PRODUCT_DETAIL(String(product.id))}>
            <Image
              fill
              src={product.thumbnailImgUrl}
              className="rounded-lg object-cover"
              alt="작품 이미지"
            />
          </Link>
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
              'block truncate text-xs font-semibold underline-offset-2 hover:underline',
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
              'block truncate text-sm font-semibold underline-offset-2 hover:underline',
              textColor === 'dark' ? 'text-custom-brand-primary' : 'text-custom-background'
            )}
          >
            {product.name}
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
