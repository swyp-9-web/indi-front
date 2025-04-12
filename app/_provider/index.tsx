import QueryProvider from '@/app/_provider/queryProvider';

export default function Providers({ children }: { children: React.ReactNode }) {
  return <QueryProvider>{children}</QueryProvider>;
}
