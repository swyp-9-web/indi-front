'use client';

import Link from 'next/link';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ROUTE_PATHS } from '@/constants';
import { UserSummary } from '@/lib/apis/user.type';
import { useLogout } from '@/lib/queries/useUserQueries';

import ProfileImage from '../../shared/ProfileImage';

interface UserProfileDropdownProps {
  user: UserSummary | null;
}

export default function UserProfileDropdown({ user }: UserProfileDropdownProps) {
  const userProfileSrc: string | undefined = user?.profileImgUrl;

  const { mutate } = useLogout();

  const handleLogoutButtonClick = () => {
    mutate();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="cursor-pointer">
        <ProfileImage src={userProfileSrc ?? null} />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-custom-background border-custom-gray-100 z-10 translate-x-10 translate-y-1 rounded-none border p-0 shadow-none">
        <DropdownMenuItem
          asChild
          className="text-custom-brand-primary hover:text-custom-brand-primary focus:text-custom-brand-primary h-11.5 w-30 cursor-pointer px-5 py-4 text-sm font-medium underline-offset-2 hover:bg-transparent hover:underline focus:bg-transparent"
        >
          <Link href={ROUTE_PATHS.MYPAGE}>마이페이지</Link>
        </DropdownMenuItem>

        {user && (
          <DropdownMenuItem
            asChild
            className="text-custom-brand-primary hover:text-custom-brand-primary focus:text-custom-brand-primary h-11.5 w-30 cursor-pointer px-5 py-4 text-sm font-medium underline-offset-2 hover:bg-transparent hover:underline focus:bg-transparent"
          >
            <Link href={ROUTE_PATHS.ARTIST(String(user.id))}>내 작품 피드</Link>
          </DropdownMenuItem>
        )}

        <DropdownMenuItem
          onClick={handleLogoutButtonClick}
          className="text-custom-status-negative hover:text-custom-status-negative focus:text-custom-status-negative h-11.5 w-30 cursor-pointer px-5 py-4 text-sm font-medium underline-offset-2 hover:bg-transparent hover:underline focus:bg-transparent"
        >
          로그아웃
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
