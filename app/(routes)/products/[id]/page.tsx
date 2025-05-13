import Link from 'next/link';

import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';

import PatchAndDelete from '@/app/_components/product/detail/PatchAndDelete';
import ProductDetailAuthorInfo from '@/app/_components/product/detail/ProductDetailAuthorInfo';
import ProductDetailGallery from '@/app/_components/product/detail/ProductDetailGallery';
import RecommendButtons from '@/app/_components/product/detail/RecommendButtons';
import ScrapAndShare from '@/app/_components/product/detail/ScrapAndShare';
import { ROUTE_PATHS } from '@/constants/route-paths';
import { fetchProductDetail } from '@/lib/apis/products.api';
import { fetchUserSummary } from '@/lib/apis/user.api';
import { ArrowNextIcon } from '@/lib/icons/index';
import { SmsIcon } from '@/lib/icons/index';
import { CloseIcon } from '@/lib/icons/index';
import { QUERY_KEYS } from '@/lib/queries/queryKeys';
import { formatNumberWithComma, formatOverThousand } from '@/utils/formatNumber';
import { getCategoryLabelByValue } from '@/utils/item';

export default async function ProductDetailResponse({ params }: { params: { id: number } }) {
  const { id } = params;

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: QUERY_KEYS.user.summary,
    queryFn: () => fetchUserSummary(),
  });

  const dehydrateState = dehydrate(queryClient);

  const response = await fetchProductDetail(Number(id), {
    runtime: 'server',
  });
  const product = response.result;

  return (
    <HydrationBoundary state={dehydrateState}>
      <div className="mx-20 my-[6.25rem] flex flex-col">
        <div className="mx-auto max-w-7xl">
          <div className="flex gap-10">
            <div className="flex flex-col gap-5">
              <div className="flex items-center gap-[5px]">
                <Link
                  className="text-custom-brand-primary m-0 h-auto p-0 text-[12px] hover:underline"
                  href={ROUTE_PATHS.PRODUCTS}
                >
                  전체
                </Link>
                <ArrowNextIcon className="!h-3 !w-3 text-[12px]" />

                <Link
                  className="text-custom-brand-primary m-0 h-auto p-0 text-[12px] hover:underline"
                  href={ROUTE_PATHS.PRODUCTS_CATEGORY(product.categoryType)}
                >
                  {getCategoryLabelByValue(product.categoryType)}
                </Link>
              </div>
              {/* Gallery */}
              <ProductDetailGallery images={product.imgUrls} title={product.title} />
            </div>

            <div className="flex max-w-[33.37rem] flex-col">
              <PatchAndDelete itemId={product.itemId} owner={product.viewer.isOwner} />
              <div className="mb-5 flex gap-[2.3rem]">
                <h1 className="text-custom-brand-primary w-[26.62rem] text-2xl font-bold">
                  {product.title}
                </h1>

                <ScrapAndShare product={product} hasCount={product.viewer.isScrapped} />
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
                {product.size.width > 0 || product.size.height > 0 || product.size.depth > 0 ? (
                  <>
                    {product.size.width > 0 && <>가로{formatNumberWithComma(product.size.width)}</>}
                    {product.size.width > 0 && product.size.height > 0 && <CloseIcon />}
                    {product.size.height > 0 && (
                      <>세로{formatNumberWithComma(product.size.height)}</>
                    )}
                    {(product.size.width > 0 || product.size.height > 0) &&
                      product.size.depth > 0 && <CloseIcon />}
                    {product.size.depth > 0 && <>폭{formatNumberWithComma(product.size.depth)}</>}
                  </>
                ) : (
                  <>없음</>
                )}
              </div>

              <div className="text-custom-gray-300 mb-1 text-[12px]">재질</div>
              <div className="text-custom-brand-primary mb-[3.75rem] flex text-[14px] font-semibold">
                {product.material}
              </div>

              <ProductDetailAuthorInfo
                hasFollow={product.viewer.isFollowing}
                artistId={product.artist.id}
                artistSrc={product.artist.profileImgUrl}
                artistName={product.artist.name}
                artistDescription={product.artist.description}
              />
              <div className="text-custom-gray-300 mt-[3.75rem] mb-2.5 text-[12px]">작품설명</div>

              <div className="border-custom-gray-100 mb-[1.87rem] h-[1px] w-full border-[1px]" />

              <div className="text-custom-brand-primary mb-10 w-full text-[1rem]">
                {product.description}
              </div>

              <div className="border-custom-gray-100 mb-[1.87rem] h-[1px] w-full border-[1px]" />

              <div className="text-custom-gray-300 mb-2.5 text-[12px]">이 작품을 추천해요!</div>
              <RecommendButtons
                likesCount={product.reaction.likes}
                wantsCount={product.reaction.wants}
                revisitsCount={product.reaction.revisits}
                itemId={Number(id)}
              />
            </div>
          </div>

          {/* <CommentSection /> */}
        </div>
      </div>
    </HydrationBoundary>
  );
}
