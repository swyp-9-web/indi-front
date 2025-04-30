'use client';

import { useState } from 'react';

import { CATEGORY_ITEMS, SIZE_ITEMS } from '@/constants';
import { RefreshIcon } from '@/lib/icons';
import { cn } from '@/lib/utils';

// TODO: 백엔드 API 값 나오면 그 값으로 변경하기, debounce 적용 필요
// TODO: zustand 이용하여 filter value 리팩토링 진행
export default function CategoryFilter() {
  const [categories, setCategories] = useState<string[] | null>(null);

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
    <div className="border-custom-gray-100 flex w-full flex-col items-start justify-center gap-2.5 rounded-lg border px-5 py-2.5">
      <div className="flex items-center justify-start gap-1">
        <p className="text-custom-brand-primary w-21.5 font-semibold">카테고리</p>
        <ul className="flex flex-1 flex-wrap gap-1.5">
          {CATEGORY_ITEMS.map((item) => (
            <li key={item.value}>
              <ToggleItem
                label={item.label as string}
                isActive={categories?.includes(item.value) ?? false}
                onClick={() => handleItemClick(item.value)}
              />
            </li>
          ))}
        </ul>
      </div>
      <div className="flex items-center justify-start gap-1">
        <p className="text-custom-brand-primary w-21.5 font-semibold">사이즈</p>
        <ul className="flex flex-1 gap-1.5">
          {SIZE_ITEMS.map((item) => {
            if (item.value !== 'X') {
              return (
                <li key={item.value}>
                  <ToggleItem
                    label={item.label as string}
                    isActive={categories?.includes(item.value) ?? false}
                    onClick={() => handleItemClick(item.value)}
                  />
                </li>
              );
            }
          })}
          <button
            onClick={() => handleItemClick(null)}
            className="ml-5 flex cursor-pointer items-center justify-center gap-0.5"
          >
            <RefreshIcon />
            <span className="text-sm font-medium">전체해제</span>
          </button>
        </ul>
      </div>
    </div>
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
        'text-custom-brand-primary border-custom-gray-100 cursor-pointer rounded-full border px-3.5 py-2 text-sm font-medium',
        isActive && 'bg-custom-brand-primary text-custom-background border-custom-brand-primary'
      )}
    >
      {label}
    </button>
  );
}
