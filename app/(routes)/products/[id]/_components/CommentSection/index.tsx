'use client';

import { useState } from 'react';

import { formatOverThousand } from '@/utils/formatNumber';

import CommentItem from './CommentItem';
import PageNavigator from './PageNavigator';
import PrivateCommentItem from './PrivateCommentItem';

export default function CommentSection() {
  const [currentPage, setCurrentPage] = useState(1);
  const totalCount = 13;

  return (
    <div className="mt-15">
      <h3 className="text-custom-brand-primary border-custom-gray-100 border-b pb-2.5 text-sm font-semibold">
        작품 댓글 및 문의<span className="ml-1.5">{`(${formatOverThousand(totalCount)})`}</span>
      </h3>

      <CommentItem refId={23} type="root" />
      <CommentItem refId={23} type="reply" />
      <CommentItem refId={23} type="reply" isReplyButtonVisible />

      <PrivateCommentItem refId={24} type="root" />
      <PrivateCommentItem refId={24} type="reply" />

      {totalCount !== 0 && (
        <PageNavigator
          currentPage={currentPage}
          totalPage={Math.ceil(totalCount / 5)}
          onPageChange={setCurrentPage}
        />
      )}
    </div>
  );
}
