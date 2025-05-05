import Link from 'next/link';

import { ROUTE_PATHS } from '@/constants';
import { FindInPageIcon } from '@/lib/icons';

export default function NoResults() {
  return (
    <div className="mt-20 flex flex-col items-center justify-center">
      <FindInPageIcon />
      <h2 className="text-custom-brand-primary mt-4 mb-10 text-center text-2xl font-bold">
        아직 스크랩 한 작품이 없습니다.
      </h2>
      <Link
        href={ROUTE_PATHS.HOME}
        className="border-custom-gray-100 text-custom-brand-primary flex h-11.5 w-46.5 items-center justify-center rounded-full border text-sm font-medium"
      >
        작품 둘러보러 가기
      </Link>
    </div>
  );
}
