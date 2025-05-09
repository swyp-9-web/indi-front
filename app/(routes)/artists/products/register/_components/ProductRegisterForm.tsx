'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';

import { Form } from '@/components/ui/form';
import { FormValues, productRegisterFormSchema } from '@/lib/schemas/productRegisterForm.schema';

import ImageUploadSection from './ImageUploadSection';
import ProductInfoSection from './ProductInfoSection';

interface ProductRegisterFormProps {
  initialValues: Partial<FormValues> | null;
}

export default function ProductRegisterForm({ initialValues }: ProductRegisterFormProps) {
  const form = useForm<FormValues>({
    resolver: zodResolver(productRegisterFormSchema),
    defaultValues: initialValues ?? {
      name: '',
      category: '',
      size: {
        width: '',
        height: '',
        depth: '',
      },
      material: '',
      description: '',
      priceType: 'fixed',
      price: '',
    },
  });

  const [submitType, setSubmitType] = useState<'save' | 'upload'>('upload');

  // TODO: 실제 API 요청과 연동 필요
  const handleSubmit = async (formValues: FormValues) => {
    console.log(submitType);

    const { priceType: _priceType, ...formValuesWithoutPriceType } = formValues;

    // 백엔드 요청으로 인한 값이 없는 경우 0으로 변환해서 form data로 전송
    const requestPayload = {
      ...formValuesWithoutPriceType,
      price: formValues.price ? formValues.price : 0,
      size: {
        width: formValues.size?.width ? formValues.size.width : 0,
        height: formValues.size?.height ? formValues.size.height : 0,
        depth: formValues.size?.depth ? formValues.size.depth : 0,
      },
    };

    console.log(requestPayload);
  };

  return (
    <Form {...form}>
      <form className="w-full" onSubmit={form.handleSubmit(handleSubmit)}>
        <div className="flex items-start gap-5">
          {/* <ImageUploadSection form={form} /> */}
          <ProductInfoSection form={form} />
        </div>

        <div className="mb-20 flex items-center justify-center gap-2.5">
          <button
            type="submit"
            onClick={() => setSubmitType('save')}
            className="border-custom-gray-100 flex h-11.5 w-42 cursor-pointer items-center justify-center rounded-full border text-sm font-medium"
          >
            임시저장
          </button>
          <button
            type="submit"
            onClick={() => setSubmitType('upload')}
            className="bg-custom-brand-secondary text-custom-gray-900 flex h-11.5 w-42 cursor-pointer items-center justify-center rounded-full text-sm font-medium"
          >
            등록하기
          </button>
        </div>
      </form>
    </Form>
  );
}
