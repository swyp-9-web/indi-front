import { UseFormReturn } from 'react-hook-form';

import { FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { FormValues } from '@/lib/schemas/productRegisterForm.schema';

import ImageInputGrid from './ImageInputGrid';

interface ImageUploadSectionProps {
  form: UseFormReturn<FormValues>;
}

export default function ImageUploadSection({ form }: ImageUploadSectionProps) {
  return (
    <div className="border-custom-gray-100 mb-15 w-117.5 rounded-lg border px-7.5 py-7.5">
      <h3 className="text-custom-brand-primary mb-1 text-lg font-bold">
        작품 이미지<span className="text-custom-status-notice">*</span>
      </h3>
      <p className="text-custom-brand-primary mb-9 text-sm">
        작품 이미지는 1:1 비율로 보여져요. 최대 8장까지 추가할 수 있어요.
      </p>
      <FormField
        control={form.control}
        name="images"
        render={() => (
          <FormItem>
            <FormControl>
              <ImageInputGrid
                initialImages={form.getValues('images')}
                onChangeImages={(images) => {
                  form.setValue('images', images, { shouldValidate: true });
                }}
              />
            </FormControl>
            <FormMessage className="text-custom-status-negative text-xs font-semibold" />
          </FormItem>
        )}
      />
    </div>
  );
}
