'use client';

import { useAuthDialog } from '@/stores/useAuthDialog';

export default function LoginButton() {
  const { toggleIsOpen } = useAuthDialog();

  return (
    <button
      onClick={toggleIsOpen}
      className="text-custom-gray-900 bg-custom-brand-secondary flex h-9.5 w-37.5 cursor-pointer items-center justify-center rounded-full text-sm font-medium"
    >
      로그인 / 회원가입
    </button>
  );
}
