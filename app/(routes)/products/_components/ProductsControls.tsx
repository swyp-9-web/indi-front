'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import CombinedToggleGroup from '@/app/_components/filter/CombinedToggleGroup';
import SortDropdown from '@/app/_components/filter/SortDropdown';
import { NORMAL_SORT_ITEMS } from '@/constants';

export default function ProductsControls() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const buildCategoryQuery = (value: string[]) => {
    const params = new URLSearchParams(searchParams.toString());

    params.delete('categoryTypes');
    value.forEach((category) => params.append('categoryTypes', category));

    return params.toString();
  };

  const buildSizeQuery = (value: string[]) => {
    const params = new URLSearchParams(searchParams.toString());

    params.delete('sizeTypes');
    value.forEach((size) => params.append('sizeTypes', size));

    return params.toString();
  };

  const buildSortQuery = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());

    params.delete('sortType');
    params.append('sortType', value);

    return params.toString();
  };

  const handleSizeChange = (value: string[]) => {
    const query = buildSizeQuery(value);

    router.replace(query ? `${pathname}?${query}` : pathname);
  };

  const handleCategoryChange = (value: string[]) => {
    const query = buildCategoryQuery(value);

    router.replace(query ? `${pathname}?${query}` : pathname);
  };

  const handleDropdownItemSelected = (item: { label: string; value: string }) => {
    const query = buildSortQuery(item.value);

    router.replace(query ? `${pathname}?${query}` : pathname);
  };

  const handleRefreshButtonClick = () => {
    const params = new URLSearchParams(searchParams.toString());

    params.delete('categoryTypes');
    params.delete('sizeTypes');

    const query = params.toString();

    router.replace(query ? `${pathname}?${query}` : pathname);
  };

  return (
    <>
      <CombinedToggleGroup
        onCategoryChange={handleCategoryChange}
        onSizeChange={handleSizeChange}
        onRefreshButtonClick={handleRefreshButtonClick}
      />

      <div className="ml-auto">
        <SortDropdown items={NORMAL_SORT_ITEMS} onSelect={handleDropdownItemSelected} />
      </div>
    </>
  );
}
