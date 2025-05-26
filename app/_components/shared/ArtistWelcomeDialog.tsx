'use client';

import Image from 'next/image';

import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { useArtistWelcomeDialog } from '@/stores/useArtistWelcomeDialog';

export default function ArtistWelcomeDialog() {
  const { isOpen, toggleIsOpen, onCloseCallback } = useArtistWelcomeDialog();

  return (
    <Dialog open={isOpen} onOpenChange={toggleIsOpen}>
      <DialogContent className="h-152.5 w-100 gap-0 rounded-lg p-7.5">
        <DialogTitle className="hidden">작가가 되신 것을 축하드립니다</DialogTitle>

        <div>
          <Image
            src="/dialog/pop.png"
            alt="작가 환영 아이콘"
            width={116}
            height={116}
            className="mx-auto mt-26.5 mb-17"
          />

          <h3 className="text-custom-brand-primary text-center text-4xl leading-12 font-bold">
            작가가 되신 것을
            <br />
            축하드립니다
          </h3>
          <p className="text-custom-brand-primary mt-3.5 text-center text-sm">
            아르테고에서의 활발한 활동을 기대합니다!
          </p>
        </div>

        <div className="flex h-full items-end justify-center">
          <button
            onClick={() => onCloseCallback()}
            className="bg-custom-brand-secondary text-custom-gray-900 flex h-12 w-72 cursor-pointer items-center justify-center rounded-full text-sm font-medium"
          >
            돌아가기
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
