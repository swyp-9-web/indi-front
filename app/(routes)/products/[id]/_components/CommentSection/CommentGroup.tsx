import { useEffect, useState } from 'react';

import { useRequireAuth } from '@/hooks/useRequireAuth';
import { Comment, RootComment } from '@/lib/apis/comments.type';
import { UserSummary } from '@/lib/apis/user.type';

import CommentItem from './CommentItem';

interface CommentGroupProps {
  comment: RootComment;
  user: UserSummary | null;
  isOwner: boolean;
  productId: number;
}

export default function CommentGroup({ comment, user, isOwner, productId }: CommentGroupProps) {
  const [isReplyFormOpen, setIsReplyFormOpen] = useState(false);
  const { replies, ...rootComment } = comment;

  const { checkAuth } = useRequireAuth();

  const canViewSecret = Boolean(user) && (rootComment.user.id === user?.id || isOwner);

  const handleReplyButtonClick = () => {
    checkAuth(() => setIsReplyFormOpen(true));
  };

  // 로그아웃 시 답글 Form 사라짐
  useEffect(() => {
    if (!user) setIsReplyFormOpen(false);
  }, [user]);

  return (
    <div key={rootComment.id}>
      <CommentItem
        type="root"
        comment={rootComment}
        productId={productId}
        canViewSecret={canViewSecret}
        isMyComment={Boolean(user) && rootComment.user.id === user?.id}
        isReplyButtonVisible={!replies || replies.length === 0}
        onReplyButtonClick={handleReplyButtonClick}
      />

      {replies?.map((reply: Comment, idx) => (
        <CommentItem
          key={reply.id}
          type="reply"
          comment={reply}
          productId={productId}
          canViewSecret={canViewSecret}
          isMyComment={Boolean(user) && reply.user.id === user?.id}
          isReplyButtonVisible={idx === replies.length - 1}
          onReplyButtonClick={handleReplyButtonClick}
        />
      ))}

      {isReplyFormOpen && <div>열림</div>}
    </div>
  );
}
