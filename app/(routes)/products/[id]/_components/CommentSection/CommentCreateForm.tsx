import { useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';

import ProfileImage from '@/app/_components/shared/ProfileImage';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { useRequireAuth } from '@/hooks/useRequireAuth';
import { UserSummary } from '@/lib/apis/user.type';
import { RadioCheckedIcon, RadioUnCheckedIcon } from '@/lib/icons';
import { useCreateProductComment } from '@/lib/queries/useCommentsQueries';
import { commentFormSchema, FormValues, MAX_LENGTH } from '@/lib/schemas/commentForm.schema';
import toast from '@/lib/toast';
import { cn } from '@/lib/utils';

interface CommentCreateFormProps {
  user: UserSummary | null;
  productId: number;
  mode?: 'root' | 'reply';
  rootCommentId?: number | null;
}

export default function CommentCreateForm({
  user,
  productId,
  mode = 'root',
  rootCommentId = null,
}: CommentCreateFormProps) {
  const form = useForm<FormValues>({
    resolver: zodResolver(commentFormSchema),
    defaultValues: {
      content: '',
      secret: false,
    },
  });

  const { mutate } = useCreateProductComment(productId);
  const { checkAuth } = useRequireAuth();

  const handleSubmit = (formValues: FormValues) => {
    if (mode === 'reply' && !rootCommentId) {
      console.error(
        'CommentCreateForm: reply mode인 경우 반드시 rootCommentId를 prop으로 전달해주세요'
      );
    }

    checkAuth(() => {
      mutate(
        {
          productId,
          content: formValues.content,
          secret: formValues.secret,
          rootCommentId,
        },
        { onError: () => toast.error('잠시 후 다시 시도해주세요') }
      );

      form.reset();
    });
  };

  return (
    <Form {...form}>
      <form
        className={cn('mt-7.5', mode === 'reply' && 'mt-4')}
        onSubmit={form.handleSubmit(handleSubmit)}
      >
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
                  className={cn(
                    'aria-invalid:border-input aria-invalid:focus-visible:ring-ring/50 placeholder:text-custom-gray-200 text-custom-gray-900 focus:!border-custom-gray-100 h-53 resize-none rounded-t-lg rounded-b-none px-4 pt-12 pb-13.5 font-medium shadow-none placeholder:text-sm placeholder:font-medium focus-visible:ring-0',
                    mode === 'reply' && 'h-45 rounded-lg'
                  )}
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

        <div
          className={cn(
            'border-custom-gray-100 flex h-13 w-full items-center justify-end gap-4 rounded-b-lg border-x border-b px-4',
            mode === 'reply' && 'rounded-none border-r-0 border-l-0'
          )}
        >
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
            {mode === 'root' ? '등록' : '답글하기'}
          </button>
        </div>
      </form>
    </Form>
  );
}
