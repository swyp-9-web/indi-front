import Link from 'next/link';

import SpecialProductsSection from '@/app/(routes)/(main)/_components/SpecialProductsSection';
import HighlightedProductsCarousel from '@/app/_components/product/HighlightedProductsCarousel';
import { ROUTE_PATHS } from '@/constants';
import ArrowRightIcon from '@/lib/icons/svg/arrow-next';

interface ArtistOtherCardProps {
  artistId: number;
}

export default function ArtistOtherCard({ artistId }: ArtistOtherCardProps) {
  return (
    <div className="bg-custom-brand-primary flex h-135 w-full flex-col px-20 py-12.5">
      <Link
        href={ROUTE_PATHS.ARTIST(String(artistId))}
        className="text-custom-background mb-7.5 flex items-center justify-center gap-2 text-2xl font-bold"
      >
        작가의 다른 작품들
        <ArrowRightIcon className="text-custom-background" />
      </Link>
      <HighlightedProductsCarousel title={'작가의 다른 작품들'} variant={'primary'} products={[]} />
    </div>
  );
}
