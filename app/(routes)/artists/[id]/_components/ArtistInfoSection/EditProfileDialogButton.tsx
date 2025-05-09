'use client';

import { useState } from 'react';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { ArtistDetail } from '@/lib/apis/user.type';

import EditProfileForm from './EditProfileForm';

interface EditProfileDialogButtonProps {
  artist: ArtistDetail;
}

export default function EditProfileDialogButton({ artist }: EditProfileDialogButtonProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={() => setIsOpen((prev) => !prev)}>
      <DialogTrigger asChild>
        <button className="text-custom-brand-primary mx-auto block cursor-pointer text-sm font-medium underline underline-offset-2">
          작가 프로필 수정
        </button>
      </DialogTrigger>
      <DialogContent className="scrollbar-hidden max-h-230 overflow-y-auto p-7.5">
        <DialogHeader>
          <DialogTitle className="text-custom-brand-primary text-2xl font-bold">
            작가 프로필 수정
          </DialogTitle>
        </DialogHeader>

        <EditProfileForm artist={artist} onClose={() => setIsOpen((prev) => !prev)} />
      </DialogContent>
    </Dialog>
  );
}
