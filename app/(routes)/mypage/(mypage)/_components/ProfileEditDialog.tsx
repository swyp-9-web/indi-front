import { useState } from 'react';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { UserSummary } from '@/lib/apis/user.type';

import ProfileEditForm from './ProfileEditForm';

interface ProfileEditDialogProps {
  user: UserSummary | null;
}

export default function ProfileEditDialog({ user }: ProfileEditDialogProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={() => setIsOpen((prev) => !prev)}>
      <DialogTrigger asChild>
        <button className="text-custom-brand-primary border-custom-gray-100 mb-2.5 flex h-12 w-full cursor-pointer items-center justify-center rounded-full border text-sm font-medium">
          내 정보 관리
        </button>
      </DialogTrigger>
      <DialogContent className="flex w-115 flex-col gap-7.5 p-7.5">
        <DialogHeader>
          <DialogTitle className="text-custom-brand-primary text-2xl font-bold">
            내 정보 관리
          </DialogTitle>
        </DialogHeader>

        <ProfileEditForm user={user} onClose={() => setIsOpen((prev) => !prev)} />
      </DialogContent>
    </Dialog>
  );
}
