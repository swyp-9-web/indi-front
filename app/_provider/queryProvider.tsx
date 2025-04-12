'use client';
import { ReactNode, useState } from 'react';
import { QueryClient, QueryClientProvider, HydrationBoundary } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

interface Props {
  children: ReactNode;
}

export default function QueryProvider({ children }: Props) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <HydrationBoundary>
        {children}
        {process.env.NODE_ENV === 'development' && <ReactQueryDevtools initialIsOpen={false} />}
      </HydrationBoundary>
    </QueryClientProvider>
  );
}
