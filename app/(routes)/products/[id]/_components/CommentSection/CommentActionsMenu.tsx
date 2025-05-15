import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Comment } from '@/lib/apis/comments.type';
import { MenuVerbIcon } from '@/lib/icons';
import { useDeleteProductComment } from '@/lib/queries/useCommentsQueries';
import toast from '@/lib/toast';

interface CommentActionsMenuProps {
  productId: number;
  comment: Comment;
  onSelectEditMode: () => void;
}

export default function CommentActionsMenu({
  productId,
  comment,
  onSelectEditMode,
}: CommentActionsMenuProps) {
  const { mutate: deleteComment } = useDeleteProductComment(productId);

  const handleSelectEdit = () => {
    onSelectEditMode();
  };

  const handleSelectDelete = () => {
    deleteComment(comment.id, {
      onSuccess: () => toast.default('댓글을 삭제하였습니다'),
      onError: () => toast.error('잠시 후에 다시 시도해주세요'),
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="cursor-pointer">
        <MenuVerbIcon />
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="min-w-none border-custom-gray-100 w-14 rounded-lg border p-0"
      >
        <DropdownMenuItem
          onSelect={handleSelectEdit}
          className="border-custom-gray-100 text-custom-brand-primary flex h-7 cursor-pointer items-center justify-center rounded-none border-b text-sm font-medium"
        >
          수정
        </DropdownMenuItem>
        <DropdownMenuItem
          onSelect={handleSelectDelete}
          className="text-custom-brand-primary flex h-7 cursor-pointer items-center justify-center rounded-none text-sm font-medium"
        >
          삭제
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
