import { UseFormReturn } from 'react-hook-form';

import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { CloseIcon } from '@/lib/icons';
import { FormValues } from '@/lib/schemas/productRegisterForm.schema';

interface SizeInputGroupProps {
  form: UseFormReturn<FormValues>;
}

export default function SizeInputGroup({ form }: SizeInputGroupProps) {
  return (
    <FormItem className="relative block">
      <FormLabel className="data-[error=true]:text-custom-brand-primary mb-1.5 gap-0 text-sm font-semibold">
        작품 실측(cm)
      </FormLabel>
      <div className="flex items-center gap-0.5">
        {(['width', 'height', 'depth'] as const).map((dimension) => (
          <div key={dimension} className="flex items-center gap-0.5">
            <FormField
              control={form.control}
              name={`size.${dimension}`}
              render={({ field }) => (
                <FormControl>
                  <Input
                    className="placeholder:text-custom-gray-200 text-custom-gray-900 h-12 w-20 px-4.5 font-medium shadow-none placeholder:text-sm placeholder:font-medium"
                    placeholder={
                      dimension === 'width' ? '가로' : dimension === 'height' ? '세로' : '폭'
                    }
                    type="number"
                    {...field}
                    onChange={(e) => {
                      field.onChange(e);
                      form.trigger('size');
                    }}
                  />
                </FormControl>
              )}
            />
            {dimension !== 'depth' && <CloseIcon />}
          </div>
        ))}
      </div>
      <FormMessage className="text-custom-status-negative mt-1 text-xs font-semibold" />
    </FormItem>
  );
}
