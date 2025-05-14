'use client';

import { useRouter } from 'next/navigation';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { Button } from '@/components/ui/button';
import { ROUTE_PATHS } from '@/constants/route-paths';
import { deleteProduct } from '@/lib/apis/products.api';
import { useUserSummary } from '@/lib/queries/useUserQueries';

interface PatchAndDeleteProps {
  itemId: number;
  isOwner: boolean;
}

export default function PatchAndDelete({ itemId, isOwner }: PatchAndDeleteProps) {
  const { data } = useUserSummary();

  const user = data?.result ?? null;

  const queryClient = useQueryClient();

  const router = useRouter();
  const deleteMutation = useMutation({
    mutationFn: () => deleteProduct(itemId),
    onSuccess: () => {
      router.push(ROUTE_PATHS.HOME);
      queryClient.invalidateQueries({ predicate: (query) => query.queryKey[0] === 'products' });
    },
  });

  return (
    <>
      {user && isOwner && (
        <div className="mb-2.5 flex gap-5">
          <Button className="text-custom-brand-primary h-auto bg-transparent p-0 shadow-none hover:cursor-pointer hover:bg-transparent hover:underline">
            작품 수정하기
          </Button>
          <Button
            onClick={() => deleteMutation.mutate()}
            disabled={deleteMutation.isPending}
            className="text-custom-brand-primary h-auto bg-transparent p-0 shadow-none hover:cursor-pointer hover:bg-transparent hover:underline"
          >
            {deleteMutation.isPending ? '삭제 중...' : '작품 삭제하기'}
          </Button>
        </div>
      )}
      {!user && <div className="mb-[38px]" />}
    </>
  );
}
