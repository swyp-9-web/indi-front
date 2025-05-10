'use client';

import { useEffect, useState } from 'react';

import Image from 'next/image';

import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { API_BASE_URL } from '@/constants';
import { useAuthDialog } from '@/stores/useAuthDialog';

export default function LoginDialog() {
  const { isOpen, toggleIsOpen } = useAuthDialog();

  const handleNaverLoginClick = () => {
    const encodedRedirectUri = encodeURIComponent(
      `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`
    );

    window.location.href = `${API_BASE_URL.SERVER}/login/naver?redirect_uri=${encodedRedirectUri}`;
  };

  // -------------------- 더미 로그인 관련 로직 --------------------  //
  const [showDummyLogin, setShowDummyLogin] = useState(false);
  useEffect(() => {
    const fetchAuthConfig = async () => {
      try {
        const res = await fetch('/api/auth/config');
        const data = await res.json();
        if (data.hasDummyLogin) {
          setShowDummyLogin(true);
        }
      } catch {
        console.error('더미 로그인 요청 에러 발생');
      }
    };

    fetchAuthConfig();
  }, []);

  const handleDummyLogin = async (role: 'ARTIST' | 'USER') => {
    const res = await fetch(`${API_BASE_URL.CLIENT}/api/dev/auth/dummy-login?role=${role}`, {
      method: 'POST',
    });
    const data = await res.json();

    console.log(data.result);

    await fetch('/api/auth/callback', {
      method: 'POST',
      body: JSON.stringify({ sessionId: data.result }),
    });

    window.location.reload();
  };
  // -------------------- ------------------- --------------------  //

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
        <div className="mt-7.5 flex flex-col gap-2.5">
          <button
            onClick={handleNaverLoginClick}
            className="flex h-11.5 w-75 cursor-pointer items-center justify-center gap-2 rounded-full bg-[#03c75a]"
          >
            <Image src="/icons/naver-white.png" alt="네이버 로고" width={24} height={24} />
            <span className="text-sm font-medium text-white">네이버로 시작하기</span>
          </button>

          {/* 더미 로그인 컴포넌트 */}
          {showDummyLogin && (
            <>
              <button
                onClick={() => handleDummyLogin('USER')}
                className="border-custom-gray-100 text-custom-brand-primary flex h-11.5 w-full cursor-pointer items-center justify-center gap-2 rounded-full border text-center text-sm font-medium"
              >
                USER 로그인 (관리자)
              </button>
              <button
                onClick={() => handleDummyLogin('ARTIST')}
                className="border-custom-gray-100 text-custom-brand-primary flex h-11.5 w-full cursor-pointer items-center justify-center gap-2 rounded-full border text-center text-sm font-medium"
              >
                ARTIST 로그인 (관리자)
              </button>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
