'use client';

import { useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';

import { Form } from '@/components/ui/form';
import { FormValues, productRegisterFormSchema } from '@/lib/schemas/productRegisterForm.schema';

import ImageUploadSection from './ImageUploadSection';
import ProductInfoSection from './ProductInfoSection';

export default function RegisterForm() {
  const form = useForm<FormValues>({
    resolver: zodResolver(productRegisterFormSchema),
    defaultValues: {
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
      images: [],
    },
  });

  // TODO: 실제 API 요청과 연동 필요
  const onSubmit = async (data: FormValues) => {
    try {
      console.log('--- 폼 제출 시작 ---');
      console.log('1. 입력된 텍스트 데이터:', data);

      // (핵심) File 타입만 변환하고, string(url)은 그대로 유지
      const uploadedImageUrls = await Promise.all(
        data.images.map(async (image) => {
          if (image instanceof File) {
            // (Mock) 파일을 서버에 업로드하고 URL을 리턴받았다고 가정
            return `https://mockserver.com/uploads/${image.name}`;
          }
          // 이미 string이면 그대로 사용
          return image;
        })
      );

      console.log('2. (Mock) 서버로부터 받은 이미지 URL:', uploadedImageUrls);

      // 업로드된 URL로 images 필드를 업데이트
      form.setValue('images', uploadedImageUrls);

      // 최종 서버에 보낼 데이터
      const { images: _images, priceType: _priceType, ...rest } = data;

      const finalPayload = {
        ...rest,
        price: data.priceType === 'inquiry' ? null : Number(data.price),
        imgUrls: uploadedImageUrls,
      };

      console.log('3. 최종 서버로 전송할 데이터:', finalPayload);

      console.log('✅ 등록이 완료되었습니다.');
    } catch (error) {
      console.error('❌ 등록 중 오류 발생:', error);
    }
  };

  return (
    <Form {...form}>
      <form className="w-full" onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex items-start gap-5">
          <ImageUploadSection form={form} />
          <ProductInfoSection form={form} />
        </div>

        <div className="mb-20 flex items-center justify-center gap-2.5">
          <button
            type="button"
            className="border-custom-gray-100 flex h-11.5 w-42 cursor-pointer items-center justify-center rounded-full border text-sm font-medium"
            onClick={() => console.log('임시저장')}
          >
            임시저장
          </button>
          <button
            type="submit"
            className="bg-custom-brand-secondary text-custom-gray-900 flex h-11.5 w-42 cursor-pointer items-center justify-center rounded-full text-sm font-medium"
          >
            등록하기
          </button>
        </div>
      </form>
    </Form>
  );
}
