'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { AllowAritist, DisallowAritist } from '@/lib/apis/admin.api';
import { QUERY_KEYS } from '@/lib/queries/queryKeys';
import toast from '@/lib/toast';

interface AllowAndDisallowProps {
  userId: number;
  applyedId: number;
}

export default function AllowAndDisallow({ userId, applyedId }: AllowAndDisallowProps) {
  const queryClient = useQueryClient();

  const allowMutation = useMutation({
    mutationFn: () => AllowAritist(userId, applyedId),
    onSuccess: () => {
      toast.default('승인 되었습니다*새로고침 해주세요!');
      queryClient.invalidateQueries({
        predicate: (query) => query.queryKey[0] === QUERY_KEYS.products.all[0],
      });
    },
  });
  const disallowMutation = useMutation({
    mutationFn: () => DisallowAritist(userId, applyedId),
    onSuccess: () => {
      toast.default('반려 되었습니다*새로고침 해주세요!');
      queryClient.invalidateQueries({
        predicate: (query) => query.queryKey[0] === QUERY_KEYS.products.all[0],
      });
    },
  });
  return (
    <div className="flex flex-col p-2">
      <button
        onClick={() => allowMutation.mutate()}
        disabled={allowMutation.isPending}
        className="hover:text-custom-background hover:bg-custom-brand-primary border-custom-gray-100 text-custom-brand-primary bg-custom-background flex-1/2 cursor-pointer rounded-4xl border-[1px] p-1 text-[14px] hover:cursor-pointer"
      >
        승인
      </button>
      <button
        onClick={() => disallowMutation.mutate()}
        disabled={disallowMutation.isPending}
        className="hover:text-custom-background hover:bg-custom-brand-primary border-custom-gray-100 text-custom-brand-primary bg-custom-background flex-1/2 cursor-pointer rounded-4xl border-[1px] p-1 text-[14px] hover:cursor-pointer"
      >
        반려
      </button>
    </div>
  );
}
