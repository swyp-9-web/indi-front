'use client';

import { useScrapToggle } from '@/hooks/useScrapToggle';
import { Product } from '@/lib/apis/products.type';
import { CardBookmarkFilledIcon, CardBookmarkIcon } from '@/lib/icons';
import { formatOverThousand } from '@/utils/formatNumber';

interface ScrapButtonProps {
  product: Product;
  hasScrapCount: boolean;
}

export default function ScrapButton({ product, hasScrapCount }: ScrapButtonProps) {
  const { isScraped, scrapCount, toggleIsScraped } = useScrapToggle(
    product.id,
    product.scrap.isScrapped,
    product.totalScraped
  );

  return (
    <button onClick={toggleIsScraped} className="cursor-pointer">
      {isScraped ? <CardBookmarkFilledIcon /> : <CardBookmarkIcon />}
      {hasScrapCount && (
        <p className="text-custom-background text-xs">{formatOverThousand(scrapCount)}</p>
      )}
    </button>
  );
}
