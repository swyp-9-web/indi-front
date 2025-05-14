import { Comment } from '@/lib/apis/comments.type';
import { ArrowTopRightIcon } from '@/lib/icons';
import { formatDateToYMD, formatTimeToHourMinute } from '@/utils/date';

interface PrivateCommentItemProps {
  type: 'root' | 'reply';
  comment: Comment;
}

export default function PrivateCommentItem({ type, comment }: PrivateCommentItemProps) {
  return (
    <div className="border-custom-gray-100 flex border-b py-4">
      {type === 'reply' && <ArrowTopRightIcon className="mr-1" />}

      <div className="flex-1 pt-0.5">
        <p className="text-custom-brand-primary text-sm">비밀 댓글입니다.</p>

        <div className="text-custom-gray-300 mb-0.5 text-xs">
          {formatDateToYMD(comment.createdAt)}
          <span className="ml-1.5">{formatTimeToHourMinute(comment.createdAt)}</span>
        </div>
      </div>
    </div>
  );
}
