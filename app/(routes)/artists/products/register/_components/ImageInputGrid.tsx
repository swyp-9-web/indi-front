'use client';

import { useState } from 'react';

import Image from 'next/image';

import { FormControl, FormItem, FormLabel } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { AddPhotoIcon, ProductImageCancelIcon } from '@/lib/icons';

interface ImageInputGridProps {
  onChangeImages: (images: Array<File | string>) => void;
  initialImages: Array<File | string>;
}

export default function ImageInputGrid({ onChangeImages, initialImages }: ImageInputGridProps) {
  const [images, setImages] = useState<Array<File | string>>(initialImages ?? []);
  const [blobUrls, setBlobUrls] = useState<Map<File, string>>(new Map());

  // 새로 업로드한 파일을 images 배열에 추가하고, 최대 8개까지만 유지합니다.
  // 추가된 File에 대해 Blob URL을 생성해서 blobUrls Map에 저장합니다.
  const handleImagesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const files = Array.from(e.target.files);

    const newImages = [...images, ...files].slice(0, 8);
    setImages(newImages);
    onChangeImages(newImages);

    const newBlobUrls = new Map(blobUrls);
    files.forEach((file) => {
      const url = URL.createObjectURL(file);
      newBlobUrls.set(file, url);
    });
    setBlobUrls(newBlobUrls);
  };

  // 이미지 삭제 시, images 배열에서 해당 item을 제거합니다.
  // 만약 File 타입이라면, Blob URL을 revoke 해주고 blobUrls Map에서도 제거합니다.
  const handleImageDeleteButtonClick = (target: File | string) => {
    const newImages = images.filter((item) => item !== target);

    setImages(newImages);
    onChangeImages(newImages);

    if (target instanceof File) {
      const newBlobUrls = new Map(blobUrls);

      const url = blobUrls.get(target);

      if (url) URL.revokeObjectURL(url);
      newBlobUrls.delete(target);

      setBlobUrls(newBlobUrls);
    }
  };

  // 미리보기 src를 반환합니다.
  // 서버에서 받은 URL(string)은 그대로, File 타입은 blobUrls Map에서 찾아 반환합니다.
  const getImageSrc = (item: File | string) => {
    if (typeof item === 'string') return item;
    return blobUrls.get(item) ?? '';
  };

  return (
    <>
      <div className="grid grid-cols-2 gap-2.5">
        {images.map((image, idx) => (
          <div key={getImageSrc(image)} className="relative h-50 w-50 rounded-lg">
            <Image
              unoptimized
              quality={100}
              src={getImageSrc(image)}
              alt={`preview ${idx + 1}`}
              fill
              className="rounded-lg object-cover"
            />
            {idx === 0 && (
              <div className="border-custom-gray-100 bg-custom-background text-custom-gray-900 absolute top-2 left-2 flex h-7 w-11 items-center justify-center rounded-full border text-xs">
                메인
              </div>
            )}
            <button
              type="button"
              onClick={() => handleImageDeleteButtonClick(image)}
              className="absolute top-2 right-2 cursor-pointer"
            >
              <ProductImageCancelIcon />
            </button>
          </div>
        ))}

        {images.length < 8 && (
          <FormItem>
            <FormLabel className="bg-custom-ivory-100 flex h-50 w-50 cursor-pointer flex-col items-center justify-center rounded-lg">
              <AddPhotoIcon />
              <p className="text-custom-brand-primary text-sm font-medium">이미지 등록</p>
            </FormLabel>
            <FormControl>
              <Input
                type="file"
                multiple
                accept="image/*"
                onChange={handleImagesChange}
                className="hidden"
              />
            </FormControl>
          </FormItem>
        )}
      </div>
    </>
  );
}
