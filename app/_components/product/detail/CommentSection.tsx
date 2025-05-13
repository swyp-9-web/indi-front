import Image from 'next/image';

import { formatOverThousand } from '@/utils/formatNumber';

import ProfileImage from '../../shared/ProfileImage';

interface CommentSectionProps {
  commentCount: number;
}

export default function CommentSection({ commentCount }: CommentSectionProps) {
  return (
    <div className="mt-[3.75rem] flex flex-col">
      <div className="text-custom-brand-primary mb-2.5 text-[14px]">
        작품 댓글 및 문의 {formatOverThousand(commentCount)}
      </div>

      <div className="border-custom-gray-100 mb-[30px] w-full border-[1px]" />

      <div className="items-center> flex gap-1.5">
        <ProfileImage src={null} />
      </div>
    </div>
  );
}
