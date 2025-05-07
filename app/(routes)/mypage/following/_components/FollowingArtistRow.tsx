import Link from 'next/link';

import ProductCard from '@/app/_components/product/ProductCard';
import ProfileImage from '@/app/_components/shared/ProfileImage';
import { ROUTE_PATHS } from '@/constants';
import { useFollowToggle } from '@/hooks/useFollowToggle';
import { FollowingArtist } from '@/lib/apis/following.type';
import { Product } from '@/lib/apis/products.type';
import { AddIcon, CheckIcon } from '@/lib/icons';
import { cn } from '@/lib/utils';
import { formatOverThousand } from '@/utils/formatNumber';

interface FollowingArtistRowProps {
  artist: FollowingArtist;
}

export default function FollowingArtistRow({ artist }: FollowingArtistRowProps) {
  return (
    <li className="border-custom-gray-100 flex w-full items-center justify-between gap-33.5 rounded-lg border p-7.5">
      <FollowingArtistInfo artist={artist} />
      <ArtistRecentProducts products={artist.items} />
    </li>
  );
}

interface FollowingArtistInfoProps {
  artist: FollowingArtist;
}

function FollowingArtistInfo({ artist }: FollowingArtistInfoProps) {
  const { isFollowing, toggleIsFollowing } = useFollowToggle(artist.id, artist.isFollowing, {
    invalidateFollowingPreview: true,
  });

  return (
    <div className="flex flex-col items-center justify-between">
      <div className="flex flex-col items-center justify-center">
        <ProfileImage src={artist.profileImgUrl ?? null} className="mb-7.5 h-25 w-25" />

        <p className="mb-2 w-61 text-center text-2xl font-bold">{artist.nickname}</p>

        <div className="flex items-center justify-between">
          <div className="text-custom-brand-primary flex items-center justify-center gap-1.5 px-3 text-lg font-bold">
            <span className="text-custom-gray-300 text-xs font-normal">작품</span>
            {formatOverThousand(artist.totalItems)}
          </div>
          <div className="bg-custom-gray-300 h-3 w-0.25" />
          <div className="text-custom-brand-primary flex items-center justify-center gap-1.5 px-3 text-lg font-bold">
            <span className="text-custom-gray-300 text-xs font-normal">팔로워</span>
            {formatOverThousand(artist.totalFollower)}
          </div>
        </div>

        <div className="mt-7.5 flex gap-2.5">
          <Link
            href={ROUTE_PATHS.ARTIST(String(artist.id))}
            className="border-custom-gray-100 text-custom-brand-primary flex h-12 w-32 items-center justify-center rounded-full border text-sm font-medium"
          >
            작품 전체보기
          </Link>

          <button
            onClick={toggleIsFollowing}
            className={cn(
              'border-custom-gray-100 flex h-12 w-32 cursor-pointer items-center justify-center rounded-full border text-sm font-medium',
              isFollowing && 'bg-custom-ivory-100'
            )}
          >
            {isFollowing ? <CheckIcon className="!h-6 !w-6" /> : <AddIcon className="!h-6 !w-6" />}
            <span>{isFollowing ? '팔로잉' : '팔로우'}</span>
          </button>
        </div>
      </div>
    </div>
  );
}

interface ArtistRecentProductsProps {
  products: Product[];
}

function ArtistRecentProducts({ products }: ArtistRecentProductsProps) {
  return (
    <div className="flex flex-1 items-center gap-5">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} size="small" hasScrapCount />
      ))}
    </div>
  );
}
