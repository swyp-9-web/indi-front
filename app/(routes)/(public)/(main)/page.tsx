'use client';

import { useHelloQuery } from '@/lib/queries/useHelloQueries';

import HomePage from './_components/Homepage';

export default function Home() {
  const { data } = useHelloQuery();

  return (
    <>
      <HomePage />
    </>
  );
}
