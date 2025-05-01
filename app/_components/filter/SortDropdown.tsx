import { useState } from 'react';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ArrowDropdownIcon } from '@/lib/icons';

type Item = { label: string; value: string };

interface SortDropdownProps {
  items: Item[];
  onSelect: (item: Item) => void;
}

export default function SortDropdown({ items, onSelect }: SortDropdownProps) {
  const [selectedItem, setSelectedItem] = useState(items[0]);

  const filteredItems = items.filter((item) => item !== selectedItem);

  const handleItemSelected = (item: { label: string; value: string }) => {
    setSelectedItem(item);
    onSelect(item);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="text-custom-brand-primary flex h-9 cursor-pointer items-center justify-center text-sm font-medium">
        {selectedItem.label}
        <ArrowDropdownIcon />
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="min-w-0 border-none bg-transparent p-0 shadow-none"
      >
        {filteredItems.map((item) => (
          <DropdownMenuItem
            key={item.value}
            onSelect={() => handleItemSelected(item)}
            className="text-custom-brand-primary border-custom-gray-100 w-min-0 hover:text-custom-brand-primary bg-custom-background focus:text-custom-brand-primary hover:bg-custom-background focus:bg-custom-background cursor-pointer rounded-lg border px-4 py-2 text-sm font-medium underline-offset-2 hover:underline"
          >
            {item.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
