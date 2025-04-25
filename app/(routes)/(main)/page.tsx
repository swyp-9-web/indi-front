'use client';

import { useHelloQuery } from '@/lib/queries/useHelloQueries';

export default function Home() {
  const { data } = useHelloQuery();

  return null;
  return <div>{data?.message}</div>;
}
