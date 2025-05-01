'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import SizeToggleGroup from '@/app/_components/filter/SizeToggleGroup';
import SortDropdown from '@/app/_components/filter/SortDropdown';
import { NORMAL_SORT_ITEMS } from '@/constants';

export default function ProductsControls() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

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

  const handleDropdownItemSelected = (item: { label: string; value: string }) => {
    const query = buildSortQuery(item.value);

    router.replace(query ? `${pathname}?${query}` : pathname);
  };

  return (
    <>
      <div className="text-custom-brand-primary mr-2.5 text-right font-semibold">사이즈</div>

      <SizeToggleGroup onValueChange={handleSizeChange} />

      <div className="ml-9">
        <SortDropdown items={NORMAL_SORT_ITEMS} onSelect={handleDropdownItemSelected} />
      </div>
    </>
  );
}
