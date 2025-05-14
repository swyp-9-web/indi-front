import { useState } from 'react';

import ProfileImage from '@/app/_components/shared/ProfileImage';
import { ArrowForwardIcon, ArrowTopRightIcon, MenuVerbIcon } from '@/lib/icons';
import { cn } from '@/lib/utils';

interface CommentItemProps {
  refId: number;
  type: 'root' | 'reply';
  isReplyButtonVisible?: boolean;
}

export default function CommentItem({
  refId,
  type,
  isReplyButtonVisible = false,
}: CommentItemProps) {
  const [showExpandButton, setShowExpandButton] = useState(false);
  const [isContentExpanded, setIsContentExpanded] = useState(false);

  const isMyComment = true;
  const isOwner = true;

  const contentRefCallback = (node: HTMLDivElement | null) => {
    if (node) {
      const isClamped = node.scrollHeight > node.clientHeight;

      setShowExpandButton(isClamped);
    }
  };

  return (
    <div
      className={cn(
        'border-custom-gray-100 flex border-b py-4',
        type === 'root' ? 'pt-7.5' : 'pr-8.5'
      )}
    >
      {type === 'reply' && <ArrowTopRightIcon className="mr-1" />}

      <div className="flex-1">
        <div className="mb-2 flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <ProfileImage src={null} className="h-6 w-6" />
            <div className="text-sm font-semibold">유저명</div>

            {isOwner && (
              <div className="border-custom-gray-100 font-custom-brand-primary flex h-5.5 w-9.5 items-center justify-center rounded-full border text-xs">
                작가
              </div>
            )}
          </div>

          {isMyComment && <MenuVerbIcon />}
        </div>

        <p
          className={cn(
            'text-custom-brand-primary text-sm whitespace-pre-line',
            !isContentExpanded && 'line-clamp-3'
          )}
          ref={contentRefCallback}
        >
          댓글 내용은 다음과 같습니다. 댓글 내용은 다음과 같습니다. 댓글 내용은 다음과 같댓글 내용은
          다음과 같습니다. 습니다. 댓글 내용은 다음과 같습니다. 댓글 내용은 다음과 같습니다. 댓글
          내용은 다음과 같습니다. 댓글 내용은 다음과 같습니다. 댓글 내용은 다음과 같습니다. 댓글
          내용은 다음과 같습니댓글 내용은 다음과 같습니다. 댓글 내용은 다음과 같습니다. 다. 댓글
          내용은 다음과 같습니다.댓댓글 내용은 다음과 같습니다. 댓글 내용은 다음과 같습니다. 댓글
          내용은 다음과 같습니다. 댓글 내용은 다음과 같습니다. 댓글 내용은 다음과 같습니다. 댓글
          내용은 다음과 같습니다. 댓글 내용은 다음과 같습니다. 댓글 내용은 다음과 같습니다. 글
          내용은 다음과 같습니다댓글 내용은 다음과 같습니다. 댓글 내용은 다음과 같습니다. 댓글
          내용은 다음과 같습니다. 댓글 내용은 다음과 같습니다. 댓글 내용은 다음과 같습니다. 댓글
          내용은 다음과 같습니다. 댓글 내용은 다음과 같습니다. 댓글 내용은 다음과 같습니다.
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
          2025.04.27.<span className="ml-1.5">12.50</span>
        </div>

        {isReplyButtonVisible && (
          <button className="border-custom-gray-100 font-custom-brand-primary mt-2.5 cursor-pointer rounded-lg border px-2 py-1 text-sm font-semibold">
            답글
          </button>
        )}
      </div>
    </div>
  );
}
