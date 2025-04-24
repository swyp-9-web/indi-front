'use client';

import Link from 'next/link';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ROUTE_PATHS } from '@/constants';

// TODO: 유저 프로필 확인 및 로그아웃 기능 추가 필요
export default function UserProfileDropdown() {
  const userProfileSrc: string | undefined = undefined;

  const handleLogoutButtonClick = () => {
    alert('현재 로그아웃이 구현되지 않았습니다.');
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="cursor-pointer">
        <Avatar className="h-9 w-9">
          <AvatarImage src={userProfileSrc ?? 'undefined'} />
          <AvatarFallback className="bg-custom-gray-100 h-full w-full rounded-full" />
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-custom-background border-custom-gray-100 z-10 translate-x-10 translate-y-1 rounded-none border p-0 shadow-none">
        <DropdownMenuItem
          asChild
          className="text-custom-brand-primary hover:text-custom-brand-primary focus:text-custom-brand-primary h-11.5 w-30 cursor-pointer px-5 py-4 text-sm font-medium underline-offset-2 hover:bg-transparent hover:underline focus:bg-transparent"
        >
          <Link href={ROUTE_PATHS.MYPAGE}>마이페이지</Link>
        </DropdownMenuItem>
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
