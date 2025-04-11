// app/page.tsx
'use client';

import { useQuery } from '@tanstack/react-query';
import { fetchHello } from '@/lib/api/hello.api';

export default function HomePage() {
  const { data, isLoading } = useQuery({
    queryKey: ['hello'],
    queryFn: fetchHello,
  });

  if (isLoading) return <p>로딩중...</p>;
  return <p>{data.message}</p>;
}
