'use client';

import { useState } from 'react';

import { useRouter } from 'next/navigation';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { CATEGORY_ITEMS, ROUTE_PATHS } from '@/constants';
import { cn } from '@/lib/utils';

export default function CategoryDropdown() {
  const [isSelected, setIsSelected] = useState(false);

  const router = useRouter();

  const handleItemClick = (value: string) => {
    router.push(ROUTE_PATHS.PRODUCTS_CATEGORY(value));
  };

  return (
    <DropdownMenu onOpenChange={() => setIsSelected((prev) => !prev)}>
      <DropdownMenuTrigger
        className={cn(
          'cursor-pointer text-sm font-medium underline-offset-2 hover:underline',
          isSelected && 'underline'
        )}
      >
        카테고리
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="start"
        sideOffset={13}
        alignOffset={-10}
        className="bg-custom-background border-custom-gray-100 z-10 rounded-none border p-0 shadow-none"
      >
        {CATEGORY_ITEMS.map((item) => (
          <DropdownMenuItem
            key={item.value}
            onClick={() => handleItemClick(item.value)}
            className="text-custom-brand-primary hover:text-custom-brand-primary focus:text-custom-brand-primary h-11.5 w-75 cursor-pointer px-5 py-4 text-sm font-medium underline-offset-2 hover:bg-transparent hover:underline focus:bg-transparent"
          >
            {item.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
