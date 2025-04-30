import { UseFormReturn } from 'react-hook-form';

import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { FormValues } from '@/lib/schemas/productRegisterForm.schema';
import { cn } from '@/lib/utils';

interface PriceInputGroupProps {
  form: UseFormReturn<FormValues>;
}

export default function PriceInputGroup({ form }: PriceInputGroupProps) {
  return (
    <FormItem className="relative block">
      <FormLabel className="data-[error=true]:text-custom-brand-primary mb-1.5 gap-0 text-sm font-semibold">
        거래 방식<span className="text-custom-status-notice">*</span>
      </FormLabel>
      <div className="mb-1.5 flex items-center justify-start gap-0.5">
        <button
          type="button"
          onClick={() => form.setValue('priceType', 'fixed')}
          className={cn(
            'border-custom-gray-100 flex cursor-pointer items-center justify-center rounded-full border px-4 py-2 text-xs',
            form.watch('priceType') === 'fixed' && 'text-custom-background bg-custom-gray-400'
          )}
        >
          가격입력
        </button>
        <button
          type="button"
          onClick={() => {
            form.setValue('priceType', 'inquiry');
            form.setValue('price', '', { shouldValidate: true });
          }}
          className={cn(
            'border-custom-gray-100 flex cursor-pointer items-center justify-center rounded-full border px-4 py-2 text-xs',
            form.watch('priceType') === 'inquiry' && 'text-custom-background bg-custom-gray-400'
          )}
        >
          작가에게 문의
        </button>
      </div>

      <FormField
        control={form.control}
        name="price"
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <div className="relative w-75">
                <Input
                  className="disabled:bg-custom-gray-100 disabled:placeholder:text-custom-gray-300 placeholder:text-custom-gray-200 text-custom-gray-900 relative h-12 w-full pr-10 pl-4.5 font-medium shadow-none placeholder:text-sm placeholder:font-medium disabled:opacity-100"
                  placeholder="작품 가격을 입력해 주세요."
                  disabled={form.watch('priceType') === 'inquiry'}
                  type="number"
                  {...field}
                />
                <p
                  className={cn(
                    'text-custom-gray-200 absolute top-1/2 right-4.5 -translate-1/2 text-sm font-medium',
                    form.watch('priceType') === 'inquiry' && 'text-custom-gray-300'
                  )}
                >
                  원
                </p>
              </div>
            </FormControl>
            <FormMessage className="text-custom-status-negative mt-1 text-xs font-semibold" />
          </FormItem>
        )}
      />
    </FormItem>
  );
}
