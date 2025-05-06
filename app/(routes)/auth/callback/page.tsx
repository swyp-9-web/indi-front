'use client';

import { useEffect } from 'react';

import { useRouter, useSearchParams } from 'next/navigation';

import { useLoginCallback } from '@/lib/queries/useUserQueries';

export default function AuthCallback() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const { mutate } = useLoginCallback();

  useEffect(() => {
    const sessionId = searchParams.get('sessionId');
    if (!sessionId) return;

    let timer: ReturnType<typeof setTimeout>;

    mutate(sessionId, {
      onSuccess: () => {
        // 라우팅이 너무 빠르게 일어나 깜빡이는 느낌이 들기 때문에,
        // 약간의 지연(0.3초)을 두고 홈으로 이동시킴
        timer = setTimeout(() => {
          router.replace('/');
        }, 300);
      },
    });

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [searchParams, mutate, router]);

  return (
    <div className="flex h-dvh items-center justify-center">
      <div className="border-custom-gray-200 h-12 w-12 animate-spin rounded-full border-4 border-t-transparent" />
    </div>
  );
}
