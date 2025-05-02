'use client';

import { useState } from 'react';

import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { CATEGORY_ITEMS, SIZE_ITEMS } from '@/constants';
import { RefreshIcon } from '@/lib/icons';

interface CombinedToggleGroupProps {
  onCategoryChange: (value: string[]) => void;
  onSizeChange: (value: string[]) => void;
  onRefreshButtonClick: () => void;
}

export default function CombinedToggleGroup({
  onCategoryChange,
  onSizeChange,
  onRefreshButtonClick,
}: CombinedToggleGroupProps) {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);

  const handleCategoryChange = (value: string[]) => {
    setSelectedCategories(value);
    onCategoryChange(value);
  };

  const handleSizeChange = (value: string[]) => {
    setSelectedSizes(value);
    onSizeChange(value);
  };

  const handleRefreshButtonClick = () => {
    setSelectedCategories([]);
    setSelectedSizes([]);
    onRefreshButtonClick();
  };

  return (
    <div className="border-custom-gray-100 flex w-full flex-col gap-2.5 rounded-lg border px-5 py-2.5">
      <div className="flex items-center">
        <p className="text-custom-brand-primary w-23 font-semibold">카테고리</p>
        <ToggleGroup
          type="multiple"
          value={selectedCategories}
          onValueChange={handleCategoryChange}
          className="flex gap-1.5"
        >
          {CATEGORY_ITEMS.map((item) => {
            return (
              <ToggleGroupItem
                key={item.value}
                value={item.value}
                className="min-w-none hover:text-custom-brand-primary data-[state=on]:bg-custom-brand-primary data-[state=on]:text-custom-background cursor-pointer rounded-full border px-3.5 py-2 text-sm first:rounded-full last:rounded-full hover:bg-transparent"
              >
                {item.label}
              </ToggleGroupItem>
            );
          })}
        </ToggleGroup>
      </div>

      <div className="flex items-center">
        <p className="text-custom-brand-primary w-23 font-semibold">사이즈</p>
        <ToggleGroup
          type="multiple"
          value={selectedSizes}
          onValueChange={handleSizeChange}
          className="flex gap-1.5"
        >
          {SIZE_ITEMS.map((item) => {
            if (item.value === 'X') return null;

            return (
              <ToggleGroupItem
                key={item.value}
                value={item.value}
                className="min-w-none hover:text-custom-brand-primary data-[state=on]:bg-custom-brand-primary data-[state=on]:text-custom-background cursor-pointer rounded-full border px-3.5 py-2 text-sm first:rounded-full last:rounded-full hover:bg-transparent"
              >
                {item.label}
              </ToggleGroupItem>
            );
          })}
        </ToggleGroup>

        <button
          onClick={handleRefreshButtonClick}
          className="ml-5 flex cursor-pointer items-center justify-center gap-0.5"
        >
          <RefreshIcon />
          <span className="text-sm font-medium">전체해제</span>
        </button>
      </div>
    </div>
  );
}
