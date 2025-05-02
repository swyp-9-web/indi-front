import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { SIZE_ITEMS } from '@/constants';

interface SizeToggleGroupProps {
  onValueChange: (value: string[]) => void;
}

export default function SizeToggleGroup({ onValueChange }: SizeToggleGroupProps) {
  return (
    <ToggleGroup type="multiple" onValueChange={onValueChange} className="flex gap-0.5">
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
  );
}
