import HighlightedProductsCarousel from '@/app/_components/product/HighlightedProductsCarousel';
import { productListMock } from '@/lib/mocks/product-list.mock';

interface SpecialProductsSectionProps {
  title: string;
  variant: 'primary' | 'secondary';
}

// TODO: 상위 컴포넌트에서 스크랩순(주목할만한), 반응갯수(반응좋은) 중 어떤 기준으로 데이터 호출할지 정의 후 useQuery로 받아온 데이터 선택적 랜더링
export default function SpecialProductsSection({ title, variant }: SpecialProductsSectionProps) {
  return (
    <HighlightedProductsCarousel
      title={title}
      variant={variant}
      products={productListMock.result.items}
      className="mt-15"
    />
  );
}
