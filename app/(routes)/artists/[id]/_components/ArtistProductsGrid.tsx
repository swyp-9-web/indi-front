import ProductCard from '@/app/_components/product/ProductCard';

import ProductsControls from './ProductsControls';

const mockProduct = {
  price: 49000,
  totalScraped: 128,
  createdAt: '2024-12-10T14:23:00.000Z',
  updatedAt: '2025-01-15T09:10:00.000Z',
  id: 1001,
  thumbnailImgUrl: '',
  name: '핸드메이드 도자기 머그컵',
  category: 'CRAFTS',
  size: 'M',
  artist: {
    id: 42,
    nickname: 'art_maker_woo',
  },
  scrap: {
    isScrapped: true,
    scrapedAt: '2025-04-01T17:30:00.000Z',
  },
  totalReaction: {
    likes: 230,
    wants: 180,
    revisits: 75,
  },
};

export default function ArtistProductsGrid() {
  return (
    <>
      <div className="mb-2 flex justify-end">
        <ProductsControls />
      </div>
      <div className="flex flex-wrap gap-x-5 gap-y-10">
        <ProductCard product={mockProduct} hasScrapCount />
        <ProductCard product={mockProduct} hasScrapCount />
        <ProductCard product={mockProduct} hasScrapCount />
        <ProductCard product={mockProduct} hasScrapCount />
      </div>
    </>
  );
}
