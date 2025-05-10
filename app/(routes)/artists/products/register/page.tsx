'use client';

import { useEffect } from 'react';

import { useRouter } from 'next/navigation';

import { ROUTE_PATHS } from '@/constants';
import toast from '@/lib/toast';
import { useProductRegisterForm } from '@/stores/useProductRegisterForm';

import ProductRegisterForm from './_components/ProductRegisterForm';

export default function RegisterProduct() {
  const router = useRouter();
  const { mode, resetFormState } = useProductRegisterForm();

  // useProductRegisterPage 훅을 활용해 접근하지 않은 경우 redirect
  useEffect(() => {
    if (!mode) {
      // 유저 전용 에러 메시지, 뒤로가기로 진입, URL 접근 등 방지
      router.replace(ROUTE_PATHS.HOME);

      console.error('잘못된 접근입니다. useProductRegisterPage를 통해 접근해주세요.');
      toast.error('잘못된 접근입니다');
    }

    return () => resetFormState();
  }, [mode, router, resetFormState]);

  if (!mode) return null;

  return (
    <main className="w-8xl mx-auto mt-25 px-20">
      <h2 className="text-custom-brand-primary mb-12.5 text-2xl font-bold">작품 등록하기</h2>

      <ProductRegisterForm />
    </main>
  );
}
