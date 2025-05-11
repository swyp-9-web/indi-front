'use client';

import { Button } from '@/components/ui/button';
import { deleteProduct } from '@/lib/apis/products.api';
import { useUserSummary } from '@/lib/queries/useUserQueries';

interface PatchAndDeleteProps {
  itemId: number;
  owner: boolean;
}

export default function PatchAndDelete({ itemId, owner }: PatchAndDeleteProps) {
  const { data } = useUserSummary();

  const user = data?.result ?? null;

  return (
    <>
      {user && owner && (
        <div className="mb-2.5 flex gap-5">
          <Button className="text-custom-brand-primary h-auto bg-transparent p-0 shadow-none hover:cursor-pointer hover:bg-transparent hover:underline">
            작품 수정하기
          </Button>
          <Button
            onClick={() => deleteProduct(itemId)}
            className="text-custom-brand-primary h-auto bg-transparent p-0 shadow-none hover:cursor-pointer hover:bg-transparent hover:underline"
          >
            작품 삭제하기
          </Button>
        </div>
      )}
      {!user && <div className="mb-[38px]" />}
    </>
  );
}
