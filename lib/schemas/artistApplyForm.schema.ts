import { z } from 'zod';

export const MAX_LENGTH = {
  artistAboutMe: 100,
};

export const artistApplyFormSchema = z.object({
  artistAboutMe: z
    .string()
    .min(1, '자기소개를 입력해 주세요.')
    .max(
      MAX_LENGTH.artistAboutMe,
      `자기소개는 ${MAX_LENGTH.artistAboutMe}자 이하로 입력해 주세요.`
    ),

  email: z
    .string()
    .min(1, '이메일을 입력해 주세요.')
    .email({ message: '잘못된 이메일 주소입니다. 다시 입력해주세요.' }),

  snsLink: z
    .string()
    .min(1, '링크 없이는 신청이 불가능합니다.')
    .url({ message: '유효한 URL 형식이어야 합니다.' }),
});

export type FormValues = z.infer<typeof artistApplyFormSchema>;
