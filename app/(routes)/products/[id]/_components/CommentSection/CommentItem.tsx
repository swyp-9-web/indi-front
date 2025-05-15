import { useState } from 'react';

import ProfileImage from '@/app/_components/shared/ProfileImage';
import { Comment } from '@/lib/apis/comments.type';
import { ArrowForwardIcon, ArrowTopRightIcon } from '@/lib/icons';
import { cn } from '@/lib/utils';
import { formatDateToYMD, formatTimeToHourMinute } from '@/utils/date';

import CommentActionsMenu from './CommentActionsMenu';
import CommentEditForm from './CommentEditForm';
import PrivateCommentItem from './PrivateCommentItem';

interface CommentItemProps {
  type: 'root' | 'reply';
  comment: Comment;
  productId: number;
  canViewSecret: boolean;
  isMyComment: boolean;
  isReplyButtonVisible: boolean;
  onReplyButtonClick: () => void;
}

export default function CommentItem({
  type,
  comment,
  productId,
  canViewSecret,
  isMyComment,
  isReplyButtonVisible,
  onReplyButtonClick,
}: CommentItemProps) {
  const [showExpandButton, setShowExpandButton] = useState(false);
  const [isContentExpanded, setIsContentExpanded] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);

  const contentRefCallback = (node: HTMLDivElement | null) => {
    if (node) {
      const isClamped = node.scrollHeight > node.clientHeight;

      setShowExpandButton(isClamped);
    }
  };

  if (comment.isSecret && !canViewSecret)
    return <PrivateCommentItem type={type} comment={comment} />;

  return (
    <div
      className={cn(
        'border-custom-gray-100 flex border-b py-4',
        type === 'root' ? 'pt-7.5' : 'pr-8.5',
        isEditMode && 'pb-0'
      )}
    >
      {type === 'reply' && <ArrowTopRightIcon className="mr-1" />}

      {isEditMode ? (
        <CommentEditForm
          productId={productId}
          comment={comment}
          onEditSuccess={() => setIsEditMode(false)}
        />
      ) : (
        <div className="flex-1">
          <div className="mb-2 flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <ProfileImage src={comment.user.profileImgUrl ?? null} className="h-6 w-6" />
              <div className="text-sm font-semibold">{comment.user.nickname}</div>

              {comment.user.isOwner && (
                <div className="border-custom-gray-100 font-custom-brand-primary flex h-5.5 w-9.5 items-center justify-center rounded-full border text-xs">
                  작가
                </div>
              )}
            </div>

            {isMyComment && (
              <CommentActionsMenu
                productId={productId}
                comment={comment}
                onSelectEditMode={() => setIsEditMode(true)}
              />
            )}
          </div>

          <p
            className={cn(
              'text-custom-brand-primary text-sm whitespace-pre-line',
              !isContentExpanded && 'line-clamp-3'
            )}
            ref={contentRefCallback}
          >
            {comment.content}
          </p>

          {showExpandButton && !isContentExpanded && (
            <button
              onClick={() => setIsContentExpanded(true)}
              className="mt-2 flex cursor-pointer items-center gap-1"
            >
              <ArrowForwardIcon />
              <span className="text-custom-gray-300 text-xs font-semibold">더보기</span>
            </button>
          )}

          <div
            className={cn('text-custom-gray-300 text-xs', isContentExpanded ? 'mt-1.5' : 'mt-2.25')}
          >
            {formatDateToYMD(comment.createdAt)}
            <span className="ml-1.5">{formatTimeToHourMinute(comment.createdAt)}</span>
          </div>

          {isReplyButtonVisible && (
            <button
              onClick={onReplyButtonClick}
              className="border-custom-gray-100 font-custom-brand-primary mt-2.5 cursor-pointer rounded-lg border px-2 py-1 text-sm font-semibold"
            >
              답글
            </button>
          )}
        </div>
      )}
    </div>
  );
}
