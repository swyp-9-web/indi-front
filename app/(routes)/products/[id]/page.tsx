'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';

import ProductDetailDescription from '@/app/_components/product/detail/ProductDetailDescription';
import ProductDetailImages from '@/app/_components/product/detail/ProductDetailImages';
import { Button } from '@/components/ui/button';
import { ArrowNextIcon } from '@/lib/icons';

export default function ProductDetailPage() {
  const { id } = useParams();

  return (
    <div className="flex w-full flex-col flex-wrap px-20 pt-[6.2rem] pb-[6.25rem]">
      <div className="mb-5 flex items-center justify-start text-[0.75rem] text-[#646054]">
        <Button asChild variant="link">
          <Link href="/" className="text-custom-brand-primary">
            전체
          </Link>
        </Button>
        <ArrowNextIcon className="h-3 w-3" />
        <Button asChild variant="link">
          <Link href="/products?category=시각예술">시각 예술</Link>
        </Button>
      </div>
      <div className="flex justify-center gap-10">
        <ProductDetailImages
          images={['/logo/Artego.png', '/logo/Artego.png', '/logo/Artego.png']}
        />
        <ProductDetailDescription />
      </div>
    </div>
  );
}
