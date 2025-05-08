import { ChangeEvent, useEffect, useRef, useState } from 'react';

import ProfileImage from '@/app/_components/shared/ProfileImage';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ProfileEditIcon } from '@/lib/icons';

interface ProfileImageInputProps {
  profileImgUrl: string;
  onChange?: (file: File) => void;
}

export default function ProfileImageInput({ profileImgUrl, onChange }: ProfileImageInputProps) {
  const [previewUrl, setPreviewUrl] = useState(profileImgUrl);
  const previousObjectUrl = useRef<string | null>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // 이전 URL revoke
    if (previousObjectUrl.current) {
      URL.revokeObjectURL(previousObjectUrl.current);
    }

    const newUrl = URL.createObjectURL(file);
    previousObjectUrl.current = newUrl;

    setPreviewUrl(newUrl);
    onChange?.(file);
  };

  // 언마운트시 URL revoke
  useEffect(() => {
    return () => {
      if (previousObjectUrl.current) {
        URL.revokeObjectURL(previousObjectUrl.current);
      }
    };
  }, []);

  return (
    <div className="relative h-25 w-25">
      <Label htmlFor="profile-image" className="block h-full w-full cursor-pointer">
        <ProfileImage className="h-full w-full" src={previewUrl} />
        <ProfileEditIcon className="absolute right-0 bottom-0" />
      </Label>

      <Input
        id="profile-image"
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />
    </div>
  );
}
