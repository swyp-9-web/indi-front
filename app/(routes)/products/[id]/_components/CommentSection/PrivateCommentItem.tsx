import { ArrowTopRightIcon } from '@/lib/icons';

interface PrivateCommentItemProps {
  refId: number;
  type: 'root' | 'reply';
}

export default function PrivateCommentItem({ refId, type }: PrivateCommentItemProps) {
  return (
    <div className="border-custom-gray-100 flex border-b py-4">
      {type === 'reply' && <ArrowTopRightIcon className="mr-1" />}

      <div className="flex-1 pt-0.5">
        <p className="text-custom-brand-primary text-sm">비밀 댓글입니다.</p>

        <div className="text-custom-gray-300 mb-0.5 text-xs">
          2025.04.27.<span className="ml-1.5">12.50</span>
        </div>
      </div>
    </div>
  );
}
