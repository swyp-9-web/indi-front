import { useState } from 'react';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

// TODO: 탈퇴 API 연동
export default function DeleteAccountDialog() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={() => setIsOpen((prev) => !prev)}>
      <DialogTrigger asChild>
        <button className="border-custom-gray-100 text-custom-status-negative flex h-12 w-full cursor-pointer items-center justify-center rounded-lg border text-sm font-medium">
          회원 탈퇴
        </button>
      </DialogTrigger>
      <DialogContent className="flex h-172.5 w-115 flex-col gap-13.5 p-7.5">
        <DialogHeader className="gap-0">
          <DialogTitle className="text-custom-brand-primary text-2xl font-bold">
            회원 탈퇴
          </DialogTitle>
          <DialogDescription className="text-custom-brand-primary mt-10.5 text-center text-2xl font-bold">
            정말 아르테고의 계정을 삭제할건가요?
          </DialogDescription>
        </DialogHeader>

        <div className="flex-1">
          <p className="text-custom-brand-primary mb-6 text-center font-semibold">
            회원 탈퇴 신청 전 아래 사항을 확인 부탁드립니다.
          </p>
          <ol className="flex flex-col gap-3">
            {[
              '회원 탈퇴 시 Artego 프로필과 관련된 모든 콘텐츠 및 데이터가 제거됩니다.',
              '회원 탈퇴 시 작가님과 고객님의 스크랩한 작품들과 팔로잉한 작가는 데이터가 없어집니다.',
              '탈퇴 후 작가님들의 작품은 복원이 어려우니 신중히 생각해 주시길 바랍니다.',
              '탈퇴 후 커뮤니티 작품의 작가님과 고객님의 게시물과 댓글은 삭제 처리가 불가합니다.',
            ].map((item, idx) => (
              <li key={idx} className="flex items-start justify-center gap-1">
                <span>{idx + 1}.</span>
                <p>{item}</p>
              </li>
            ))}
          </ol>
        </div>

        <DialogFooter>
          <button
            onClick={() => setIsOpen((prev) => !prev)}
            className="bg-custom-brand-primary text-custom-gray-100 h-12 w-full cursor-pointer rounded-full text-sm font-medium"
          >
            탈퇴하기
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
