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

    mutate(sessionId, {
      onSuccess: () => router.replace('/'),
    });
  }, [searchParams, mutate, router]);

  return (
    <div className="flex h-dvh items-center justify-center">
      <div className="border-custom-gray-200 h-12 w-12 animate-spin rounded-full border-4 border-t-transparent" />
    </div>
  );
}
