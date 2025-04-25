import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';

interface ProfileImageProps {
  className?: string;
  src: string | null;
}

export default function ProfileImage({ className, src }: ProfileImageProps) {
  return (
    <Avatar className={cn('h-9 w-9', className)}>
      <AvatarImage src={src ?? 'undefined'} />
      <AvatarFallback className="bg-custom-gray-100 h-full w-full rounded-full" />
    </Avatar>
  );
}
