'use client';

import HighlightedProductsCarousel from '@/app/_components/product/HighlightedProductsCarousel';
import { SortOption } from '@/lib/apis/common.type';
import { useProductsQuery } from '@/lib/queries/useProductsQueries';

interface SpecialProductsSectionProps {
  title: string;
  variant: 'primary' | 'secondary';
  sort: SortOption;
}

export default function SpecialProductsSection({
  title,
  variant,
  sort,
}: SpecialProductsSectionProps) {
  const { data } = useProductsQuery({ page: 1, limit: 8, sortType: sort });

  return (
    <HighlightedProductsCarousel
      title={title}
      variant={variant}
      products={data?.result.items ?? []}
      className="my-15"
    />
  );
}
