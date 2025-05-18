'use client';

import Link from 'next/link';

import ProfileImage from '@/app/_components/shared/ProfileImage';
import { ROUTE_PATHS } from '@/constants/route-paths';
import { useFollowToggle } from '@/hooks/useFollowToggle';
import { AddIcon, ArrowNextIcon, CheckIcon } from '@/lib/icons';
import { useUserSummary } from '@/lib/queries/useUserQueries';
import { cn } from '@/lib/utils';

interface ProductDetailArtistInfoProps {
  artistSrc: string;
  artistName: string;
  artistDescription: string;
  isFollowing: boolean;
  artistId: number;
}

export default function ProductDetailArtistInfo({
  artistSrc,
  artistName,
  artistDescription,
  isFollowing: hasFollow,
  artistId,
}: ProductDetailArtistInfoProps) {
  const { data } = useUserSummary();

  const user = data?.result ?? null;

  const { isFollowing, toggleIsFollowing } = useFollowToggle(artistId, hasFollow, {
    invalidateFollowingQueries: true,
  });

  return (
    <div className="border-custom-gray-100 flex w-full flex-col justify-center gap-2.5 rounded-[8px] border-[1px] p-5">
      <div className="flex justify-between">
        <Link
          href={ROUTE_PATHS.ARTIST(String(artistId))}
          className="flex min-w-0 items-center gap-2.5"
        >
          <ProfileImage src={artistSrc} />
          <div className="flex w-full min-w-0 items-center gap-[3px]">
            <span className="text-custom-brand-primary flex-1 truncate text-[20px] font-semibold">
              {artistName}
            </span>
            <ArrowNextIcon className="h-4 w-4 flex-shrink-0" />
          </div>
        </Link>

        {!user?.id || user?.id === artistId ? null : (
          <button
            onClick={toggleIsFollowing}
            className={cn(
              `flex h-9.5 w-24 items-center gap-1.5 rounded-4xl border-[1px] px-3.5 text-[14px] whitespace-nowrap hover:cursor-pointer`,
              isFollowing
                ? 'bg-custom-ivory-100 border-custom-ivory-100 text-custom-gray-800'
                : 'border-custom-gray-100 text-custom-brand-primary'
            )}
          >
            {isFollowing ? <CheckIcon /> : <AddIcon />}
            {isFollowing ? '팔로잉' : '팔로우'}
          </button>
        )}
      </div>
      {!artistDescription ? null : (
        <div className="text-custom-brand-primary w-full text-[12px] break-all whitespace-pre-wrap">
          {artistDescription}
        </div>
      )}
    </div>
  );
}
