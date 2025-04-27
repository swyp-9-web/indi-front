import Link from 'next/link';

import { ROUTE_PATHS } from '@/constants';

// TODO: Link 클릭시 동작 기획 나올시 수정 필요
export default function HeroSection() {
  return (
    <section className="bg-custom-gray-100 flex h-100 w-full flex-col items-center justify-center gap-5">
      <h2 className="text-center text-[40px] leading-16 font-bold">
        작품 너머의 마음까지,
        <br />
        아르테고에서 만나요. (임시)
      </h2>
      <Link
        href={ROUTE_PATHS.MYPAGE}
        className="text-custom-button-text bg-custom-brand-secondary flex h-11.5 w-36 items-center justify-center rounded-full text-sm font-medium"
      >
        작가 신청하기
      </Link>
    </section>
  );
}
