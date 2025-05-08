import { useEffect } from 'react';
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
import { AddIcon, CancelIcon } from '@/lib/icons';
import {
  artistProfileEditFormSchema,
  FormValues,
  MAX_LENGTH,
} from '@/lib/schemas/artistProfileEditForm.schema';

interface EditProfileFormProps {
  initialValues: FormValues;
}

export default function EditProfileForm({ initialValues }: EditProfileFormProps) {
  const form = useForm<FormValues>({
    resolver: zodResolver(artistProfileEditFormSchema),
    defaultValues: initialValues,
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

  // TODO: form 제출하기 전에 snsLinks에 ["", "https://~~~"] 이런식이면 ""를 날려야함

  return (
    <form onSubmit={form.handleSubmit((data) => console.log(data))}>
      <Form {...form}>
        <div className="mb-7.5 flex items-start gap-7.5">
          <div className="bg-custom-gray-100 h-25 w-25 rounded-full">이미지 입력</div>

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
                        className="border-custom-gray-100 h-12 pr-12 pl-4.5 font-medium shadow-none placeholder:text-sm"
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
          className="bg-custom-brand-secondary text-custom-gray-900 flex h-12 w-full cursor-pointer items-center justify-center rounded-full text-sm font-medium"
        >
          완료
        </button>
      </Form>
    </form>
  );
}
