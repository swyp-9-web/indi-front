import Image from 'next/image';
import Link from 'next/link';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { ROUTE_PATHS } from '@/constants';
import { BookmarkIcon, NotificationIcon, NotificationUnreadIcon, SearchIcon } from '@/lib/icons';

export default function GlobalNavBar() {
  const isLoggedIn = true;
  const hasUnreadNotification = false;
  const profileSrc: string | undefined = undefined;

  return (
    <header className="border-custom-gray-100 absolute inset-x-0 top-0 h-14 border-b">
      <div className="w-8xl mx-auto flex h-full items-center justify-between px-6">
        <div className="flex flex-1 gap-8">
          <Link href={ROUTE_PATHS.HOME}>
            <Image quality={100} width={96} height={24} src="/logo/Artego.png" alt="Artego logo" />
          </Link>
          <ul className="flex gap-5">
            <li>
              <button className="cursor-pointer text-sm font-medium underline-offset-2 hover:underline">
                카테고리
              </button>
            </li>
            <li>
              <button className="cursor-pointer text-sm font-medium underline-offset-2 hover:underline">
                팔로잉 작가
              </button>
            </li>
          </ul>
        </div>

        <div className="flex flex-1 justify-center">
          <form className="relative h-9 w-97">
            <label htmlFor="search">
              <SearchIcon className="absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 hover:cursor-text" />
            </label>
            <Input
              id="search"
              className="bg-custom-ivory-50 placeholder:text-custom-gray-300 rounded-full border-none py-2 pr-3 pl-9.5"
              placeholder="작가/작품 검색"
            />
          </form>
        </div>

        <div className="flex flex-1 justify-end">
          {isLoggedIn ? (
            <div className="flex gap-4">
              <ul className="flex gap-2.5">
                <li className="h-9.5 w-9.5">
                  <Link
                    href={ROUTE_PATHS.SCRAPPED_PRODUCTS}
                    className="flex h-full w-full items-center justify-center"
                  >
                    <BookmarkIcon className="h-6 w-6" />
                  </Link>
                </li>
                <li className="h-9.5 w-9.5">
                  <button className="flex h-9.5 w-9.5 cursor-pointer items-center justify-center">
                    {hasUnreadNotification ? (
                      <NotificationUnreadIcon className="h-6 w-6" />
                    ) : (
                      <NotificationIcon className="h-6 w-6" />
                    )}
                  </button>
                </li>
              </ul>
              <Avatar className="h-9 w-9">
                <AvatarImage src={profileSrc} />
                <AvatarFallback className="bg-custom-gray-100 h-full w-full rounded-full" />
              </Avatar>
            </div>
          ) : (
            <Link href={ROUTE_PATHS.LOGIN}>
              <div className="text-custom-gray-900 bg-custom-brand-secondary flex h-9.5 w-38 items-center justify-center rounded-full text-sm font-medium">
                로그인 / 회원가입
              </div>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
