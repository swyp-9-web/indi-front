'use client';

import { useEffect, useState } from 'react';

import Link from 'next/link';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ROUTE_PATHS } from '@/constants';
import { AddIcon, CheckIcon } from '@/lib/icons';
import { followingPreviewMock } from '@/lib/mocks/following-preview.mock';
import { cn } from '@/lib/utils';
import { formatNumberWithComma } from '@/utils/formatNumber';

import ProfileImage from '../shared/ProfileImage';

interface FollowingDropdownProps {
  userId: string | null;
}

// TODO: 유저 데이터 연동 시, userId 값 수정 필요 및 isLoggedIn을 별도로 사용하지 않고 userId를 null로 사용?
export default function FollowingDropdown({ userId }: FollowingDropdownProps) {
  const [isSelected, setIsSelected] = useState(false);
  const [followStates, setFollowStates] = useState<Record<string, boolean>>({});

  // TODO: API 연동 시 데이터 타입 정의 필요
  const data = followingPreviewMock;

  // TODO: 유저 로그인 유도 CTA 확정 시 수정 필요
  // 비로그인 유저 클릭 대응
  const handleUnauthenticatedUser = () => {
    alert('로그인 해라');
  };

  // TODO: 언팔로우 api 요청 필요, debounce 적용 필요
  // 팔로우 상태 토글
  const handleFollowButtonClick = (id: string) => {
    setFollowStates((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  // TODO: api 요청에서 받아온 data와 연동시 deps에 `data` 추가
  // 최초 data를 기준으로 followStates를 초기화, api 에서 받아오는 데이터 이므로 useEffect 사용
  useEffect(() => {
    console.log(data);

    if (!data || !data.totalFollowings) return;

    const initialState: Record<string, boolean> = {};

    data.followings.forEach((artist: any) => {
      initialState[artist.artistId] = true;
    });

    setFollowStates(initialState);
  }, [data]);

  // 비로그인일 경우 버튼만 보여줌 (Dropdown X), 클릭 시 로그인 유도
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

  return (
    <DropdownMenu onOpenChange={() => setIsSelected((prev) => !prev)}>
      <DropdownMenuTrigger
        className={cn(
          'cursor-pointer text-sm font-medium underline-offset-2 hover:underline',
          isSelected && 'underline'
        )}
      >
        팔로잉 작가
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-custom-background border-custom-gray-100 z-10 w-108.5 translate-x-43 translate-y-[13px] rounded-none border p-0 shadow-none">
        <div className="text-custom-brand-primary h-11.5 border-b-1 px-5 py-3 text-sm font-medium">
          {Number(data.totalFollowings) === 0
            ? '팔로잉 중인 작가가 없습니다.'
            : `팔로잉 작가 (${formatNumberWithComma(data.totalFollowings)})`}
        </div>

        {Number(data.totalFollowings) === 0 ? (
          <div className="text-custom-gray-300 flex h-60 w-full items-center justify-center text-sm">
            팔로잉 중인 작가가 없습니다.
          </div>
        ) : (
          data.followings.map((artist: any) => (
            <DropdownMenuItem
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
            </DropdownMenuItem>
          ))
        )}

        <div className="flex h-21.5 w-full items-center justify-center border-t-1">
          <Link
            href={`${ROUTE_PATHS.FOLLOWING_CREATORS}`}
            className="bg-custom-brand-secondary text-custom-button-text flex h-11.5 w-46 items-center justify-center rounded-full text-sm font-medium"
          >
            팔로잉 작가 모두보기
          </Link>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

interface FollowingButtonProps {
  isFollowing: boolean;
  onFollowButtonClick: () => void;
}

function FollowingButton({ isFollowing, onFollowButtonClick }: FollowingButtonProps) {
  const [isHovering, setIsHovering] = useState(false);

  const handleFollowButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    // 불필요하게 팔로우취소 버튼 나타나는 것 방지
    if (!isFollowing) {
      setIsHovering(false);
    }

    onFollowButtonClick();
  };

  return (
    <div
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      className="relative"
    >
      {isFollowing ? (
        isHovering ? (
          <button
            onClick={handleFollowButtonClick}
            className="bg-custom-status-notice text-custom-background border-custom-gray-100 flex h-9.5 w-24 cursor-pointer items-center justify-center gap-1.5 rounded-full border text-sm"
          >
            팔로우취소
          </button>
        ) : (
          <button
            onClick={handleFollowButtonClick}
            className="border-custom-gray-100 flex h-9.5 w-24 cursor-pointer items-center justify-center gap-1.5 rounded-full border text-sm"
          >
            <CheckIcon className="!h-6 !w-6" />
            <span>팔로잉</span>
          </button>
        )
      ) : (
        <button
          onClick={handleFollowButtonClick}
          className="border-custom-gray-100 flex h-9.5 w-24 cursor-pointer items-center justify-center gap-1.5 rounded-full border text-sm"
        >
          <AddIcon className="!h-6 !w-6" />
          <span>팔로우</span>
        </button>
      )}
    </div>
  );
}
