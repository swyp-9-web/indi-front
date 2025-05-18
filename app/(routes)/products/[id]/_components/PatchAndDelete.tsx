'use client';

import { useRouter } from 'next/navigation';

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogOverlay,
  DialogTitle,
  DialogTrigger,
} from '@radix-ui/react-dialog';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { Button } from '@/components/ui/button';
import { DialogFooter, DialogHeader } from '@/components/ui/dialog';
import { ROUTE_PATHS } from '@/constants/route-paths';
import { useProductRegisterPage } from '@/hooks/useProductRegisterPage';
import { deleteProduct } from '@/lib/apis/products.api';
import { QUERY_KEYS } from '@/lib/queries/queryKeys';
import { useUserSummary } from '@/lib/queries/useUserQueries';

interface PatchAndDeleteProps {
  itemId: number;
  isOwner: boolean;
}

export default function PatchAndDelete({ itemId, isOwner }: PatchAndDeleteProps) {
  const enterRegisterPage = useProductRegisterPage();

  const { data } = useUserSummary();
  const user = data?.result ?? null;

  const queryClient = useQueryClient();

  const router = useRouter();
  const deleteMutation = useMutation({
    mutationFn: () => deleteProduct(itemId),
    onSuccess: () => {
      router.replace(ROUTE_PATHS.HOME);
      queryClient.invalidateQueries({
        predicate: (query) => query.queryKey[0] === QUERY_KEYS.products.all[0],
      });
    },
  });

  return (
    <>
      {user && isOwner ? (
        <div className="mb-2.5 flex gap-5">
          <Button
            onClick={() => enterRegisterPage.edit(itemId)}
            className="text-custom-brand-primary h-auto bg-transparent p-0 shadow-none hover:cursor-pointer hover:bg-transparent hover:underline"
          >
            작품 수정하기
          </Button>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="text-custom-brand-primary h-auto bg-transparent p-0 shadow-none hover:cursor-pointer hover:bg-transparent hover:underline">
                작품 삭제하기
              </Button>
            </DialogTrigger>
            <DialogOverlay className="bg-custom-brand-primary/50 fixed inset-0 z-40" />
            <DialogContent className="fixed top-1/2 left-1/2 z-50 flex h-113.5 w-100 max-w-md -translate-x-1/2 -translate-y-1/2 flex-col justify-between rounded-xl border bg-[#F9F7F0] p-7.5">
              <DialogHeader>
                <DialogTitle className="text-custom-brand-primary text-2xl font-bold">
                  작품 삭제
                </DialogTitle>
                <DialogDescription className="text-custom-brand-primary fixed top-1/2 left-1/2 w-full -translate-x-1/2 -translate-y-1/2 text-center text-[40px] font-bold">
                  작품을
                  <br />
                  삭제하시겠습니까?
                </DialogDescription>
              </DialogHeader>
              <DialogFooter className="flex gap-2.5">
                <DialogClose asChild>
                  <Button className="hover:bg-custom-brand-primary hover:text-custom-background text-custom-brand-primary text-3.5 border-custom-gray-100 rounded-4xl border-[1px] bg-transparent px-17.5 py-3.5 hover:cursor-pointer">
                    취소
                  </Button>
                </DialogClose>
                <Button
                  className="bg-custom-gray-100 text-custom-background hover:text-custom-background text-3.5 hover:bg-custom-brand-primary rounded-4xl px-17.5 py-3.5 hover:cursor-pointer"
                  onClick={() => deleteMutation.mutate()}
                  disabled={deleteMutation.isPending}
                >
                  {/* {deleteMutation.isPending ? '삭제 중...' : '확인'} */}
                  확인
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      ) : (
        <div className="mb-9.5" />
      )}
    </>
  );
}
