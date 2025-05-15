import { useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';

import ProfileImage from '@/app/_components/shared/ProfileImage';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { useRequireAuth } from '@/hooks/useRequireAuth';
import { Comment } from '@/lib/apis/comments.type';
import { useEditProductComment } from '@/lib/queries/useCommentsQueries';
import { useUserSummary } from '@/lib/queries/useUserQueries';
import { commentFormSchema, FormValues, MAX_LENGTH } from '@/lib/schemas/commentForm.schema';
import toast from '@/lib/toast';

interface CommentEditFormProps {
  productId: number;
  comment: Comment;
  onEditSuccess: () => void;
}

export default function CommentEditForm({
  productId,
  comment,
  onEditSuccess,
}: CommentEditFormProps) {
  const form = useForm<FormValues>({
    resolver: zodResolver(commentFormSchema),
    defaultValues: {
      content: comment.content,
      secret: comment.isSecret,
    },
  });

  const { data: userData } = useUserSummary();
  const user = userData?.result ?? null;

  const { mutate } = useEditProductComment(productId);
  const { checkAuth } = useRequireAuth();

  const handleSubmit = (formValues: FormValues) => {
    checkAuth(() => {
      mutate(
        { commentId: comment.id, content: formValues.content, secret: formValues.secret },
        {
          onSuccess: () => {
            toast.default('댓글을 수정하였습니다');
            onEditSuccess();
          },
          onError: () => toast.error('잠시 후에 다시 시도해주세요'),
        }
      );
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="w-full">
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem className="relative block">
              <div className="absolute top-4 left-4 flex items-center gap-1.5">
                <ProfileImage src={user?.profileImgUrl ?? null} className="h-6 w-6" />
                <div className="text-custom-brand-primary text-sm font-semibold">
                  {user ? user.nickname : ''}
                </div>
              </div>

              <FormControl>
                <Textarea
                  className="aria-invalid:border-input aria-invalid:focus-visible:ring-ring/50 placeholder:text-custom-gray-200 text-custom-gray-900 focus:!border-custom-gray-100 h-45 resize-none rounded-lg px-4 pt-12 pb-13.5 font-medium shadow-none placeholder:text-sm placeholder:font-medium focus-visible:ring-0"
                  placeholder="댓글을 수정해주세요."
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

        <div className="flex h-13 w-full items-center justify-end gap-4 px-4">
          <button
            type="submit"
            className="bg-custom-brand-primary text-custom-background h-10 w-35 cursor-pointer rounded-full text-sm font-medium"
          >
            수정하기
          </button>
        </div>
      </form>
    </Form>
  );
}
