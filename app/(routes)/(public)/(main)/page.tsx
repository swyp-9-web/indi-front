'use client';

import { useQuery } from '@tanstack/react-query';

import { fetchHello } from '@/lib/api/hello.api';

export default function HomePage() {
  const { data } = useQuery({
    queryKey: ['hello'],
    queryFn: fetchHello,
  });
  return (
    <>
      <h1>Hello!</h1>
    </>
  );
}
