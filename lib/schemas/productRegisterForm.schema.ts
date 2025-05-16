import { z } from 'zod';

import { formatNumberWithComma } from '@/utils/formatNumber';

export const MAX_LENGTH = {
  name: 40,
  material: 40,
  description: 400,
};

const MAX_NUMBER = {
  size: 10000,
  price: 100000000,
};

const sizeSchema = z
  .object({
    width: z.string().optional(),
    height: z.string().optional(),
    depth: z.string().optional(),
  })
  .superRefine(({ width, height, depth }, ctx) => {
    [width, height, depth].forEach((value) => {
      if (value && !/^\d+$/.test(value)) {
        ctx.addIssue({ code: z.ZodIssueCode.custom, message: '숫자를 입력해 주세요.' });
      }
      if (Number(value) > MAX_NUMBER.size) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: `${formatNumberWithComma(MAX_NUMBER.size)} 이하의 숫자를 입력해 주세요.`,
        });
      }
    });

    if ((width && !height) || (height && !width)) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, message: '가로와 세로를 모두 입력해 주세요.' });
    }
  });

export const productRegisterFormSchema = z
  .object({
    title: z
      .string()
      .min(1, { message: '작품명을 입력해 주세요.' })
      .refine((val) => val.replace(/\s/g, '').length <= MAX_LENGTH.name, {
        message: '작품명은 공백 제외 40자 이내여야 합니다.',
      }),

    categoryType: z.string().min(1, { message: '카테고리를 선택해 주세요.' }),

    size: sizeSchema,

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

    priceType: z.enum(['fixed', 'inquiry'], { required_error: '거래 방식을 선택해 주세요.' }),

    price: z.string().optional(),
  })
  .superRefine(({ priceType, price }, ctx) => {
    if (priceType === 'fixed') {
      if (!price) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ['price'],
          message: '가격을 입력해 주세요.',
        });
      }
      if (price && !/^\d+$/.test(price)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ['price'],
          message: '올바른 값을 입력해 주세요.',
        });
      }
      if (Number(price) > MAX_NUMBER.price) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ['price'],
          message: `${formatNumberWithComma(MAX_NUMBER.price)} 이하의 숫자를 입력해주세요.`,
        });
      }
    }
  });

export type FormValues = z.infer<typeof productRegisterFormSchema>;
