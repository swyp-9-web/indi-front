'use client';

import { useState } from 'react';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { CATEGORY_ITEMS, SIZE_ITEMS } from '@/constants';
import { DehazeIcon } from '@/lib/icons';
import { cn } from '@/lib/utils';

// TODO: 백엔드 API 값 나오면 그 값으로 변경하기, debounce 적용 필요
// TODO: zustand 이용하여 filter value 리팩토링 진행
type FilterValue = 'category' | 'size';

export default function CategoryFilter() {
  const [filterType, setFilterType] = useState<FilterValue>('category');
  const [categories, setCategories] = useState<string[] | null>(null);

  // FIXME: 카테고리 드롭다운 클릭해서 변경시에 오류 있음, ex. 사이즈 선택하고 카테고리로 넘어오는 경우
  const handleFilterTypeSelected = (type: FilterValue) => {
    setFilterType(type);
    setCategories(null);
  };

  const handleItemClick = (value: string | null) => {
    if (value === null) {
      setCategories(null);
      return;
    }

    setCategories((prev) => {
      if (!prev) return [value];

      if (prev.includes(value)) {
        const filtered = prev.filter((item) => item !== value);
        return filtered.length === 0 ? null : filtered;
      }

      return [...prev, value];
    });
  };

  return (
    <div className="mb-7.5 flex h-10 items-center gap-2.5">
      <FilterDropdown onItemClick={handleFilterTypeSelected} />

      <ul className="flex h-full items-center justify-center gap-2.5">
        <li>
          <ToggleItem
            label="전체"
            isActive={categories === null}
            onClick={() => handleItemClick(null)}
          />
        </li>

        {filterType === 'category'
          ? CATEGORY_ITEMS.map(({ label, value }) => (
              <li key={value}>
                <ToggleItem
                  label={label}
                  isActive={categories?.includes(value) ?? false}
                  onClick={() => handleItemClick(value)}
                />
              </li>
            ))
          : SIZE_ITEMS.map(({ label, value }) => (
              <li key={value}>
                <ToggleItem
                  label={label}
                  isActive={categories?.includes(value) ?? false}
                  onClick={() => handleItemClick(value)}
                />
              </li>
            ))}
      </ul>
    </div>
  );
}

interface FilterDropdownProps {
  onItemClick: (type: FilterValue) => void;
}

function FilterDropdown({ onItemClick }: FilterDropdownProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="border-custom-gray-100 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border">
        <DehazeIcon />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="border-custom-gray-100 bg-custom-background w-33 translate-x-11.5 translate-y-1.5 rounded-none border p-0">
        <DropdownMenuItem
          onClick={() => onItemClick('category')}
          className="border-custom-gray-100 text-custom-brand-primary hover:text-custom-brand-primary focus:text-custom-brand-primary h-12 w-full cursor-pointer rounded-none border-b px-5 py-4.5 text-sm font-medium underline-offset-2 hover:bg-transparent hover:underline focus:bg-transparent"
        >
          작품 카테고리
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => onItemClick('size')}
          className="text-custom-brand-primary hover:text-custom-brand-primary focus:text-custom-brand-primary h-12 w-full cursor-pointer rounded-none px-5 py-4.5 text-sm font-medium underline-offset-2 hover:bg-transparent hover:underline focus:bg-transparent"
        >
          작품 사이즈
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

interface ToggleItemProps {
  label: string;
  isActive: boolean;
  onClick: () => void;
}

function ToggleItem({ label, isActive, onClick }: ToggleItemProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'text-custom-brand-primary border-custom-gray-100 cursor-pointer rounded-full border px-3.5 py-2.5 text-sm font-medium',
        isActive && 'bg-custom-ivory-100'
      )}
    >
      {label}
    </button>
  );
}
