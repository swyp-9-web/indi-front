'use client';

import { useEffect, useState } from 'react';

import Link from 'next/link';

import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { ROUTE_PATHS } from '@/constants';
import { AddIcon, CheckIcon } from '@/lib/icons';
import { followingPreviewMock } from '@/lib/mocks/following-preview.mock';
import { cn } from '@/lib/utils';
import { formatNumberWithComma } from '@/utils/formatNumber';

import ProfileImage from '../shared/ProfileImage';

interface FollowingPopoverProps {
  userId: string | null;
}

export default function FollowingPopover({ userId }: FollowingPopoverProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [followStates, setFollowStates] = useState<Record<string, boolean>>({});

  const data = followingPreviewMock;

  const handleUnauthenticatedUser = () => {
    alert('로그인 해라');
  };

  const handleFollowButtonClick = (id: string) => {
    setFollowStates((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  useEffect(() => {
    if (!data || !data.totalFollowings) return;

    const initialState: Record<string, boolean> = {};
    data.followings.forEach((artist: any) => {
      initialState[artist.artistId] = true;
    });

    setFollowStates(initialState);
  }, [data]);

  if (!userId) {
    return (
      <button
        className="cursor-pointer text-sm font-medium underline-offset-2 hover:underline"
        onClick={handleUnauthenticatedUser}
      >
        팔로잉 작가
      </button>
    );
  }

  const hasNoFollowingArtists = Number(data.totalFollowings) === 0;

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
          팔로잉 작가 ({formatNumberWithComma(data.totalFollowings)})
        </div>

        {hasNoFollowingArtists ? (
          <div className="text-custom-gray-200 flex h-35 w-full items-center justify-center text-xs">
            팔로잉 중인 작가가 없습니다.
          </div>
        ) : (
          data.followings.map((artist: any) => (
            <div
              key={artist.artistId}
              className="text-custom-brand-primary hover:text-custom-brand-primary focus:text-custom-brand-primary flex h-17 w-full items-center justify-between px-5 text-sm font-medium hover:bg-transparent focus:bg-transparent"
            >
              <Link
                href={ROUTE_PATHS.CREATOR(artist.artistId)}
                className="flex items-center justify-between gap-5 underline-offset-2 hover:underline"
              >
                <ProfileImage src={artist.artistProfileImage} className="h-12 w-12" />
                <p>{artist.artistNickname}</p>
              </Link>

              <FollowingButton
                isFollowing={followStates[artist.artistId]}
                onFollowButtonClick={() => handleFollowButtonClick(artist.artistId)}
              />
            </div>
          ))
        )}

        {!hasNoFollowingArtists && (
          <div className="flex h-21.5 w-full items-center justify-center border-t-1">
            <Link
              href={`${ROUTE_PATHS.FOLLOWING_CREATORS}`}
              className="bg-custom-brand-secondary text-custom-button-text flex h-11.5 w-46 items-center justify-center rounded-full text-sm font-medium"
            >
              팔로잉 작가 모두보기
            </Link>
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
}

interface FollowingButtonProps {
  isFollowing: boolean;
  onFollowButtonClick: () => void;
}

function FollowingButton({ isFollowing, onFollowButtonClick }: FollowingButtonProps) {
  return (
    <div className="relative">
      {isFollowing ? (
        <button
          onClick={onFollowButtonClick}
          className="border-custom-gray-100 bg-custom-ivory-100 flex h-9.5 w-24 cursor-pointer items-center justify-center gap-1.5 rounded-full border text-sm"
        >
          <CheckIcon className="!h-6 !w-6" />
          <span>팔로잉</span>
        </button>
      ) : (
        <button
          onClick={onFollowButtonClick}
          className="border-custom-gray-100 flex h-9.5 w-24 cursor-pointer items-center justify-center gap-1.5 rounded-full border text-sm"
        >
          <AddIcon className="!h-6 !w-6" />
          <span>팔로우</span>
        </button>
      )}
    </div>
  );
}
