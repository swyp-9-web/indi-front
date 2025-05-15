import { z } from 'zod';

export const MAX_LENGTH = {
  content: 400,
};

export const commentFormSchema = z.object({
  content: z
    .string()
    .min(1, '댓글을 입력해 주세요.')
    .max(MAX_LENGTH.content, `댓글은 ${MAX_LENGTH.content}자 이하로 입력해주세요.`),

  secret: z.boolean(),
});

export type FormValues = z.infer<typeof commentFormSchema>;
