import { cn } from '@/lib/utils';

interface FooterProps {
  className?: string;
}

export default function Footer({ className }: FooterProps) {
  return (
    <footer className={cn('bg-custom-gray-100 flex h-10 items-center justify-center', className)}>
      임시 푸터
    </footer>
  );
}
