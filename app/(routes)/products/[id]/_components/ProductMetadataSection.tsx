'use client';

import { useCallback, useState } from 'react';

import { ProductDetail } from '@/lib/apis/products.type';
import { CloseIcon } from '@/lib/icons/index';
import { formatNumberWithComma } from '@/utils/formatNumber';

import EngagementSummary from './EngagementSummary';
import PatchAndDelete from './PatchAndDelete';
import ProductDetailArtistInfo from './ProductDetailAuthorInfo';
import RecommendButtons from './RecommendButtons';
import ScrapAndShare from './ScrapAndShare';

export default function ProductMetadataSection({ product }: { product: ProductDetail }) {
  const [reactionTotal, setReactionTotal] = useState(product.reaction.totalCount);
  const handleReactionChange = useCallback(
    ({
      likesCount,
      wantsCount,
      revisitsCount,
    }: {
      likesCount: number;
      wantsCount: number;
      revisitsCount: number;
    }) => {
      setReactionTotal(likesCount + wantsCount + revisitsCount);
    },
    []
  );

  return (
    <div className="flex max-w-133.5 flex-col">
      <PatchAndDelete itemId={product.itemId} isOwner={product.viewer.isOwner} />
      <div className="mb-5 flex gap-10">
        <h1 className="text-custom-brand-primary w-106.5 text-2xl font-bold break-all whitespace-pre-wrap">
          {product.title}
        </h1>
        <ScrapAndShare product={product} />
      </div>
      <div className="text-custom-brand-primary mb-7.5 text-2xl font-bold">
        {product.price ? `${formatNumberWithComma(product.price)}원` : `구매시 문의`}
      </div>
      <EngagementSummary productId={product.itemId} reactionTotal={reactionTotal} />

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
      <div className="text-custom-brand-primary mb-15 flex text-[14px] font-semibold">
        {product.material || '없음'}
      </div>

      <ProductDetailArtistInfo
        isFollowing={product.viewer.isFollowing}
        artistId={product.artist.id}
        artistSrc={product.artist.profileImgUrl}
        artistName={product.artist.nickname}
        artistDescription={product.artist.description}
      />

      <div className="text-custom-gray-300 mt-15 mb-2.5 text-[12px]">작품설명</div>
      <div className="border-custom-gray-100 mb-7.5 h-[1px] w-full border-[1px]" />
      <div className="text-custom-brand-primary mb-10 w-full break-all whitespace-pre-wrap">
        {product.description}
      </div>

      <div className="border-custom-gray-100 mb-7.5 h-[1px] w-full border-[1px]" />
      <div className="text-custom-gray-300 mb-2.5 text-[12px]">이 작품을 추천해요!</div>

      <RecommendButtons
        likesCount={product.reaction.likes}
        wantsCount={product.reaction.wants}
        revisitsCount={product.reaction.revisits}
        itemId={product.itemId}
        hasLike={product.reaction.isLiked}
        hasWant={product.reaction.isWanted}
        hasRevisit={product.reaction.isRevisited}
        likeId={product.reaction.likedEmojiId === 0 ? null : product.reaction.likedEmojiId}
        wantId={product.reaction.wantedEmojiId === 0 ? null : product.reaction.wantedEmojiId}
        revisitId={
          product.reaction.revisitedEmojiId === 0 ? null : product.reaction.revisitedEmojiId
        }
        onReactionChange={handleReactionChange}
      />
    </div>
  );
}
