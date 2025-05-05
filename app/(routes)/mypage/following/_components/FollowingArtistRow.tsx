import Link from 'next/link';

import ProductCard from '@/app/_components/product/ProductCard';
import ProfileImage from '@/app/_components/shared/ProfileImage';
import { ROUTE_PATHS } from '@/constants';
import { AddIcon, CheckIcon } from '@/lib/icons';
import { cn } from '@/lib/utils';

const PRODUCT_MOCK = {
  id: 1,
  name: '아트 포스터 - 꿈의 정원',
  price: 49000,
  totalScraped: 128,
  createdAt: '2024-11-12T09:23:00Z',
  updatedAt: '2025-04-28T15:40:00Z',
  thumbnailImgUrl:
    'https://kr.object.ncloudstorage.com/artego-bucket/file_domain/2018d16d-4883-4836-a8e5-79146aba84bf.png',
  category: '포스터',
  size: 'L',
  artist: {
    id: 101,
    nickname: '달빛화가',
  },
  scrap: {
    isScrapped: true,
    scrapedAt: '2025-05-02T13:15:00Z',
  },
  totalReaction: {
    likes: 345,
    wants: 87,
    revisits: 23,
  },
};

export default function FollowingArtistRow() {
  return (
    <li className="border-custom-gray-100 flex w-full items-center justify-between gap-33.5 rounded-lg border p-7.5">
      <FollowingArtistInfo />
      <ArtistRecentProducts />
    </li>
  );
}

function FollowingArtistInfo() {
  const isFollowing = false;

  return (
    <div className="flex flex-col items-center justify-between">
      <div className="flex flex-col items-center justify-center">
        <ProfileImage src={null} className="mb-7.5 h-25 w-25" />

        <p className="mb-2 w-61 text-center text-2xl font-bold">작가명</p>

        <div className="flex items-center justify-between">
          <div className="text-custom-brand-primary flex items-center justify-center gap-1.5 px-3 text-lg font-bold">
            <span className="text-custom-gray-300 text-xs font-normal">작품</span>999+
          </div>
          <div className="bg-custom-gray-300 h-3 w-0.25" />
          <div className="text-custom-brand-primary flex items-center justify-center gap-1.5 px-3 text-lg font-bold">
            <span className="text-custom-gray-300 text-xs font-normal">팔로워</span>999+
          </div>
        </div>

        <div className="mt-7.5 flex gap-2.5">
          <Link
            href={ROUTE_PATHS.ARTIST('24')}
            className="border-custom-gray-100 text-custom-brand-primary flex h-12 w-32 items-center justify-center rounded-full border text-sm font-medium"
          >
            작품 전체보기
          </Link>

          <button
            className={cn(
              'flex h-12 w-32 cursor-pointer items-center justify-center rounded-full border text-sm',
              isFollowing ? 'bg-custom-ivory-100 border-custom-gray-100' : 'border-custom-gray-100'
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

function ArtistRecentProducts() {
  return (
    <div className="flex flex-1 items-center gap-5">
      <ProductCard product={PRODUCT_MOCK} size="small" hasScrapCount />
      <ProductCard product={PRODUCT_MOCK} size="small" hasScrapCount />
      <ProductCard product={PRODUCT_MOCK} size="small" hasScrapCount />
    </div>
  );
}
