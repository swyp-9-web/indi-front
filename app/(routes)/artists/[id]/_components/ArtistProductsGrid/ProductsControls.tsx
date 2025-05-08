'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import SortDropdown from '@/app/_components/filter/SortDropdown';
import { NORMAL_SORT_ITEMS } from '@/constants';

export default function ProductsControls() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const buildSortQuery = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());

    params.delete('sortType');
    params.append('sortType', value);

    return params.toString();
  };

  const handleDropdownItemSelected = (item: { label: string; value: string }) => {
    const query = buildSortQuery(item.value);

    router.replace(query ? `${pathname}?${query}` : pathname);
  };

  return <SortDropdown items={NORMAL_SORT_ITEMS} onSelect={handleDropdownItemSelected} />;
}
