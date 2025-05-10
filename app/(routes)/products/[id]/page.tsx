import Link from 'next/link';

import CommentSection from '@/app/_components/product/detail/CommentSection';
import ProductDetailAuthorInfo from '@/app/_components/product/detail/ProductDetailAuthorInfo';
import ProductDetailGallery from '@/app/_components/product/detail/ProductDetailGallery';
import RecommendButtons from '@/app/_components/product/detail/RecommendButtons';
import ScrapAndShare from '@/app/_components/product/detail/ScrapAndShare';
import { Button } from '@/components/ui/button';
import { ROUTE_PATHS } from '@/constants/route-paths';
import { fetchProductDetail } from '@/lib/apis/products.api';
import type { ProductDetail } from '@/lib/apis/products.type';
import { ArrowNextIcon } from '@/lib/icons/index';
import { SmsIcon } from '@/lib/icons/index';
import { CloseIcon } from '@/lib/icons/index';
import { formatNumberWithComma, formatOverThousand } from '@/utils/formatNumber';
import { getCategoryLabelByValue } from '@/utils/item';

export default async function ProductDetail({ params }: { params: { id: string } }) {
  const { id } = await params;

  const response: ProductDetail = await fetchProductDetail(Number(id), {
    runtime: 'server',
  });
  const product = response.result;

  return (
    <div className="mx-20 my-[6.25rem] flex flex-col">
      <div className="mx-auto max-w-7xl">
        <div className="flex gap-10">
          <div className="flex flex-col gap-5">
            {/* Categori */}
            <div className="flex items-center gap-[5px]">
              <Button
                variant="link"
                className="text-custom-brand-primary m-0 h-auto p-0 text-[12px]"
              >
                <Link href={ROUTE_PATHS.PRODUCTS}>전체</Link>
              </Button>
              <ArrowNextIcon className="!h-3 !w-3 text-[12px]" />
              <Button
                variant="link"
                className="text-custom-brand-primary m-0 h-auto p-0 text-[12px]"
              >
                <Link href={ROUTE_PATHS.PRODUCTS_CATEGORY(product.categoryType)}>
                  {getCategoryLabelByValue(product.categoryType)}
                </Link>
              </Button>
            </div>
            {/* Gallery */}
            <ProductDetailGallery images={product.imgUrls} title={product.title} />
          </div>

          <div className="flex max-w-[33.37rem] flex-col">
            <div className="mb-2.5 flex gap-5">
              <Button className="text-custom-brand-primary h-auto bg-transparent p-0 shadow-none hover:cursor-pointer hover:bg-transparent hover:underline">
                작품 수정하기
              </Button>
              <Button className="text-custom-brand-primary h-auto bg-transparent p-0 shadow-none hover:cursor-pointer hover:bg-transparent hover:underline">
                작품 삭제하기
              </Button>
            </div>
            <div className="mb-5 flex gap-[2.3rem]">
              <h1 className="text-custom-brand-primary w-[26.62rem] text-2xl font-bold">
                {product.title}
              </h1>
              {/* 스크랩 api 없어서 컴포넌트만 작성 */}
              {/* <ScrapAndShare product={product} hasCount={false} /> */}
            </div>
            <div className="text-custom-brand-primary mb-[1.87rem] text-2xl font-bold">
              {formatNumberWithComma(product.price)}원
            </div>
            <div className="mb-[3.75rem] flex gap-1.5">
              <div className="border-custom-gray-100 flex items-center justify-center gap-1 rounded-4xl border-[1px] px-2.5 py-1.5">
                <div className="flex -space-x-2">
                  <div className="bg-custom-brand-secondary border-custom-background z-10 flex h-6 w-6 items-center justify-center rounded-full border-[1px] text-[14px]">
                    💖
                  </div>
                  <div className="bg-custom-brand-secondary flex h-6 w-6 items-center justify-center rounded-full text-[14px]">
                    👀
                  </div>
                </div>
                {formatOverThousand(product.reaction.totalCount)}+
              </div>
              <div className="border-custom-gray-100 flex items-center justify-center gap-1 rounded-4xl border-[1px] px-2.5 py-1.5">
                <SmsIcon />
                {formatOverThousand(product.reaction.totalCount)}+
              </div>
            </div>

            <div className="text-custom-gray-300 mb-1 text-[12px]">사이즈(cm)</div>
            <div className="text-custom-brand-primary mb-3 flex text-[14px] font-semibold">
              가로{formatNumberWithComma(product.size.width)}
              <CloseIcon />
              세로{formatNumberWithComma(product.size.height)}
              <CloseIcon />폭{formatNumberWithComma(product.size.depth)}
            </div>

            <div className="text-custom-gray-300 mb-1 text-[12px]">재질</div>
            <div className="text-custom-brand-primary mb-[3.75rem] flex text-[14px] font-semibold">
              {product.material}
            </div>

            <ProductDetailAuthorInfo
              AuthorSrc={product.artist.profileImgUrl}
              AuthorName={product.artist.name}
              AuthorDescription={product.artist.description}
            />
            <div className="text-custom-gray-300 mt-[3.75rem] mb-2.5 text-[12px]">작품설명</div>

            <div className="border-custom-gray-100 mb-[1.87rem] h-[1px] w-full border-[1px]" />

            <div className="text-custom-brand-primary mb-10 w-full text-[1rem]">
              {product.description}
            </div>

            <div className="border-custom-gray-100 mb-[1.87rem] h-[1px] w-full border-[1px]" />

            <div className="text-custom-gray-300 mb-2.5 text-[12px]">이 작품을 추천해요!</div>
            <RecommendButtons
              likes={product.reaction.likes}
              wants={product.reaction.wants}
              revisits={product.reaction.revisits}
            />
          </div>
        </div>

        {/* <CommentSection /> */}
      </div>
    </div>
  );
}
