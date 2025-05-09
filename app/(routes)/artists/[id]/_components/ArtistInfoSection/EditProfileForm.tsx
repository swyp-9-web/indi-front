import { useEffect, useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { ArtistDetail } from '@/lib/apis/user.type';
import { AddIcon, CancelIcon } from '@/lib/icons';
import { useEditArtistProfile } from '@/lib/queries/useUserQueries';
import {
  artistProfileEditFormSchema,
  FormValues,
  MAX_LENGTH,
} from '@/lib/schemas/artistProfileEditForm.schema';
import toast from '@/lib/toast';

import ProfileImageInput from './ProfileImageInput';

interface EditProfileFormProps {
  artist: ArtistDetail;
  onClose: () => void;
}

export default function EditProfileForm({ artist, onClose }: EditProfileFormProps) {
  const [artistProfileImg, setArtistProfileImg] = useState<File | string>(artist.profileImgUrl);

  const form = useForm<FormValues>({
    resolver: zodResolver(artistProfileEditFormSchema),
    defaultValues: {
      nickname: artist.nickname,
      aboutMe: artist.aboutMe,
      homeLink: artist.homeLink,
      snsLinks: artist.snsLinks,
    },
  });

  const {
    fields: snsLinksFields,
    append,
    remove,
  } = useFieldArray({
    control: form.control,
    name: 'snsLinks' as never, // as never를 쓰지 않고 어떻게 타입 에러를 해결하는지 알 수 없음 😭
  });

  // snsLinksFields가 적어도 하나의 input을 가지도록 설정
  useEffect(() => {
    if (snsLinksFields.length === 0) {
      append('');
    }
  }, [snsLinksFields, append]);

  const { mutate, isPending } = useEditArtistProfile(artist.id);

  const handleSubmit = (formValues: FormValues) => {
    // 프로필 이미지 유효성 검사
    if (artistProfileImg instanceof File) {
      const FILE_MAX_SIZE = 5 * 1024 * 1024;
      const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];

      if (artistProfileImg.size > FILE_MAX_SIZE) {
        toast.error('프로필 이미지는 5MB 이하만 업로드할 수 있습니다');
        return;
      }

      if (!allowedTypes.includes(artistProfileImg.type)) {
        toast.error('PNG, JPG, JPEG 형식의 파일만 업로드할 수 있습니다');
        return;
      }
    }

    // snsLinks에서 빈 값 제거
    const filteredSnsLinks = formValues.snsLinks?.filter((link) => link.trim() !== '') ?? [];

    const requestPayload = {
      ...formValues,
      snsLinks: filteredSnsLinks,
    };

    const formData = new FormData();
    formData.append('request', JSON.stringify(requestPayload));

    // 기존 이미지에서 바뀌지 않는 경우 (string), formData에 포함하지 않음
    if (artistProfileImg instanceof File) {
      formData.append('profileImage', artistProfileImg);
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
        <div className="mb-7.5 flex items-start gap-7.5">
          {/* 프로필 이미지 입력 (react-hook-form 과 연결 X) */}
          <ProfileImageInput profileImgUrl={artist.profileImgUrl} onChange={setArtistProfileImg} />

          <div className="flex-1">
            {/* 작가 이름 입력 필드 */}
            <FormField
              control={form.control}
              name="nickname"
              render={({ field }) => (
                <FormItem className="relative mb-3.5 block">
                  <FormLabel className="data-[error=true]:text-custom-brand-primary mb-1.5 gap-0 text-sm font-semibold">
                    작가 이름<span className="text-custom-status-notice">*</span>
                  </FormLabel>

                  <FormControl>
                    <div className="relative">
                      <Input
                        className="border-custom-gray-100 placeholder:text-custom-gray-200 text-custom-gray-900 h-12 pr-12 pl-4.5 font-medium shadow-none placeholder:text-sm placeholder:font-medium"
                        placeholder="작가이름을 입력해 주세요."
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
                      <span className="text-custom-status-notice">{field.value.trim().length}</span>
                      /{MAX_LENGTH.nickname}
                    </p>
                  </div>
                </FormItem>
              )}
            />

            {/* 작가소개 입력 필드 */}
            <FormField
              control={form.control}
              name="aboutMe"
              render={({ field }) => (
                <FormItem className="relative block">
                  <FormLabel className="data-[error=true]:text-custom-brand-primary mb-1.5 gap-0 text-sm font-semibold">
                    작가소개<span className="text-custom-status-notice">*</span>
                  </FormLabel>

                  <FormControl>
                    <Textarea
                      className="border-custom-gray-100 aria-invalid:border-input aria-invalid:focus-visible:ring-ring/50 placeholder:text-custom-gray-200 text-custom-gray-900 h-23.5 resize-none px-4.5 py-3.5 font-medium shadow-none placeholder:text-sm placeholder:font-medium"
                      placeholder="예) 호기심이 많고 고양이를 좋아하는 작가입니다."
                      {...field}
                    />
                  </FormControl>

                  <div className="mt-1 flex items-center justify-between">
                    <FormMessage className="text-custom-status-negative text-xs font-semibold" />
                    <p className="flex-1 text-right text-xs">
                      <span className="text-custom-status-notice">{field.value.trim().length}</span>
                      /{MAX_LENGTH.aboutMe}
                    </p>
                  </div>
                </FormItem>
              )}
            />
          </div>
        </div>

        {/* 개인 홈페이지 링크 입력 필드*/}
        <FormField
          control={form.control}
          name="homeLink"
          render={({ field }) => (
            <FormItem className="relative mb-7.5 block">
              <FormLabel className="data-[error=true]:text-custom-brand-primary mb-1.5 gap-0 text-sm font-semibold">
                개인 홈페이지
              </FormLabel>

              <FormControl>
                <div className="relative">
                  <Input
                    className="border-custom-gray-100 placeholder:text-custom-gray-200 text-custom-gray-900 h-12 pr-12 pl-4.5 font-medium shadow-none placeholder:text-sm placeholder:font-medium"
                    placeholder="운영중인 개인 홈페이지를 입력해 주세요."
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

              <FormMessage className="text-custom-status-negative mt-1 text-xs font-semibold" />
            </FormItem>
          )}
        />

        {/* 웹사이트 / SNS 링크 다중 입력 필드*/}
        <div className="mb-7.5">
          <FormLabel className="mb-2 block text-sm font-semibold">웹사이트 / SNS 링크</FormLabel>

          {snsLinksFields.map((item, index) => (
            <FormField
              key={item.id}
              control={form.control}
              name={`snsLinks.${index}`}
              render={({ field }) => (
                <FormItem className="relative mb-2.5 block">
                  <FormControl>
                    <div className="relative">
                      <Input
                        className="border-custom-gray-100 placeholder:text-custom-gray-200 text-custom-gray-900 h-12 pr-12 pl-4.5 font-medium shadow-none placeholder:text-sm placeholder:font-medium"
                        placeholder="URL을 입력해주세요."
                        {...field}
                      />
                      {(snsLinksFields.length > 1 || field.value) && (
                        <button
                          type="button"
                          onClick={() => {
                            if (snsLinksFields.length > 1) {
                              remove(index);
                            } else {
                              field.onChange('');
                            }
                          }}
                          className="absolute top-1/2 right-4.5 -translate-y-1/2 cursor-pointer"
                        >
                          <CancelIcon />
                        </button>
                      )}
                    </div>
                  </FormControl>

                  <FormMessage className="text-custom-status-negative mt-1 text-xs font-semibold" />
                </FormItem>
              )}
            />
          ))}

          <button
            type="button"
            onClick={() => append('')}
            className="border-custom-gray-100 text-custom-brand-primary flex h-12 w-full cursor-pointer items-center justify-center gap-2.5 rounded-lg border text-sm font-medium"
          >
            <AddIcon />
            URL추가
          </button>
        </div>

        <button
          type="submit"
          disabled={isPending}
          className="bg-custom-brand-secondary text-custom-gray-900 mt-10 flex h-12 w-full cursor-pointer items-center justify-center rounded-full text-sm font-medium"
        >
          완료
        </button>
      </Form>
    </form>
  );
}
