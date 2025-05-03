'use client';

import Image from 'next/image';

import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { useAuthDialog } from '@/stores/useAuthDialog';

export default function LoginDialog() {
  const { isOpen, toggleIsOpen } = useAuthDialog();

  // TODO: 로그인 동작 구현 필요
  const handleNaverLoginClick = () => {
    console.log('네이버 로그인');
  };

  return (
    <Dialog open={isOpen} onOpenChange={toggleIsOpen}>
      <DialogContent className="w-auto gap-0 rounded-lg p-7.5">
        <Image
          src="/logo/Artego.png"
          alt="로고 이미지"
          width={180}
          height={45}
          className="mx-auto mt-22.5 mb-24.5"
        />
        <DialogTitle className="text-custom-brand-primary text-center text-lg font-bold">
          SNS 간편 로그인
        </DialogTitle>
        <div className="mt-7.5">
          <button
            onClick={handleNaverLoginClick}
            className="flex h-11.5 w-75 cursor-pointer items-center justify-center gap-2 rounded-full bg-[#03c75a]"
          >
            <Image src="/icons/naver-white.png" alt="네이버 로고" width={24} height={24} />
            <span className="text-sm font-medium text-white">네이버로 시작히기</span>
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
