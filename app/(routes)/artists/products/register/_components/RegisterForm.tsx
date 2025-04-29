'use client';

import { useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
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
import { CATEGORY_ITEMS } from '@/constants';
import { CancelIcon, ChevronBackwardIcon, CloseIcon } from '@/lib/icons';
import { cn } from '@/lib/utils';
import { getCategoryLabelByValue } from '@/utils/itemUtils';

import ImageInputGrid from './ImageInputGrid';

const MAX_LENGTH = {
  name: 40,
  material: 40,
  description: 400,
};

const productRegisterFormSchema = z
  .object({
    name: z
      .string()
      .min(1, { message: '작품명을 입력해 주세요.' })
      .refine((val) => val.replace(/\s/g, '').length <= MAX_LENGTH.name, {
        message: '작품명은 공백 제외 40자 이내여야 합니다.',
      }),

    category: z.string().min(1, { message: '카테고리를 선택해 주세요.' }),

    size: z
      .object({
        width: z.string().optional(),
        height: z.string().optional(),
        depth: z.string().optional(),
      })
      .superRefine((value, ctx) => {
        if (value.width && !/^\d+$/.test(value.width)) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            path: [],
            message: '숫자를 입력해 주세요.',
          });
        }
        if (value.height && !/^\d+$/.test(value.height)) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            path: [],
            message: '숫자를 입력해 주세요.',
          });
        }
        if ((value.width && !value.height) || (value.height && !value.width)) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            path: [],
            message: '가로와 세로를 모두 입력해 주세요.',
          });
        }
        if (value.depth && !/^\d+$/.test(value.depth)) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            path: [],
            message: '숫자를 입력해 주세요.',
          });
        }
      }),

    material: z
      .string()
      .optional()
      .refine((val) => !val || val.replace(/\s/g, '').length <= MAX_LENGTH.material, {
        message: '재질은 공백 제외 40자 이내여야 합니다.',
      }),

    description: z
      .string()
      .min(1, { message: '작품 설명을 입력해 주세요.' })
      .refine((val) => val.replace(/(\s|\n)/g, '').length <= MAX_LENGTH.description, {
        message: '작품 설명은 공백/줄바꿈 제외 400자 이내여야 합니다.',
      }),

    priceType: z.enum(['fixed', 'inquiry'], {
      required_error: '거래 방식을 선택해 주세요.',
    }),

    price: z.string().optional(),

    images: z
      .array(z.union([z.instanceof(File), z.string()]))
      .min(1, { message: '최소 1장의 이미지를 업로드해 주세요.' }),
  })
  .superRefine((value, ctx) => {
    if (value.priceType === 'fixed') {
      if (!value.price) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ['price'],
          message: '가격을 입력해 주세요.',
        });
      }
      if (value.price && !/^\d+$/.test(value.price)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ['price'],
          message: '숫자를 입력해 주세요.',
        });
      }
    }
  });

type FormValues = z.infer<typeof productRegisterFormSchema>;

