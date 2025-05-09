import { UseFormReturn } from 'react-hook-form';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { CATEGORY_ITEMS } from '@/constants';
import { CancelIcon, ChevronBackwardIcon } from '@/lib/icons';
import { FormValues, MAX_LENGTH } from '@/lib/schemas/productRegisterForm.schema';
import { getCategoryLabelByValue } from '@/utils/item';

import PriceInputGroup from './PriceInputGroup';
import SizeInputGroup from './SizeInputGroup';

interface ProductInfoInputsProps {
  form: UseFormReturn<FormValues>;
}

export default function ProductInfoInputs({ form }: ProductInfoInputsProps) {
  return (
    <div className="border-custom-gray-100 mb-15 flex-1 rounded-lg border px-7.5 py-7.5">
      <h3 className="text-custom-brand-primary mb-7.5 text-lg font-bold">작품 정보</h3>

      <div className="flex flex-col gap-3.5">
        {/* 작품명 */}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="relative block">
              <FormLabel className="data-[error=true]:text-custom-brand-primary mb-1.5 gap-0 text-sm font-semibold">
                작품명<span className="text-custom-status-notice">*</span>
              </FormLabel>
              <FormControl>
                <div className="relative">
                  <Input
                    className="placeholder:text-custom-gray-200 text-custom-gray-900 h-12 pr-12 pl-4.5 font-medium shadow-none placeholder:text-sm placeholder:font-medium"
                    placeholder="작품명을 입력해 주세요."
                    {...field}
                  />
                  {field.value && (
                    <button
                      type="button"
                      onClick={() => field.onChange('')}
                      className="absolute top-1/2 right-4.5 -translate-y-1/2 cursor-pointer"
                    >
                      <CancelIcon />
                    </button>
                  )}
                </div>
              </FormControl>
              <div className="mt-1 flex items-center justify-between">
                <FormMessage className="text-custom-status-negative text-xs font-semibold" />
                <p className="flex-1 text-right text-xs">
                  <span className="text-custom-status-notice">{field.value.trim().length}</span>/
                  {MAX_LENGTH.name}
                </p>
              </div>
            </FormItem>
          )}
        />

        {/* 카테고리 */}
        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem className="relative block">
              <FormLabel className="data-[error=true]:text-custom-brand-primary mb-1.5 gap-0 text-sm font-semibold">
                카테고리<span className="text-custom-status-notice">*</span>
              </FormLabel>
              <FormControl>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button
                      type="button"
                      className="text-custom-gray-900 relative h-12 w-full cursor-pointer rounded-lg border pr-12 pl-4.5 text-left text-sm font-medium shadow-none"
                    >
                      {field.value ? (
                        getCategoryLabelByValue(field.value)
                      ) : (
                        <span className="text-custom-gray-200">카테고리를 선택해 주세요</span>
                      )}
                      <ChevronBackwardIcon className="absolute top-1/2 right-4.5 -translate-y-1/2" />
                    </button>
                  </DropdownMenuTrigger>

                  <DropdownMenuContent className="bg-custom-background border-custom-gray-100 z-10 w-182.5 rounded-lg border p-0 shadow-none">
                    {CATEGORY_ITEMS.map((item) => (
                      <DropdownMenuItem
                        key={item.value}
                        onClick={() => field.onChange(item.value)}
                        className="focus:text-custom-brand-primary text-custom-brand-primary h-10 cursor-pointer px-3 py-2.5 text-sm font-medium underline-offset-2 hover:bg-transparent hover:underline focus:bg-transparent"
                      >
                        {item.label}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </FormControl>
              <FormMessage className="text-custom-status-negative mt-1 text-xs font-semibold" />
            </FormItem>
          )}
        />

        {/* 작품 크기 */}
        <SizeInputGroup form={form} />

        {/* 재질 */}
        <FormField
          control={form.control}
          name="material"
          render={({ field }) => (
            <FormItem className="relative block">
              <FormLabel className="data-[error=true]:text-custom-brand-primary mb-1.5 gap-0 text-sm font-semibold">
                작품 재질
              </FormLabel>
              <FormControl>
                <div className="relative">
                  <Input
                    className="placeholder:text-custom-gray-200 text-custom-gray-900 h-12 pr-12 pl-4.5 font-medium shadow-none placeholder:text-sm placeholder:font-medium"
                    placeholder="작품명을 입력해 주세요."
                    {...field}
                  />
                  {field.value && (
                    <button
                      type="button"
                      onClick={() => field.onChange('')}
                      className="absolute top-1/2 right-4.5 -translate-y-1/2 cursor-pointer"
                    >
                      <CancelIcon />
                    </button>
                  )}
                </div>
              </FormControl>
              <div className="mt-1 flex items-center justify-between">
                <FormMessage className="text-custom-status-negative text-xs font-semibold" />
                <p className="flex-1 text-right text-xs">
                  <span className="text-custom-status-notice">{field.value?.trim().length}</span>/
                  {MAX_LENGTH.material}
                </p>
              </div>
            </FormItem>
          )}
        />

        {/* 작품 설명 */}
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem className="relative block">
              <FormLabel className="data-[error=true]:text-custom-brand-primary mb-1.5 gap-0 text-sm font-semibold">
                작품 설명<span className="text-custom-status-notice">*</span>
              </FormLabel>
              <FormControl>
                <Textarea
                  className="aria-invalid:border-input aria-invalid:focus-visible:ring-ring/50 placeholder:text-custom-gray-200 text-custom-gray-900 h-57 resize-none px-4.5 py-3.5 font-medium shadow-none placeholder:text-sm placeholder:font-medium"
                  placeholder="작품 설명을 입력해 주세요."
                  {...field}
                />
              </FormControl>
              <div className="mt-1 flex items-center justify-between">
                <FormMessage className="text-custom-status-negative text-xs font-semibold" />
                <p className="flex-1 text-right text-xs">
                  <span className="text-custom-status-notice">{field.value.trim().length}</span>/
                  {MAX_LENGTH.description}
                </p>
              </div>
            </FormItem>
          )}
        />

        {/* 거래 방식 */}
        <PriceInputGroup form={form} />
      </div>
    </div>
  );
}
