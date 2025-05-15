'use client';

import { useState } from 'react';

import { useProductComments } from '@/lib/queries/useCommentsQueries';
import { useUserSummary } from '@/lib/queries/useUserQueries';
import { formatOverThousand } from '@/utils/formatNumber';

import CommentCreateForm from './CommentCreateForm';
import CommentItem from './CommentItem';
import PageNavigator from './PageNavigator';

const LIMIT = 3;

interface CommentSectionProps {
  productId: number;
  isOwner: boolean;
}

export default function CommentSection({ productId, isOwner }: CommentSectionProps) {
  const [currentPage, setCurrentPage] = useState(1);

  const { data: commentsData, isLoading } = useProductComments(productId, {
    page: currentPage,
    limit: LIMIT,
  });

  const { data: userData } = useUserSummary();

  if (!commentsData || isLoading) return null;

  const user = userData?.result ?? null;

  const totalCount = commentsData.result.meta.totalItems;
  const comments = commentsData.result.comments;

  return (
    <div className="mt-15">
      <h3 className="text-custom-brand-primary border-custom-gray-100 border-b pb-2.5 text-sm font-semibold">
        작품 댓글 및 문의
        <span className="ml-1.5">{`(${formatOverThousand(commentsData.result.totalComments)})`}</span>
      </h3>

      {comments.map((comment) => {
        const { replies, ...rootComment } = comment;

        const canViewSecret = Boolean(user) && (rootComment.user.id === user?.id || isOwner);

        return (
          <div key={rootComment.id}>
            <CommentItem
              type="root"
              comment={rootComment}
              productId={productId}
              canViewSecret={canViewSecret}
              isMyComment={Boolean(user) && rootComment.user.id === user?.id}
            />
            {replies?.map((reply) => (
              <CommentItem
                key={reply.id}
                type="reply"
                comment={reply}
                productId={productId}
                canViewSecret={canViewSecret}
                isMyComment={Boolean(user) && reply.user.id === user?.id}
              />
            ))}
          </div>
        );
      })}

      {totalCount > 0 && (
        <PageNavigator
          currentPage={currentPage}
          totalPage={Math.ceil(totalCount / LIMIT)}
          onPageChange={setCurrentPage}
        />
      )}

      <CommentCreateForm user={user} productId={productId} />
    </div>
  );
}
