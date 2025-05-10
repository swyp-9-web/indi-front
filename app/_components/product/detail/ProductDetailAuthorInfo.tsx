import { useState } from 'react';

import Image from 'next/image';

// import { useFollowToggle } from '@/hooks/useFollowToggle';
import { ArrowNextIcon } from '@/lib/icons/index';
import { AddIcon } from '@/lib/icons/index';

interface ProductDetailAuthorInfoProps {
  AuthorSrc: string;
  AuthorName: string;
  AuthorDescription: string;
  // hasFollow: boolean;
  // artistId: number;
}

export default function ProductDetailAuthorInfo({
  AuthorSrc,
  AuthorName,
  AuthorDescription,
  // hasFollow,
  // artistId,
}: ProductDetailAuthorInfoProps) {
  // const { isFollowing, toggleIsFollowing } = useFollowToggle(artistId, hasFollow);
  return (
    <div className="border-custom-gray-100 flex w-full flex-col gap-2.5 rounded-[8px] border-[1px] p-5">
      <div className="flex justify-between">
        <div className="flex items-center gap-2.5">
          <Image src={AuthorSrc} alt="AuthorImage" width={36} height={36} className="rounded-4xl" />
          <div className="text-custom-brand-primary flex items-center gap-[3px] text-[20px] font-semibold">
            {AuthorName}
            <ArrowNextIcon className="h-4 w-4" />
          </div>
        </div>

        <button className="text-custom-brand-primary border-custom-gray-100 flex items-center gap-1.5 rounded-4xl border-[1px] px-[15px] py-[7px] text-[14px] hover:cursor-pointer">
          {/* {isFollowing ? (
            '언팔로우'
          ) : ( */}
          <>
            <AddIcon />
            팔로우
          </>
          {/* )} */}
        </button>
      </div>

      <div className="text-custom-brand-primary w-full text-[12px]">{AuthorDescription}</div>
    </div>
  );
}
