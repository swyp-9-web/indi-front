import { useScrapToggle } from '@/hooks/useScrapToggle';
import type { Product } from '@/lib/apis/products.type';
import { BookmarkFilledIcon } from '@/lib/icons/index';
import { BookmarkIcon } from '@/lib/icons/index';
import { ShareIcon } from '@/lib/icons/index';
import { formatOverThousand } from '@/utils/formatNumber';

interface ScrapAndShareProps {
  product: Product;
  hasCount: boolean;
}

export default function ScrapAndShare({ product, hasCount }: ScrapAndShareProps) {
  const { isScraped, toggleIsScraped } = useScrapToggle(product.id, product.scrap.isScrapped);

  return (
    <div className="flex gap-[17px]">
      <div>
        <button onClick={toggleIsScraped} className="cursor-pointer">
          {isScraped ? <BookmarkFilledIcon /> : <BookmarkIcon />}
          {hasCount && (
            <p className="text-custom-background text-xs">
              {formatOverThousand(product.totalScraped)}
            </p>
          )}
        </button>
      </div>
      <button>
        <ShareIcon />
      </button>
    </div>
  );
}
