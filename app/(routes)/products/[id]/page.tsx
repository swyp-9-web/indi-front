import Link from 'next/link';
import { notFound } from 'next/navigation';

import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';

import HighlightedProductsCarousel from '@/app/_components/product/HighlightedProductsCarousel';
import { ROUTE_PATHS } from '@/constants/route-paths';
import { fetchProductDetail, fetchProductsList } from '@/lib/apis/products.api';
import { fetchUserSummary } from '@/lib/apis/user.api';
import { ArrowNextIcon } from '@/lib/icons/index';
import { QUERY_KEYS } from '@/lib/queries/queryKeys';
import { getCategoryLabelByValue } from '@/utils/item';

import CommentSection from './_components/CommentSection';
import ProductDetailGallery from './_components/ProductDetailGallery';
import ProductMetadataSection from './_components/ProductMetadataSection';

interface ProductDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function ProductDetail({ params }: ProductDetailPageProps) {
  const { id } = await params;

  async function prepareDehydratedState() {
    const queryClient = new QueryClient();
    await queryClient.prefetchQuery({
      queryKey: QUERY_KEYS.user.summary,
      queryFn: () => fetchUserSummary({ runtime: 'server' }),
    });
    return dehydrate(queryClient);
  }

  async function getProductAndArtistPage(productId: number) {
    try {
      const { result: product } = await fetchProductDetail(productId, { runtime: 'server' });
      const { result: artistPage } = await fetchProductsList({
        artistId: product.artist.id,
        sortType: 'SCRAPED_TOP',
      });
      return { product, artistPage };
    } catch (error) {
      notFound();
      return { product: null, artistPage: null };
    }
  }

  const dehydrateState = await prepareDehydratedState();
  const { product, artistPage } = await getProductAndArtistPage(Number(id));
  if (!product || !artistPage) return null;

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

            <ProductMetadataSection product={product} />
          </div>

          <CommentSection productId={product.itemId} isOwner={product.viewer.isOwner} />
        </div>
      </div>

      <HighlightedProductsCarousel
        title={'작가의 다른 작품들'}
        variant={'primary'}
        products={artistPage.items.filter((item) => item.id !== product.itemId)}
      />
    </HydrationBoundary>
  );
}
