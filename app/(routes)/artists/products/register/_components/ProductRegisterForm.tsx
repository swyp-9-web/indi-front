import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { useRouter } from 'next/navigation';

import { zodResolver } from '@hookform/resolvers/zod';

import { Form } from '@/components/ui/form';
import { ROUTE_PATHS } from '@/constants';
import { useRegisterProduct } from '@/lib/queries/useProductsQueries';
import { FormValues, productRegisterFormSchema } from '@/lib/schemas/productRegisterForm.schema';
import toast from '@/lib/toast';
import { useProductRegisterForm } from '@/stores/useProductRegisterForm';

import ImageUploadInput from './ImageUploadInput';
import ProductInfoInputs from './ProductInfoInputs';

export default function ProductRegisterForm() {
  const router = useRouter();
  const { mode, initialValues, initialImgUrls, resetFormState } = useProductRegisterForm();

  const [productImages, setProductImages] = useState<(string | File)[]>(initialImgUrls);
  const [imageOrder, setImageOrder] = useState<string[]>(initialImgUrls);

  const [submitType, setSubmitType] = useState<'TEMP' | 'OPEN'>('OPEN');

  const form = useForm<FormValues>({
    resolver: zodResolver(productRegisterFormSchema),
    defaultValues: initialValues ?? {
      title: '',
      categoryType: '',
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

  const handleChangeImagesInput = (images: (string | File)[]) => {
    setProductImages(images);

    const newImageOrder = images.map((item) => (typeof item === 'string' ? item : item.name));
    setImageOrder(newImageOrder);
  };

  const { mutate: registerProduct } = useRegisterProduct();

  const handleSubmit = async (formValues: FormValues) => {
    if (mode !== 'CREATE' || submitType === 'TEMP') return;

    const formData = new FormData();

    const { priceType: _priceType, ...formValuesWithoutPriceType } = formValues;

    const requestPayload = {
      ...formValuesWithoutPriceType,

      // 빈 값인 경우 0으로 반환 (백엔드 요청)
      price: formValues.price ? formValues.price : 0,
      size: {
        width: formValues.size?.width ? formValues.size.width : 0,
        height: formValues.size?.height ? formValues.size.height : 0,
        depth: formValues.size?.depth ? formValues.size.depth : 0,
      },

      // 상품 등록 상태 (OPEN, TEMP 등...)
      statusType: submitType,

      // 이미지 파일의 순서를 서버에 전달하기 위한 필드
      imageOrder,
    };

    formData.append('request', JSON.stringify(requestPayload));

    productImages.forEach((item) => {
      if (item instanceof File) {
        formData.append('images', item);
      }
    });

    registerProduct(formData, {
      onSuccess: (data) => {
        const productId = data.result.itemId;
        router.replace(ROUTE_PATHS.PRODUCT_DETAIL(String(productId)));

        resetFormState();

        toast.default('상품을 등록하였습니다');
      },
      onError: () => {
        toast.error('잠시 후 다시 시도해주세요');
      },
    });
  };

  return (
    <Form {...form}>
      <form className="w-full" onSubmit={form.handleSubmit(handleSubmit)}>
        <div className="flex items-start gap-5">
          <ImageUploadInput images={productImages} onChangeImages={handleChangeImagesInput} />
          <ProductInfoInputs form={form} />
        </div>

        <div className="mb-20 flex items-center justify-center gap-2.5">
          <button
            type="submit"
            onClick={() => setSubmitType('TEMP')}
            className="border-custom-gray-100 flex h-11.5 w-42 cursor-pointer items-center justify-center rounded-full border text-sm font-medium"
          >
            임시저장
          </button>
          <button
            type="submit"
            onClick={() => setSubmitType('OPEN')}
            className="bg-custom-brand-secondary text-custom-gray-900 flex h-11.5 w-42 cursor-pointer items-center justify-center rounded-full text-sm font-medium"
          >
            등록하기
          </button>
        </div>
      </form>
    </Form>
  );
}
