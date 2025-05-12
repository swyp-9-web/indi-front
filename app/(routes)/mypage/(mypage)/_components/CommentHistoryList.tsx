import Link from 'next/link';

import ProfileImage from '@/app/_components/shared/ProfileImage';
import { ArrowTopRightIcon } from '@/lib/icons';

export default function CommentHistoryList() {
  return (
    <div className="border-custom-gray-100 border-t">
      <CommentHistory />
      <CommentHistory />
      <CommentHistory />
      <CommentHistory />
      <CommentHistory />

      <button className="border-custom-gray-100 mx-auto mt-17 flex h-11.5 w-46 cursor-pointer items-center justify-center rounded-full border text-sm font-medium">
        더보기
      </button>
    </div>
  );
}

function CommentHistory() {
  return (
    <div className="border-custom-gray-100 flex items-start gap-5.5 border-b pt-9.5 pb-11">
      <div className="w-32.5">
        <div className="bg-custom-gray-100 h-16 w-16 rounded-lg" />
        <p className="mt-5 leading-0">
          <Link
            href="#"
            className="text-custom-gray-200 truncate overflow-hidden text-xs font-semibold whitespace-nowrap underline-offset-2 hover:underline"
          >
            작가이름
          </Link>
        </p>
        <h4 className="mt-0.5 leading-0">
          <Link
            href="#"
            className="text-custom-brand-primary truncate overflow-hidden text-sm font-semibold whitespace-nowrap underline-offset-2 hover:underline"
          >
            작품명
          </Link>
        </h4>
        <p className="text-custom-brand-primary mt-1.5 text-sm font-semibold">89,000원</p>
      </div>

      <div className="bg-custom-ivory-50 flex-1 rounded-lg py-4 pr-5 pl-3">
        <div>
          <div className="flex items-center">
            <ProfileImage src={null} className="h-6 w-6" />
            <div className="text-custom-brand-primary ml-1.5 font-medium">유저명</div>
            <div className="text-custom-brand-primary ml-2.5 text-sm font-light">
              댓글 작성 일시
            </div>
          </div>

          <p className="mt-3 ml-7.5 line-clamp-2 text-sm whitespace-pre-line">
            문의내용 최대 300자 문의내용 최대 300자 문의내용 최대 300자 문의내용 최대 300자 문의내용
            최대 300자 문의내용 최대 300자 문의내용 최대 300자 문의내용 최대 300자 문의내용 최대
            문의내용 최대 300자 문의내용 최대 300자 문의내용 최대 300자 문의내용 최대 300자 문의내용
            최대 300자 문의내용 최대 300자 문의내용 최대 300자 문의내용 최대 300자 문의내용 최대
          </p>
        </div>

        <div className="border-custom-gray-100 mt-3.5 line-clamp-2 flex gap-2.5 border-t pt-5.5">
          <ArrowTopRightIcon />

          <div className="flex-1">
            <div className="flex items-center">
              <ProfileImage src={null} className="h-6 w-6" />
              <div className="text-custom-brand-primary ml-1.5 font-medium">작가A</div>
              <div className="text-custom-brand-primary ml-2.5 text-sm font-light">
                댓글 작성 일시
              </div>
            </div>

            <p className="mt-3 ml-7.5 line-clamp-2 text-sm whitespace-pre-line">
              문의내용 최대 300자 문의내용 최대 300자 문의내용 최대 300자 문의내용 최대 300자
              문의내용 최대 300자 문의내용 최대 300자 문의내용 최대 300자 문의내용 최대 300자
              문의내용 최대 300자 문의내용 최대 300자 문의내용 최대 300자 문의내용 최대 300자
              문의내용 최대 300자 문의내용 최대 300자 문의내용 최대 300자 문의내용 최대 300자
              문의내용 최대 300자 문의내용 최대 300자 문의내용 최대 300자 문의내용 최대 300자
              문의내용 최대 300자 문의내용 최대
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
