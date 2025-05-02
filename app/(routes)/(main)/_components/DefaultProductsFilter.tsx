'use client';

import CombinedToggleGroup from '@/app/_components/filter/CombinedToggleGroup';
import { useMainPageFilter } from '@/stores/useMainPageFilter';

export default function DefaultProductsFilter() {
  const { setCategories, setSizes, resetFilters } = useMainPageFilter();

  return (
    <CombinedToggleGroup
      onCategoryChange={setCategories}
      onSizeChange={setSizes}
      onRefreshButtonClick={resetFilters}
    />
  );
}
