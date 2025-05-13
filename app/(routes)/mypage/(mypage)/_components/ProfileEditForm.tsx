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
import {
  FormValues,
  MAX_LENGTH,
  userProfileEditFormSchema,
} from '@/lib/schemas/userProfileEditForm.schema';

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

  const handleSubmit = (data: FormValues) => {
    console.log(data.nickname);
    onClose();
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
                  <span className="text-custom-status-notice">{field.value.trim().length}</span>/
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
          className="bg-custom-brand-secondary text-custom-gray-900 mt-11.5 h-12 w-full cursor-pointer rounded-full text-sm font-medium"
        >
          완료
        </button>
      </Form>
    </form>
  );
}
