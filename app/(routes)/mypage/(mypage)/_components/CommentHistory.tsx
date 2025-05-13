import Link from 'next/link';

import ProfileImage from '@/app/_components/shared/ProfileImage';
import { ROUTE_PATHS } from '@/constants';
import { CommentHistoryGroup } from '@/lib/apis/comments.type';
import { ArrowTopRightIcon } from '@/lib/icons';
import { formatRelativeTimeFromNow } from '@/utils/date';
import { formatNumberWithComma } from '@/utils/formatNumber';

interface CommentHistoryProps {
  commentHistory: CommentHistoryGroup;
}

export default function CommentHistory({ commentHistory }: CommentHistoryProps) {
  const { item: product, myComment: comment, replyComment: reply } = commentHistory;

  return (
    <div className="border-custom-gray-100 flex items-start gap-5.5 border-b pt-9.5 pb-11">
      <div className="w-32.5">
        <div className="bg-custom-gray-100 h-16 w-16 rounded-lg" />
        <p className="mt-5 leading-0">
          <Link
            href={ROUTE_PATHS.ARTIST(String(product.artist.id))}
            className="text-custom-gray-200 truncate overflow-hidden text-xs font-semibold whitespace-nowrap underline-offset-2 hover:underline"
          >
            {product.artist.nickname}
          </Link>
        </p>
        <h4 className="mt-0.5 leading-0">
          <Link
            href={ROUTE_PATHS.PRODUCT_DETAIL(String(product.id))}
            className="text-custom-brand-primary truncate overflow-hidden text-sm font-semibold whitespace-nowrap underline-offset-2 hover:underline"
          >
            {product.title}
          </Link>
        </h4>
        <p className="text-custom-brand-primary mt-1.5 text-sm font-semibold">
          {product.price ? `${formatNumberWithComma(product.price)}원` : '구매시 문의'}
        </p>
      </div>

      <div className="bg-custom-ivory-50 flex-1 rounded-lg py-4 pr-5 pl-3">
        <div>
          <div className="flex items-center">
            <ProfileImage src={comment.user.profileImgUrl ?? null} className="h-6 w-6" />
            <div className="text-custom-brand-primary ml-1.5 font-medium">
              {comment.user.nickname}
            </div>
            <div className="text-custom-brand-primary ml-2.5 text-sm font-light">
              {formatRelativeTimeFromNow(comment.createdAt)}
            </div>
          </div>

          <p className="mt-3 ml-7.5 line-clamp-2 text-sm whitespace-pre-line">{comment.content}</p>
        </div>

        {reply && (
          <div className="border-custom-gray-100 mt-3.5 line-clamp-2 flex gap-2.5 border-t pt-5.5">
            <ArrowTopRightIcon />

            <div className="flex-1">
              <div className="flex items-center">
                <ProfileImage src={reply.user.profileImgUrl ?? null} className="h-6 w-6" />
                <div className="text-custom-brand-primary ml-1.5 font-medium">
                  {reply.user.nickname}
                </div>
                <div className="text-custom-brand-primary ml-2.5 text-sm font-light">
                  {formatRelativeTimeFromNow(reply.createdAt)}
                </div>
              </div>

              <p className="mt-3 ml-7.5 line-clamp-2 text-sm whitespace-pre-line">
                {reply.content}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
