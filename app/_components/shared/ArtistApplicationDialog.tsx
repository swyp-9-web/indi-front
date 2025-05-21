'use client';

import { useEffect, useRef, useState } from 'react';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { CheckCircleIcon } from '@/lib/icons';

interface ArtistApplicationDialogProps {
  trigger?: React.ReactElement<HTMLButtonElement>;
}

export default function ArtistApplicationDialog({ trigger }: ArtistApplicationDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const dialogContentRef = useRef<HTMLDivElement | null>(null);

  // transition duration 동안 isComplete가 바뀌지 않도록 해서, 일시적으로 form이 보이는 현상을 방지
  useEffect(() => {
    if (!isOpen && dialogContentRef.current) {
      const durationMs =
        parseFloat(window.getComputedStyle(dialogContentRef.current).transitionDuration) * 1000;

      const timer = setTimeout(() => {
        setIsCompleted(false);
      }, durationMs);

      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const handleSubmit = () => {
    setIsCompleted(true);
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={() => setIsOpen((prev) => !prev)}>
        {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}

        {!isCompleted ? (
          <DialogContent ref={dialogContentRef} className="w-145 gap-0 sm:max-w-none">
            <DialogHeader>
              <DialogTitle className="text-custom-brand-primary text-2xl font-bold">
                작가 신청하기
              </DialogTitle>
              <DialogDescription className="text-custom-brand-primary mt-14 flex flex-col gap-1.5 text-center text-4xl leading-13 font-bold">
                여러분의 작가 신청을
                <br />
                환영합니다!
                <span className="text-sm font-normal">
                  3가지 질문에 답해주시고 신청하기를 누르세요.
                </span>
              </DialogDescription>
            </DialogHeader>

            <form className="mt-15.5 mb-10"></form>

            <button
              type="submit"
              onClick={handleSubmit}
              className="bg-custom-brand-secondary text-custom-gray-900 mx-auto flex h-12 w-49.5 cursor-pointer items-center justify-center rounded-full text-sm"
            >
              신청하기
            </button>
          </DialogContent>
        ) : (
          <DialogContent ref={dialogContentRef} className="w-100 gap-0">
            <DialogHeader className="mb-16">
              <DialogTitle className="text-custom-brand-primary text-2xl font-bold">
                작가 신청
              </DialogTitle>
              <DialogDescription className="text-custom-brand-primary mt-14 text-center text-4xl leading-13 font-bold">
                <CheckCircleIcon className="mx-auto mb-6.5" />
                <span>
                  신청이
                  <br />
                  완료되었습니다!
                </span>
              </DialogDescription>
            </DialogHeader>

            <button
              type="button"
              onClick={() => setIsOpen((prev) => !prev)}
              className="bg-custom-brand-secondary text-custom-gray-900 mx-auto flex h-12 w-72 cursor-pointer items-center justify-center rounded-full text-sm"
            >
              확인
            </button>
          </DialogContent>
        )}
      </Dialog>
    </>
  );
}
