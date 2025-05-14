import { useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';

import ProfileImage from '@/app/_components/shared/ProfileImage';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { UserSummary } from '@/lib/apis/user.type';
import { RadioCheckedIcon, RadioUnCheckedIcon } from '@/lib/icons';
import { commentFormSchema, FormValues, MAX_LENGTH } from '@/lib/schemas/commentForm.schema';

interface CommentCreateFormProps {
  user: UserSummary | null;
  productId: number;
}

export default function CommentCreateForm({ user, productId }: CommentCreateFormProps) {
  const form = useForm<FormValues>({
    resolver: zodResolver(commentFormSchema),
    defaultValues: {
      content: '',
      secret: false,
    },
  });

  return (
    <Form {...form}>
      <form className="mt-7.5">
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem className="relative block">
              <div className="absolute top-4 left-4 flex items-center gap-1.5">
                <ProfileImage src={user?.profileImgUrl ?? null} className="h-6 w-6" />
                <div className="text-custom-brand-primary text-sm font-semibold">
                  {user ? user.nickname : '로그인이 필요합니다'}
                </div>
              </div>

              <FormControl>
                <Textarea
                  className="aria-invalid:border-input aria-invalid:focus-visible:ring-ring/50 placeholder:text-custom-gray-200 text-custom-gray-900 focus:!border-custom-gray-100 h-53 resize-none rounded-t-lg rounded-b-none px-4 pt-12 pb-13.5 font-medium shadow-none placeholder:text-sm placeholder:font-medium focus-visible:ring-0"
                  placeholder="작품에 대한 감상평이나 문의를 남겨주세요."
                  {...field}
                />
              </FormControl>

              <div className="absolute right-4 bottom-3.5 flex items-center justify-between">
                <p className="flex-1 text-right text-xs">
                  <span className="text-custom-status-notice">{field.value.trim().length}</span>/
                  {MAX_LENGTH.content}
                </p>
              </div>
            </FormItem>
          )}
        />

        <div className="border-custom-gray-100 flex h-13 w-full items-center justify-end gap-4 rounded-b-lg border-x border-b px-4">
          <FormField
            control={form.control}
            name="secret"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <button
                    type="button"
                    onClick={() => field.onChange(!field.value)}
                    className="text-custom-brand-primary flex cursor-pointer items-center gap-0.5 text-sm font-medium"
                  >
                    <span>{field.value ? <RadioCheckedIcon /> : <RadioUnCheckedIcon />}</span>
                    비밀댓글
                  </button>
                </FormControl>
              </FormItem>
            )}
          />

          <button
            type="submit"
            className="bg-custom-brand-primary text-custom-background h-10 w-35 cursor-pointer rounded-full text-sm font-medium"
          >
            등록
          </button>
        </div>
      </form>
    </Form>
  );
}
