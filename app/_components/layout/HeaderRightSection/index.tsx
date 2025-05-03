import Link from 'next/link';

import { ROUTE_PATHS } from '@/constants';
import { BookmarkIcon } from '@/lib/icons';

import NotificationPopover from './NotificationPopover';
import UserProfileDropdown from './UserProfileDropdown';

// TODO: 유저 기능 연동 필요
export default function HeaderRightSection() {
  const userId: string | null = '21919299';
  const role: 'artist' | 'user' = 'artist';

  return (
    <div className="flex flex-1 justify-end">
      {userId ? (
        <>
          {role === 'artist' && (
            <Link
              href={ROUTE_PATHS.REGISTER_PRODUCT}
              className="text-custom-gray-900 bg-custom-brand-secondary mr-5 flex h-9.5 w-37.5 items-center justify-center rounded-full text-sm font-medium"
            >
              작품 등록하기
            </Link>
          )}
          <div className="flex gap-4">
            <ul className="flex gap-2.5">
              <li className="h-9.5 w-9.5">
                <Link
                  href={ROUTE_PATHS.MY_SCRAPPED}
                  className="flex h-full w-full items-center justify-center"
                >
                  <BookmarkIcon className="h-6 w-6" />
                </Link>
              </li>
              <li className="h-9.5 w-9.5">
                <NotificationPopover />
              </li>
            </ul>

            <UserProfileDropdown />
          </div>
        </>
      ) : (
        <Link
          href={ROUTE_PATHS.LOGIN}
          className="text-custom-gray-900 bg-custom-brand-secondary flex h-9.5 w-37.5 items-center justify-center rounded-full text-sm font-medium"
        >
          로그인 / 회원가입
        </Link>
      )}
    </div>
  );
}
