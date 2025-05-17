'use client';

import { useState } from 'react';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { ROUTE_PATHS } from '@/constants';
import { useFollowToggle } from '@/hooks/useFollowToggle';
import { FollowingPreview } from '@/lib/apis/following.type';
import { AddIcon, CheckIcon } from '@/lib/icons';
import { useFollowingPreview } from '@/lib/queries/useFollowingQueries';
import { useUserSummary } from '@/lib/queries/useUserQueries';
import { cn } from '@/lib/utils';
import { useAuthDialog } from '@/stores/useAuthDialog';
import { formatNumberWithComma } from '@/utils/formatNumber';

import ProfileImage from '../../shared/ProfileImage';

export default function FollowingPopover() {
  const [isOpen, setIsOpen] = useState(false);

  const router = useRouter();

  const { toggleIsOpen: toggleAuthDialogOpen } = useAuthDialog();

  const { data: user } = useUserSummary();
  const { data: followingData } = useFollowingPreview({ enabled: Boolean(user?.result) });

  const artists = followingData?.result.followingArtists ?? [];
  const followingCount = followingData?.result.totalFollowings ?? 0;

  const handleAllFollowingClick = () => {
    setIsOpen(false);
    router.push(ROUTE_PATHS.MY_FOLLOWING);
  };

  if (!user || !user.result) {
    return (
      <button
        className="cursor-pointer text-sm font-medium underline-offset-2 hover:underline"
        onClick={toggleAuthDialogOpen}
      >
        팔로잉 작가
      </button>
    );
  }

  const hasNoFollowingArtists = followingCount === 0;

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger
        className={cn(
          'cursor-pointer text-sm font-medium underline-offset-2 hover:underline',
          isOpen && 'underline'
        )}
      >
        팔로잉 작가
      </PopoverTrigger>
      <PopoverContent className="bg-custom-background border-custom-gray-100 z-10 w-108.5 translate-x-43 translate-y-[13px] rounded-none border p-0 shadow-none">
        <div className="text-custom-brand-primary h-11.5 border-b-1 px-5 py-3 text-sm font-medium">
          팔로잉 작가 ({formatNumberWithComma(followingCount)})
        </div>

        {hasNoFollowingArtists ? (
          <NoFollowingArtists />
        ) : (
          <>
            {artists.map((artist) => (
              <FollowingArtistRow
                key={artist.id}
                artist={artist}
                onClose={() => setIsOpen(false)}
              />
            ))}

            <div className="flex h-21.5 w-full items-center justify-center border-t-1">
              <button
                onClick={handleAllFollowingClick}
                className="bg-custom-brand-secondary text-custom-button-text flex h-11.5 w-46 cursor-pointer items-center justify-center rounded-full text-sm font-medium"
              >
                팔로잉 작가 모두보기
              </button>
            </div>
          </>
        )}
      </PopoverContent>
    </Popover>
  );
}

function NoFollowingArtists() {
  return (
    <div className="text-custom-gray-200 flex h-35 w-full items-center justify-center text-xs">
      팔로잉 중인 작가가 없습니다.
    </div>
  );
}

interface FollowingArtistRowProps {
  artist: FollowingPreview;
  onClose: () => void;
}

function FollowingArtistRow({ artist, onClose }: FollowingArtistRowProps) {
  const { isFollowing, toggleIsFollowing } = useFollowToggle(artist.id, artist.isFollowing);

  return (
    <div className="text-custom-brand-primary hover:text-custom-brand-primary focus:text-custom-brand-primary flex h-17 w-full items-center justify-between px-5 text-sm font-medium hover:bg-transparent focus:bg-transparent">
      <Link
        href={ROUTE_PATHS.ARTIST(String(artist.id))}
        onClick={onClose}
        className="flex items-center gap-5 underline-offset-2 hover:underline"
      >
        <ProfileImage src={artist.profileImgUrl} className="h-12 w-12" />
        <p className="max-w-50 truncate">{artist.nickname}</p>
      </Link>

      <FollowingButton isFollowing={isFollowing} onClick={toggleIsFollowing} />
    </div>
  );
}

interface FollowingButtonProps {
  isFollowing: boolean;
  onClick: () => void;
}

function FollowingButton({ isFollowing, onClick }: FollowingButtonProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'border-custom-gray-100 flex h-9.5 w-24 cursor-pointer items-center justify-center gap-1.5 rounded-full border text-sm font-medium',
        isFollowing && 'bg-custom-ivory-100'
      )}
    >
      {isFollowing ? <CheckIcon className="!h-6 !w-6" /> : <AddIcon className="!h-6 !w-6" />}
      <span>{isFollowing ? '팔로잉' : '팔로우'}</span>
    </button>
  );
}
