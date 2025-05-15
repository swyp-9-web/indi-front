import { headers } from 'next/headers';
import Link from 'next/link';
import { redirect } from 'next/navigation';

import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';

import HighlightedProductsCarousel from '@/app/_components/product/HighlightedProductsCarousel';
import { ROUTE_PATHS } from '@/constants/route-paths';
import { fetchProductDetail, fetchProductsList } from '@/lib/apis/products.api';
import { fetchUserSummary } from '@/lib/apis/user.api';
import { ArrowNextIcon, CloseIcon, SmsIcon } from '@/lib/icons/index';
import { QUERY_KEYS } from '@/lib/queries/queryKeys';
import { formatNumberWithComma, formatOverThousand } from '@/utils/formatNumber';
import { getCategoryLabelByValue } from '@/utils/item';

import ArtistOtherCards from './_components/ArtistOtherCards';
import PatchAndDelete from './_components/PatchAndDelete';
import ProductDetailArtistInfo from './_components/ProductDetailAuthorInfo';
import ProductDetailGallery from './_components/ProductDetailGallery';
import RecommendButtons from './_components/RecommendButtons';
import ScrapAndShare from './_components/ScrapAndShare';

interface ProductDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function ProductDetail({ params }: ProductDetailPageProps) {
  const referer = (await headers()).get('referer');
  if (!params) {
    redirect(referer || ROUTE_PATHS.HOME);
  }
  const { id } = await params;

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

  const artistPageResponse = await fetchProductsList({
    artistId: product.artist.id,
    sortType: 'SCRAPED_TOP',
  });
  const artistPage = artistPageResponse.result;

  return (
    <HydrationBoundary state={dehydrateState}>
      <div className="mx-20 my-25 flex flex-col">
        <div className="mx-auto max-w-7xl">
          <div className="flex gap-10">
            <div className="flex flex-col gap-5">
              <div className="flex items-center gap-[5px]">
                <Link
                  className="text-custom-brand-primary m-0 h-auto p-0 text-[12px] hover:underline"
                  href={ROUTE_PATHS.HOME}
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

              <ProductDetailGallery images={product.imgUrls} title={product.title} />
            </div>

            <div className="flex max-w-133.5 flex-col">
              <PatchAndDelete itemId={product.itemId} isOwner={product.viewer.isOwner} />
              <div className="mb-5 flex gap-10">
                <h1 className="text-custom-brand-primary w-106.5 text-2xl font-bold">
                  {product.title}
                </h1>

                <ScrapAndShare product={product} />
              </div>
              <div className="text-custom-brand-primary mb-7.5 text-2xl font-bold">
                {product.price ? `${formatNumberWithComma(product.price)}원` : `구매시 문의`}
              </div>
              <div className="mb-15 flex gap-1.5">
                <div className="border-custom-gray-100 flex items-center justify-center gap-1 rounded-4xl border-[1px] px-2.5 py-1.5">
                  <div className="flex -space-x-2">
                    <div className="bg-custom-brand-secondary border-custom-background z-10 flex h-6 w-6 items-center justify-center rounded-full border-[1px] text-[14px]">
                      💖
                    </div>
                    <div className="bg-custom-brand-secondary flex h-6 w-6 items-center justify-center rounded-full text-[14px]">
                      👀
                    </div>
                  </div>
                  {/* {formatOverThousand(product.reaction.totalCount)}+ */}
                  {formatOverThousand(9)}+
                </div>
                <div className="border-custom-gray-100 flex items-center justify-center gap-1 rounded-4xl border-[1px] px-2.5 py-1.5">
                  <SmsIcon />
                  {/* {formatOverThousand(product.reaction.totalCount)}+ */}
                  {formatOverThousand(9)}+
                </div>
              </div>

              <div className="text-custom-gray-300 mb-1 text-[12px]">사이즈(cm)</div>
              <div className="text-custom-brand-primary mb-3 flex text-[14px] font-semibold">
                {product.size.width > 0 && product.size.height > 0 ? (
                  <>
                    <span>가로{formatNumberWithComma(product.size.width)}</span>
                    <CloseIcon />
                    <span>세로{formatNumberWithComma(product.size.height)}</span>
                    {product.size.depth > 0 && (
                      <>
                        <CloseIcon />
                        <span>폭{formatNumberWithComma(product.size.depth)}</span>
                      </>
                    )}
                  </>
                ) : (
                  '없음'
                )}
              </div>

              <div className="text-custom-gray-300 mb-1 text-[12px]">재질</div>

              {product.material ? (
                <div className="text-custom-brand-primary mb-15 flex text-[14px] font-semibold">
                  {product.material}
                </div>
              ) : (
                <div className="text-custom-brand-primary mb-15 flex text-[14px] font-semibold">
                  없음
                </div>
              )}

              <ProductDetailArtistInfo
                isFollowing={product.viewer.isFollowing}
                artistId={product.artist.id}
                artistSrc={product.artist.profileImgUrl}
                artistName={product.artist.nickname}
                artistDescription={product.artist.description}
              />

              <div className="text-custom-gray-300 mt-15 mb-2.5 text-[12px]">작품설명</div>

              <div className="border-custom-gray-100 mb-7.5 h-[1px] w-full border-[1px]" />

              <div className="text-custom-brand-primary text-4 mb-10 w-full whitespace-pre-wrap">
                {product.description}
              </div>

              <div className="border-custom-gray-100 mb-7.5 h-[1px] w-full border-[1px]" />

              <div className="text-custom-gray-300 mb-2.5 text-[12px]">이 작품을 추천해요!</div>
              <RecommendButtons
                // likesCount={product.reaction.likes}
                // wantsCount={product.reaction.wants}
                // revisitsCount={product.reaction.revisits}
                likesCount={9}
                wantsCount={9}
                revisitsCount={9}
                itemId={Number(id)}
                hasLike={product.reaction.isLiked}
                hasWant={product.reaction.isWanted}
                hasRevisit={product.reaction.isRevisited}
                likeId={product.reaction.likedEmojiId === 0 ? null : product.reaction.likedEmojiId}
                wantId={
                  product.reaction.wantedEmojiId === 0 ? null : product.reaction.wantedEmojiId
                }
                revisitId={
                  product.reaction.revisitedEmojiId === 0 ? null : product.reaction.revisitedEmojiId
                }
              />
            </div>
          </div>
        </div>
      </div>
      <HighlightedProductsCarousel
        title={'작가의 다른 작품들'}
        variant={'primary'}
        products={artistPage.items}
      />
    </HydrationBoundary>
  );
}
