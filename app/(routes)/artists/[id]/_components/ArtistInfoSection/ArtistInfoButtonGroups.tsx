'use client';

import { useFollowToggle } from '@/hooks/useFollowToggle';
import { useProductRegisterPage } from '@/hooks/useProductRegisterPage';
import { ArtistDetail } from '@/lib/apis/user.type';
import { AddIcon, CheckIcon, ShareIcon } from '@/lib/icons';
import toast from '@/lib/toast';
import { cn } from '@/lib/utils';

export function ShareLinkButton() {
  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      toast.default('링크가 복사되었습니다!');
    } catch {
      toast.error('링크 복사에 실패했습니다');
    }
  };

  return (
    <button onClick={handleCopyLink} className="absolute top-0 right-0 h-6 w-6 cursor-pointer">
      <ShareIcon />
    </button>
  );
}

export function ArtistButtonGroups() {
  const enterRegisterPage = useProductRegisterPage();
  return (
    <div className="mt-10 flex w-full flex-col gap-2.5">
      <button
        onClick={() => toast.error('아직 준비 중인 기능입니다')}
        className="border-custom-gray-100 flex h-12 w-full cursor-pointer items-center justify-center rounded-full border text-sm font-medium"
      >
        주문제작 의뢰 보기
      </button>

      <button
        onClick={() => toast.error('아직 준비 중인 기능입니다')}
        className="border-custom-gray-100 flex h-12 w-full cursor-pointer items-center justify-center rounded-full border text-sm font-medium"
      >
        임시저장된 글
      </button>

      <button
        onClick={enterRegisterPage.create}
        className="bg-custom-brand-secondary text-custom-gray-900 flex h-12 w-full items-center justify-center rounded-full text-sm font-medium"
      >
        작품 등록
      </button>
    </div>
  );
}

interface UserButtonGroupsProps {
  artist: ArtistDetail;
}

export function UserButtonGroups({ artist }: UserButtonGroupsProps) {
  const { isFollowing, toggleIsFollowing } = useFollowToggle(artist.id, artist.isFollowing, {
    invalidateFollowingQueries: true,
  });

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

      <button
        onClick={() => toast.error('아직 준비 중인 기능입니다')}
        className="bg-custom-brand-secondary text-custom-gray-900 flex h-12 w-full cursor-pointer items-center justify-center rounded-full text-sm font-medium"
      >
        주문제작 의뢰하기
      </button>
    </div>
  );
}
