import { z } from 'zod';

export const MAX_LENGTH = {
  nickname: 20,
  aboutMe: 100,
};

export const artistProfileEditFormSchema = z.object({
  nickname: z
    .string()
    .min(1, '작가이름을 입력해 주세요.')
    .max(MAX_LENGTH.nickname, `작가이름은 ${MAX_LENGTH.nickname}자 이하로 입력해주세요.`),

  aboutMe: z
    .string()
    .min(1, '자기소개를 입력해 주세요.')
    .max(MAX_LENGTH.aboutMe, `자기소개는 ${MAX_LENGTH.aboutMe}자 이하로 입력해 주세요.`),

  homeLink: z
    .string()
    .url({ message: '유효한 URL 형식이어야 합니다.' })
    .or(z.literal(''))
    .optional(),

  snsLinks: z
    .array(z.string().url({ message: '유효한 URL 형식이어야 합니다.' }).or(z.literal('')))
    .optional(),
});

export type FormValues = z.infer<typeof artistProfileEditFormSchema>;
