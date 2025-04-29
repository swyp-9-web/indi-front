import Image from 'next/image';
import Link from 'next/link';

import { ROUTE_PATHS } from '@/constants';

import CategoryDropdown from './CategoryDropdown';
import FollowingPopover from './FollowingPopover';

export default function HeaderLeftSection() {
  return (
    <div className="flex flex-1 gap-8">
      {/* 로고 이미지 */}
      <Link href={ROUTE_PATHS.HOME}>
        <Image quality={100} width={96} height={24} src="/logo/Artego.png" alt="Artego logo" />
      </Link>

      {/* 좌측 메뉴 */}
      <ul className="flex gap-5">
        <li>
          <CategoryDropdown />
        </li>
        <li>
          <FollowingPopover />
        </li>
      </ul>
    </div>
  );
}
