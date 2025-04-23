'use client';

import { useHelloQuery } from '@/lib/queries/useHelloQueries';

export default function Home() {
  const { data } = useHelloQuery();

  return <div>{data?.message}</div>;
}
