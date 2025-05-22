'use client';

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogOverlay,
  DialogTitle,
  DialogTrigger,
} from '@radix-ui/react-dialog';

import { Button } from '@/components/ui/button';
import { DialogFooter, DialogHeader } from '@/components/ui/dialog';
import { ArtistApplies } from '@/lib/apis/admin.type';
import { CloseIcon } from '@/lib/icons';

import AllowAndDisallow from './AllowAndDisallow';
import Status from './Status';

interface ViewDetailsProps {
  detail: ArtistApplies;
}

export default function ViewDetails({ detail }: ViewDetailsProps) {
  return (
    <div className="flex items-center justify-center">
      <Dialog>
        <DialogTrigger asChild>
          <Button className="text-custom-brand-primary hover:bg-custom-brand-primary hover:text-custom-background h-auto border-[1px] bg-transparent p-0 px-1 py-0.5 shadow-none hover:cursor-pointer">
            상세보기
          </Button>
        </DialogTrigger>
        <DialogOverlay className="bg-custom-brand-primary/50 fixed inset-0 z-40" />
        <DialogContent className="bg-custom-background fixed top-1/2 left-1/2 z-50 flex h-150 w-200 -translate-x-1/2 -translate-y-1/2 flex-col overflow-auto rounded-xl border p-7.5">
          <DialogHeader className="mx-auto h-full w-full overflow-auto">
            <DialogTitle className="text-custom-brand-primary flex justify-center text-2xl font-bold">
              {detail.id}번 상세보기{' '}
            </DialogTitle>
            <DialogDescription asChild>
              <div className="flex w-full flex-col space-y-4">
                <div>
                  <Status status={detail.status} rejCount={detail.rejectedCount} />
                </div>
                <div className="flex">
                  <span className="w-24 font-semibold">유저</span>
                  <span>
                    {detail.user.name} ({detail.user.nickname}) - {detail.user.id}
                  </span>
                </div>

                <div className="flex">
                  <span className="w-24 font-semibold">이메일</span>
                  <span>{detail.email}</span>
                </div>

                <div className="flex flex-col">
                  <span className="w-24 font-semibold">SNS 링크</span>
                  <span>
                    {detail.snsLink ? (
                      <a
                        href={detail.snsLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 underline"
                      >
                        {detail.snsLink}
                      </a>
                    ) : (
                      '—'
                    )}
                  </span>
                </div>
                {/* 신청 날짜 */}
                <div className="flex">
                  <span className="w-24 font-semibold">신청 날짜</span>
                  <span>
                    {new Date(detail.createdAt).toLocaleString('ko-KR', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </span>
                </div>
                {/* 작가 소개 */}
                <div className="flex flex-col">
                  <span className="w-24 font-semibold">작가 소개</span>
                  <span className="whitespace-pre-wrap">{detail.artistAboutMe}</span>
                  agndsklgdglsmdgklsadmglksadmglksadg;masl;dgmsadlgmas;lkdgmaslkgmaslk;dgmsaldgmk
                  agndsklgdglsmdgklsadmglksadmglksadg;masl;dgmsadlgmas;lkdgmaslkgmaslk;dgmsaldgmk
                  agndsklgdglsmdgklsadmglksadmglksadg;masl;dgmsadlgmas;lkdgmaslkgmaslk;dgmsaldgmk
                  agndsklgdglsmdgklsadmglksadmglksadg;masl;dgmsadlgmas;lkdgmaslkgmaslk;dgmsaldgmk
                  agndsklgdglsmdgklsadmglksadmglksadg;masl;dgmsadlgmas;lkdgmaslkgmaslk;dgmsaldgmk
                  agndsklgdglsmdgklsadmglksadmglksadg;masl;dgmsadlgmas;lkdgmaslkgmaslk;dgmsaldgmk
                  agndsklgdglsmdgklsadmglksadmglksadg;masl;dgmsadlgmas;lkdgmaslkgmaslk;dgmsaldgmk
                </div>
              </div>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild>
              <Button className="hover:bg-custom-brand-primary hover:text-custom-background text-custom-brand-primary border-custom-gray-100 fixed top-2.5 right-2.5 flex items-center justify-center rounded-2xl border-[1px] bg-transparent px-17.5 py-3.5 hover:cursor-pointer">
                <CloseIcon />
              </Button>
            </DialogClose>
            <div className="w-full">
              <AllowAndDisallow userId={detail.user.id} applyedId={detail.id} />
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
