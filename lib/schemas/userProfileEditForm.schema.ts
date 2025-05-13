import { z } from 'zod';

export const MAX_LENGTH = {
  nickname: 20,
};

export const userProfileEditFormSchema = z.object({
  nickname: z
    .string()
    .min(1, '닉네임을 입력해 주세요.')
    .max(MAX_LENGTH.nickname, `닉네임은 ${MAX_LENGTH.nickname}자 이하로 입력해주세요.`),

  name: z.string(),

  telNumber: z.string(),

  email: z.string(),
});

export type FormValues = z.infer<typeof userProfileEditFormSchema>;
