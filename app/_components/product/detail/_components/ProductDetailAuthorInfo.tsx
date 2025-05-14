'use client';

import Link from 'next/link';

import { ROUTE_PATHS } from '@/constants/route-paths';
import { useFollowToggle } from '@/hooks/useFollowToggle';
import { ArrowNextIcon } from '@/lib/icons/index';
import { AddIcon } from '@/lib/icons/index';
import { CheckIcon } from '@/lib/icons/index';
import { useUserSummary } from '@/lib/queries/useUserQueries';

import ProfileImage from '../../../shared/ProfileImage';

interface ProductDetailAuthorInfoProps {
  artistSrc: string;
  artistName: string;
  artistDescription: string;
  hasFollow: boolean;
  artistId: number;
}

export default function ProductDetailAuthorInfo({
  artistSrc,
  artistName,
  artistDescription,
  hasFollow,
  artistId,
}: ProductDetailAuthorInfoProps) {
  const { data } = useUserSummary();
  const user = data?.result ?? null;
  const { isFollowing, toggleIsFollowing } = useFollowToggle(artistId, hasFollow);
  return (
    <div className="border-custom-gray-100 flex w-full flex-col gap-2.5 rounded-[8px] border-[1px] p-5">
      <div className="flex justify-between">
        <Link href={ROUTE_PATHS.ARTIST(String(artistId))} className="flex items-center gap-2.5">
          <ProfileImage src={artistSrc} />
          <div className="text-custom-brand-primary flex items-center gap-[3px] text-[20px] font-semibold">
            {artistName}
            <ArrowNextIcon className="h-4 w-4" />
          </div>
        </Link>

        {user?.id === artistId ? (
          <div />
        ) : (
          <button
            onClick={toggleIsFollowing}
            className={`flex items-center gap-1.5 rounded-4xl border-[1px] px-[15px] py-[7px] text-[14px] hover:cursor-pointer ${isFollowing ? 'bg-custom-ivory-100 border-custom-ivory-100 text-custom-gray-800' : 'border-custom-gray-100 text-custom-brand-primary'}`}
          >
            {isFollowing ? <CheckIcon /> : <AddIcon />}
            {isFollowing ? '팔로잉' : '팔로우'}
          </button>
        )}
      </div>
      <div className="text-custom-brand-primary w-full text-[12px]">{artistDescription}</div>
    </div>
  );
}
