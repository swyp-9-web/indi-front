'use client';

import Image from 'next/image';

import { useRequireAuth } from '@/hooks/useRequireAuth';
import toast from '@/lib/toast';

export default function HeroSection() {
  const { checkAuth } = useRequireAuth();

  const handleHeroButtonClick = () => {
    checkAuth(() => toast.error('아직 준비 중인 기능입니다'));
  };

  return (
    <section className="bg-custom-ivory-100 flex h-100 w-full items-center justify-center gap-10">
      <div>
        <h2 className="text-custom-gray-900 text-[2.5rem] font-bold">
          세상에 첫 발을 내딛는 작품들을
          <br />
          당신만의 시선으로
        </h2>

        <button
          onClick={handleHeroButtonClick}
          className="bg-custom-gray-900 mt-5 flex h-11.5 w-36 cursor-pointer items-center justify-center rounded-full text-sm font-medium text-white"
        >
          작가 신청하기
        </button>
      </div>

      <Image width={540} height={334} src="/main/hero-image1.png" alt="메인페이지 이미지" />
    </section>
  );
}