export default function RegisterForm() {
  const form = useForm<FormValues>({
    resolver: zodResolver(productRegisterFormSchema),
    defaultValues: {
      name: '',
      category: '',
      size: {
        width: '',
        height: '',
        depth: '',
      },
      material: '',
      description: '',
      priceType: 'fixed',
      price: '',
      images: [],
    },
  });

  // TODO: 실제 API 요청과 연동 필요
  const onSubmit = async (data: FormValues) => {
    try {
      console.log('--- 폼 제출 시작 ---');
      console.log('1. 입력된 텍스트 데이터:', data);

      // (핵심) File 타입만 변환하고, string(url)은 그대로 유지
      const uploadedImageUrls = await Promise.all(
        data.images.map(async (image) => {
          if (image instanceof File) {
            // (Mock) 파일을 서버에 업로드하고 URL을 리턴받았다고 가정
            return `https://mockserver.com/uploads/${image.name}`;
          }
          // 이미 string이면 그대로 사용
          return image;
        })
      );

      console.log('2. (Mock) 서버로부터 받은 이미지 URL:', uploadedImageUrls);

      // 업로드된 URL로 images 필드를 업데이트
      form.setValue('images', uploadedImageUrls);

      // 최종 서버에 보낼 데이터
      const { images: _images, priceType: _priceType, ...rest } = data;

      const finalPayload = {
        ...rest,
        price: data.priceType === 'inquiry' ? null : Number(data.price),
        imgUrls: uploadedImageUrls,
      };

      console.log('3. 최종 서버로 전송할 데이터:', finalPayload);

      console.log('✅ 등록이 완료되었습니다.');
    } catch (error) {
      console.error('❌ 등록 중 오류 발생:', error);
    }
  };

  return (
    <Form {...form}>
      <form className="w-full" onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex items-start gap-5">
          <div className="border-custom-gray-100 mb-15 w-117.5 rounded-lg border px-7.5 py-7.5">
            <h3 className="text-custom-brand-primary mb-1 text-lg font-bold">
              작품 이미지<span className="text-custom-status-notice">*</span>
            </h3>
            <p className="text-custom-brand-primary mb-9 text-sm">
              작품 이미지는 1:1 비율로 보여져요. 개당 최대 50MB 이하의 이미지만 업로드가 가능하며,
              <span className="text-custom-status-notice font-semibold">최대 8장</span>까지 추가가
              가능해요.
            </p>

            {/* 작품 이미지 입력 */}
            <FormField
              control={form.control}
              name="images"
              render={() => (
                <FormItem>
                  <FormControl>
                    <ImageInputGrid
                      initialImages={form.getValues('images')}
                      onChangeImages={(images) => {
                        form.setValue('images', images, { shouldValidate: true });
                      }}
                    />
                  </FormControl>
                  <FormMessage className="text-custom-status-negative text-xs font-semibold" />
                </FormItem>
              )}
            />
          </div>

          <div className="border-custom-gray-100 mb-15 flex-1 rounded-lg border px-7.5 py-7.5">
            <h3 className="text-custom-brand-primary mb-7.5 text-lg font-bold">작품 정보</h3>

            <div className="flex flex-col gap-3.5">
              {/* 작품명 */}
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="relative block">
                    <FormLabel className="data-[error=true]:text-custom-brand-primary mb-1.5 gap-0 text-sm font-semibold">
                      작품명<span className="text-custom-status-notice">*</span>
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          className="placeholder:text-custom-gray-200 text-custom-gray-900 h-12 pr-12 pl-4.5 font-medium shadow-none placeholder:text-sm placeholder:font-medium"
                          placeholder="작품명을 입력해 주세요."
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
                        <span className="text-custom-status-notice">
                          {field.value.trim().length}
                        </span>
                        /{MAX_LENGTH.name}
                      </p>
                    </div>
                  </FormItem>
                )}
              />

              {/* 카테고리 */}
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem className="relative block">
                    <FormLabel className="data-[error=true]:text-custom-brand-primary mb-1.5 gap-0 text-sm font-semibold">
                      카테고리<span className="text-custom-status-notice">*</span>
                    </FormLabel>
                    <FormControl>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <button
                            type="button"
                            className="text-custom-gray-900 relative h-12 w-full cursor-pointer rounded-lg border pr-12 pl-4.5 text-left text-sm font-medium shadow-none"
                          >
                            {field.value ? (
                              getCategoryLabelByValue(field.value)
                            ) : (
                              <span className="text-custom-gray-200">카테고리를 선택해 주세요</span>
                            )}
                            <ChevronBackwardIcon className="absolute top-1/2 right-4.5 -translate-y-1/2" />
                          </button>
                        </DropdownMenuTrigger>

                        <DropdownMenuContent className="bg-custom-background border-custom-gray-100 z-10 w-182.5 rounded-lg border p-0 shadow-none">
                          {CATEGORY_ITEMS.map((item) => (
                            <DropdownMenuItem
                              key={item.value}
                              onClick={() => field.onChange(item.value)}
                              className="focus:text-custom-brand-primary text-custom-brand-primary h-10 cursor-pointer px-3 py-2.5 text-sm font-medium underline-offset-2 hover:bg-transparent hover:underline focus:bg-transparent"
                            >
                              {item.label}
                            </DropdownMenuItem>
                          ))}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </FormControl>
                    <FormMessage className="text-custom-status-negative mt-1 text-xs font-semibold" />
                  </FormItem>
                )}
              />

              {/* 작품 크기 */}
              <FormField
                control={form.control}
                name="size"
                render={() => (
                  <FormItem className="relative block">
                    <FormLabel className="data-[error=true]:text-custom-brand-primary mb-1.5 gap-0 text-sm font-semibold">
                      작품 실측(cm)
                    </FormLabel>

                    <div className="flex items-center gap-2">
                      {/* 가로 입력 */}
                      <FormField
                        control={form.control}
                        name="size.width"
                        render={({ field }) => (
                          <FormControl>
                            <Input
                              className="placeholder:text-custom-gray-200 text-custom-gray-900 h-12 w-20 px-4.5 font-medium shadow-none placeholder:text-sm placeholder:font-medium"
                              placeholder="가로"
                              type="number"
                              {...field}
                              onChange={(value) => {
                                field.onChange(value);
                                form.trigger('size');
                              }}
                            />
                          </FormControl>
                        )}
                      />

                      <CloseIcon />

                      {/* 세로 입력 */}
                      <FormField
                        control={form.control}
                        name="size.height"
                        render={({ field }) => (
                          <FormControl>
                            <Input
                              className="placeholder:text-custom-gray-200 text-custom-gray-900 h-12 w-20 px-4.5 font-medium shadow-none placeholder:text-sm placeholder:font-medium"
                              placeholder="세로"
                              type="number"
                              {...field}
                              onChange={(value) => {
                                field.onChange(value);
                                form.trigger('size');
                              }}
                            />
                          </FormControl>
                        )}
                      />

                      <CloseIcon />

                      {/* 폭 입력 */}
                      <FormField
                        control={form.control}
                        name="size.depth"
                        render={({ field }) => (
                          <FormControl>
                            <Input
                              className="placeholder:text-custom-gray-200 text-custom-gray-900 h-12 w-20 px-4.5 font-medium shadow-none placeholder:text-sm placeholder:font-medium"
                              placeholder="폭"
                              type="number"
                              {...field}
                              onChange={(value) => {
                                field.onChange(value);
                                form.trigger('size');
                              }}
                            />
                          </FormControl>
                        )}
                      />
                    </div>

                    <FormMessage className="text-custom-status-negative mt-1 text-xs font-semibold" />
                  </FormItem>
                )}
              />

              {/* 재질 */}
              <FormField
                control={form.control}
                name="material"
                render={({ field }) => (
                  <FormItem className="relative block">
                    <FormLabel className="data-[error=true]:text-custom-brand-primary mb-1.5 gap-0 text-sm font-semibold">
                      작품 재질
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          className="placeholder:text-custom-gray-200 text-custom-gray-900 h-12 pr-12 pl-4.5 font-medium shadow-none placeholder:text-sm placeholder:font-medium"
                          placeholder="작품명을 입력해 주세요."
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
                        <span className="text-custom-status-notice">
                          {field.value?.trim().length}
                        </span>
                        /{MAX_LENGTH.material}
                      </p>
                    </div>
                  </FormItem>
                )}
              />

              {/* 작품 설명 */}
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem className="relative block">
                    <FormLabel className="data-[error=true]:text-custom-brand-primary mb-1.5 gap-0 text-sm font-semibold">
                      작품 설명<span className="text-custom-status-notice">*</span>
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        className="aria-invalid:border-input aria-invalid:focus-visible:ring-ring/50 placeholder:text-custom-gray-200 text-custom-gray-900 h-57 resize-none px-4.5 py-3.5 font-medium shadow-none placeholder:text-sm placeholder:font-medium"
                        placeholder="작품 설명을 입력해 주세요."
                        {...field}
                      />
                    </FormControl>
                    <div className="mt-1 flex items-center justify-between">
                      <FormMessage className="text-custom-status-negative text-xs font-semibold" />
                      <p className="flex-1 text-right text-xs">
                        <span className="text-custom-status-notice">
                          {field.value.trim().length}
                        </span>
                        /{MAX_LENGTH.description}
                      </p>
                    </div>
                  </FormItem>
                )}
              />

              {/* 거래 방식 */}
              <FormField
                control={form.control}
                name="priceType"
                render={({ field }) => (
                  <FormItem className="relative block">
                    <FormLabel className="data-[error=true]:text-custom-brand-primary mb-1.5 gap-0 text-sm font-semibold">
                      거래 방식<span className="text-custom-status-notice">*</span>
                    </FormLabel>
                    <div className="mb-1.5 flex items-center justify-start gap-0.5">
                      <button
                        type="button"
                        onClick={() => field.onChange('fixed')}
                        className={cn(
                          'border-custom-gray-100 flex cursor-pointer items-center justify-center rounded-full border px-4 py-2 text-xs',
                          field.value === 'fixed' && 'text-custom-background bg-custom-gray-400'
                        )}
                      >
                        가격입력
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          field.onChange('inquiry');
                          form.setValue('price', '', { shouldValidate: true });
                        }}
                        className={cn(
                          'border-custom-gray-100 flex cursor-pointer items-center justify-center rounded-full border px-4 py-2 text-xs',
                          field.value === 'inquiry' && 'text-custom-background bg-custom-gray-400'
                        )}
                      >
                        작가에게 문의
                      </button>
                    </div>

                    <FormField
                      control={form.control}
                      name="price"
                      render={({ field: priceField }) => (
                        <FormItem>
                          <FormControl>
                            <div className="relative w-75">
                              <Input
                                className="disabled:bg-custom-gray-100 disabled:placeholder:text-custom-gray-300 placeholder:text-custom-gray-200 text-custom-gray-900 relative h-12 w-full pr-10 pl-4.5 font-medium shadow-none placeholder:text-sm placeholder:font-medium disabled:opacity-100"
                                placeholder="작품 가격을 입력해 주세요."
                                disabled={form.watch('priceType') === 'inquiry'}
                                type="number"
                                {...priceField}
                              />
                              <p
                                className={cn(
                                  'text-custom-gray-200 absolute top-1/2 right-4.5 -translate-1/2 text-sm font-medium',
                                  form.watch('priceType') === 'inquiry' && 'text-custom-gray-300'
                                )}
                              >
                                원
                              </p>
                            </div>
                          </FormControl>

                          <FormMessage className="text-custom-status-negative mt-1 text-xs font-semibold" />
                        </FormItem>
                      )}
                    />
                  </FormItem>
                )}
              />
            </div>
          </div>
        </div>

        {/* 하단 버튼 */}
        <div className="mb-20 flex items-center justify-center gap-2.5">
          <button
            type="button"
            className="border-custom-gray-100 flex h-11.5 w-42 cursor-pointer items-center justify-center rounded-full border text-sm font-medium"
            onClick={() => console.log('임시저장')}
          >
            임시저장
          </button>
          <button
            type="submit"
            className="bg-custom-brand-secondary text-custom-gray-900 flex h-11.5 w-42 cursor-pointer items-center justify-center rounded-full text-sm font-medium"
          >
            등록하기
          </button>
        </div>
      </form>
    </Form>
  );
}
