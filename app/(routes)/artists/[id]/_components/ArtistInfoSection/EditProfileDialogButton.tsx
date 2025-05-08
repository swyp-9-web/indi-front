'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { FormValues } from '@/lib/schemas/artistProfileEditForm.schema';

import EditProfileForm from './EditProfileForm';

interface EditProfileDialogButtonProps {
  initialValues: FormValues;
}

export default function EditProfileDialogButton({ initialValues }: EditProfileDialogButtonProps) {
  return (
    <Dialog>
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

        <EditProfileForm initialValues={initialValues} />
      </DialogContent>
    </Dialog>
  );
}
