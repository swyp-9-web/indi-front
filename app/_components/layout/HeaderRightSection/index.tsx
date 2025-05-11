'use client';

import Link from 'next/link';

import { ROUTE_PATHS } from '@/constants';
import { useProductRegisterPage } from '@/hooks/useProductRegisterPage';
import { BookmarkIcon } from '@/lib/icons';
import { useUserSummary } from '@/lib/queries/useUserQueries';
import { useAuthDialog } from '@/stores/useAuthDialog';

import NotificationPopover from './NotificationPopover';
import UserProfileDropdown from './UserProfileDropdown';

export default function HeaderRightSection() {
  const { toggleIsOpen } = useAuthDialog();
  const enterRegisterPage = useProductRegisterPage();

  const { data } = useUserSummary();

  const user = data?.result ?? null;

  return (
    <div className="flex flex-1 justify-end">
      {user && user.role === 'ARTIST' && (
        <button
          onClick={enterRegisterPage.create}
          className="text-custom-gray-900 bg-custom-brand-secondary mr-5 flex h-9.5 w-37.5 cursor-pointer items-center justify-center rounded-full text-sm font-medium"
        >
          작품 등록하기
        </button>
      )}

      {user && (
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

          <UserProfileDropdown user={user} />
        </div>
      )}

      {!user && (
        <button
          onClick={toggleIsOpen}
          className="text-custom-gray-900 bg-custom-brand-secondary flex h-9.5 w-37.5 cursor-pointer items-center justify-center rounded-full text-sm font-medium"
        >
          로그인 / 회원가입
        </button>
      )}
    </div>
  );
}
