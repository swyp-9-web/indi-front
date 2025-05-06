'use client';

import Link from 'next/link';

import { ROUTE_PATHS } from '@/constants';
import { useFollowToggle } from '@/hooks/useFollowToggle';
import { ArtistDetail } from '@/lib/apis/user.type';
import { AddIcon, CheckIcon } from '@/lib/icons';
import { cn } from '@/lib/utils';

export function EditProfileButton() {
  return (
    <button className="text-custom-brand-primary mx-auto block cursor-pointer text-sm font-medium underline underline-offset-2">
      작가 프로필 수정
    </button>
  );
}

export function ArtistButtonGroups() {
  return (
    <div className="mt-10 flex w-full flex-col gap-2.5">
      <button className="border-custom-gray-100 flex h-12 w-full cursor-pointer items-center justify-center rounded-full border text-sm font-medium">
        주문제작 의뢰 보기
      </button>

      <button className="border-custom-gray-100 flex h-12 w-full cursor-pointer items-center justify-center rounded-full border text-sm font-medium">
        임시저장된 글
      </button>

      <Link
        href={ROUTE_PATHS.REGISTER_PRODUCT}
        className="bg-custom-brand-secondary text-custom-gray-900 flex h-12 w-full items-center justify-center rounded-full text-sm font-medium"
      >
        작품 등록
      </Link>
    </div>
  );
}

interface UserButtonGroupsProps {
  artist: ArtistDetail;
}

export function UserButtonGroups({ artist }: UserButtonGroupsProps) {
  const { isFollowing, toggleIsFollowing } = useFollowToggle(artist.id, artist.isFollowing);

  return (
    <div className="mt-10 flex w-full flex-col gap-2.5">
      <button
        onClick={toggleIsFollowing}
        className={cn(
          'border-custom-gray-100 flex h-12 w-full cursor-pointer items-center justify-center rounded-full border text-sm font-medium',
          isFollowing && 'bg-custom-ivory-100'
        )}
      >
        {isFollowing ? <CheckIcon className="!h-6 !w-6" /> : <AddIcon className="!h-6 !w-6" />}
        <span>{isFollowing ? '팔로잉' : '팔로우'}</span>
      </button>

      <button className="bg-custom-brand-secondary text-custom-gray-900 flex h-12 w-full cursor-pointer items-center justify-center rounded-full text-sm font-medium">
        주문제작 의뢰하기
      </button>
    </div>
  );
}
