import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';

import ProfileImageInput from '@/app/_components/shared/ProfileImageInput';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { UserSummary } from '@/lib/apis/user.type';
import { CancelIcon } from '@/lib/icons';
import { useEditUserProfile } from '@/lib/queries/useUserQueries';
import {
  FormValues,
  MAX_LENGTH,
  userProfileEditFormSchema,
} from '@/lib/schemas/userProfileEditForm.schema';
import toast from '@/lib/toast';

interface ProfileEditFormProps {
  user: UserSummary;
  onClose: () => void;
}

export default function ProfileEditForm({ user, onClose }: ProfileEditFormProps) {
  const [userProfileImg, setUserProfileImg] = useState<File | string>(user.profileImgUrl);

  const form = useForm<FormValues>({
    resolver: zodResolver(userProfileEditFormSchema),
    defaultValues: {
      nickname: user.nickname,
      name: user.name,
      telNumber: user.telNumber,
      email: user.email,
    },
  });

  const { mutate, isPending } = useEditUserProfile();

  const handleSubmit = (formValues: FormValues) => {
    // 프로필 이미지 유효성 검사
    if (userProfileImg instanceof File) {
      const FILE_MAX_SIZE = 5 * 1024 * 1024;
      const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];

      if (userProfileImg.size > FILE_MAX_SIZE) {
        toast.error('프로필 이미지는 5MB 이하만 업로드할 수 있습니다');
        return;
      }

      if (!allowedTypes.includes(userProfileImg.type)) {
        toast.error('PNG, JPG, JPEG 형식의 파일만 업로드할 수 있습니다');
        return;
      }
    }

    // FormData 생성
    const formData = new FormData();

    formData.append('request', JSON.stringify({ nickname: formValues.nickname }));

    // 기존 이미지에서 바뀌지 않는 경우 (string), formData에 포함하지 않음
    if (userProfileImg instanceof File) {
      formData.append('profileImage', userProfileImg);
    }

    mutate(formData, {
      onSuccess: () => {
        toast.default('프로필이 성공적으로 수정되었습니다');
        onClose();
      },
      onError: () => {
        toast.error('잠시 후 다시 시도해주세요');
      },
    });
  };

  return (
    <form onSubmit={form.handleSubmit(handleSubmit)}>
      <Form {...form}>
        <div className="mb-5">
          <ProfileImageInput
            initialProfileImgUrl={user.profileImgUrl}
            onChange={setUserProfileImg}
          />
        </div>

        <FormField
          control={form.control}
          name="nickname"
          render={({ field }) => (
            <FormItem className="relative block">
              <FormLabel className="data-[error=true]:text-custom-brand-primary mb-1.5 gap-0 text-sm font-semibold">
                닉네임
              </FormLabel>

              <FormControl>
                <div className="relative">
                  <Input
                    className="border-custom-gray-100 placeholder:text-custom-gray-200 text-custom-gray-900 h-12 pr-12 pl-4.5 font-medium shadow-none placeholder:text-sm placeholder:font-medium"
                    placeholder="닉네임을 입력해 주세요."
                    {...field}
                  />
                  {field.value && (
                    <button
                      type="button"
                      onClick={() => field.onChange('')}
                      className="absolute top-1/2 right-4.5 -translate-y-1/2 cursor-pointer"
                    >
                      <CancelIcon />
                    </button>
                  )}
                </div>
              </FormControl>

              <div className="mt-1 flex items-center justify-between">
                <FormMessage className="text-custom-status-negative text-xs font-semibold" />
                <p className="flex-1 text-right text-xs">
                  <span className="text-custom-status-notice">{field.value.length}</span>/
                  {MAX_LENGTH.nickname}
                </p>
              </div>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="relative block">
              <FormLabel className="data-[error=true]:text-custom-brand-primary mb-1.5 gap-0 text-sm font-semibold">
                이름 (실명)
              </FormLabel>

              <FormControl>
                <div className="relative">
                  <Input
                    className="disabled:bg-custom-gray-100 border-custom-gray-100 placeholder:text-custom-gray-300 disabled:placeholder:text-custom-gray-300 text-custom-gray-900 h-12 pr-12 pl-4.5 font-medium shadow-none placeholder:text-sm placeholder:font-medium"
                    disabled
                    readOnly
                    {...field}
                  />
                </div>
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="telNumber"
          render={({ field }) => (
            <FormItem className="relative mt-5 block">
              <FormLabel className="data-[error=true]:text-custom-brand-primary mb-1.5 gap-0 text-sm font-semibold">
                전화번호
              </FormLabel>

              <FormControl>
                <div className="relative">
                  <Input
                    className="disabled:bg-custom-gray-100 border-custom-gray-100 placeholder:text-custom-gray-300 disabled:placeholder:text-custom-gray-300 text-custom-gray-900 h-12 pr-12 pl-4.5 font-medium shadow-none placeholder:text-sm placeholder:font-medium"
                    disabled
                    readOnly
                    {...field}
                  />
                </div>
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="relative mt-5 block">
              <FormLabel className="data-[error=true]:text-custom-brand-primary mb-1.5 gap-0 text-sm font-semibold">
                이메일
              </FormLabel>

              <FormControl>
                <div className="relative">
                  <Input
                    className="disabled:bg-custom-gray-100 border-custom-gray-100 placeholder:text-custom-gray-300 disabled:placeholder:text-custom-gray-300 text-custom-gray-900 h-12 pr-12 pl-4.5 font-medium shadow-none placeholder:text-sm placeholder:font-medium"
                    disabled
                    readOnly
                    {...field}
                  />
                </div>
              </FormControl>
            </FormItem>
          )}
        />

        <button
          type="submit"
          disabled={isPending}
          className="bg-custom-brand-secondary text-custom-gray-900 mt-11.5 h-12 w-full cursor-pointer rounded-full text-sm font-medium"
        >
          완료
        </button>
      </Form>
    </form>
  );
}
