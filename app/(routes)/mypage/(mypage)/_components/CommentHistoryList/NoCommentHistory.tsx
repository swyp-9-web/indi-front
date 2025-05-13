import { SmsIcon } from '@/lib/icons';

export default function NoCommentHistory() {
  return (
    <div className="mx-auto mt-50 flex flex-col items-center justify-center">
      <SmsIcon className="!h-20 !w-20" />
      <p className="text-2xl font-bold">아직 댓글이 없습니다.</p>
    </div>
  );
}
