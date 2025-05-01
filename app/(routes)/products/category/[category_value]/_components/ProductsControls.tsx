'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import SortDropdown from '@/app/_components/shared/SortDropdown';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { NORMAL_SORT_ITEMS, SIZE_ITEMS } from '@/constants';

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

  const onDropdownItemSelected = (item: { label: string; value: string }) => {
    const query = buildSortQuery(item.value);

    router.replace(query ? `${pathname}?${query}` : pathname);
  };

  return (
    <>
      <div className="text-custom-brand-primary mr-2.5 text-right font-semibold">사이즈</div>

      <ToggleGroup type="multiple" onValueChange={handleSizeChange} className="flex gap-0.5">
        {SIZE_ITEMS.map((item) => {
          if (item.value === 'X') return null;
          return (
            <ToggleGroupItem
              key={item.value}
              value={item.value}
              className="data-[state=on]:bg-custom-gray-400 data-[state=on]:text-custom-background cursor-pointer rounded-full border px-3 py-2 text-xs first:rounded-full last:rounded-full"
            >
              {item.label}
            </ToggleGroupItem>
          );
        })}
      </ToggleGroup>

      <SortDropdown items={NORMAL_SORT_ITEMS} onSelect={onDropdownItemSelected} />
    </>
  );
}
