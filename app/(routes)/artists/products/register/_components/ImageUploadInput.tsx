import { useEffect, useState } from 'react';

import Image from 'next/image';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { AddPhotoIcon, ProductImageCancelIcon } from '@/lib/icons';

interface ImageUploadInputProps {
  images: (string | File)[];
  onChangeImages: (images: (string | File)[]) => void;
}

export default function ImageUploadInput({ images, onChangeImages }: ImageUploadInputProps) {
  const [previewUrls, setPreviewUrls] = useState<Map<File, string>>(new Map()); // File(key): url(value)

  // 새로 업로드한 파일을 images 배열에 추가하고, 최대 8개까지만 유지합니다.
  // 추가된 File에 대해 preview URL을 생성해서 previewUrls Map에 저장합니다.
  const handleImagesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // 아무것도 선택하지 않은 경우 early return
    if (!e.target.files) return;

    const files = [...e.target.files];

    const newImages = [...images, ...files].slice(0, 8);
    onChangeImages(newImages);

    // 새로 선택된 files에 대한 previewUrl 생성
    const newPreviewUrls = new Map(previewUrls);
    files.forEach((file) => {
      const url = URL.createObjectURL(file);
      newPreviewUrls.set(file, url);
    });
    setPreviewUrls(newPreviewUrls);
  };

  // 이미지 삭제 시, images 배열에서 해당 item을 제거합니다.
  // 만약 File 타입이라면, previewUrl을 revoke하고 previewUrls Map에서 제거합니다.
  const handleImageDeleteButtonClick = (target: File | string) => {
    const newImages = images.filter((item) => item !== target);
    onChangeImages(newImages);

    // target이 File인 경우, previewUrls에서 해당 File의 URL을 revoke
    if (target instanceof File) {
      const newPreviewUrls = new Map(previewUrls);

      // target에 연결된 URL revoke
      const urlToRevoke = previewUrls.get(target);
      if (urlToRevoke) URL.revokeObjectURL(urlToRevoke);

      // 새로 만든 Map에서 key가 target file인 값 제거
      newPreviewUrls.delete(target);
      setPreviewUrls(newPreviewUrls);
    }
  };

  // 미리보기 src를 반환합니다.
  // 서버에서 받은 URL(string)은 그대로, File 타입은 blobUrls Map에서 찾아 반환합니다.
  const getImageSrc = (item: File | string) => {
    if (typeof item === 'string') return item;
    return previewUrls.get(item) ?? '';
  };

  // 언마운트시 URL revoke
  useEffect(() => {
    return () => {
      previewUrls.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [previewUrls]);

  return (
    <div className="border-custom-gray-100 mb-15 w-117.5 rounded-lg border px-7.5 py-7.5">
      <h3 className="text-custom-brand-primary mb-1 text-lg font-bold">
        작품 이미지<span className="text-custom-status-notice">*</span>
      </h3>
      <p className="text-custom-brand-primary mb-9 text-sm">
        작품 이미지는 1:1 비율로 보여져요. 개당 최대 50MB 이하의 이미지만 업로드가 가능하며,{' '}
        <span className="text-custom-status-notice font-semibold">최대 8장</span>까지 추가할 수
        있어요.
      </p>

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
          <Label className="bg-custom-ivory-100 flex h-50 w-50 cursor-pointer flex-col items-center justify-center rounded-lg">
            <AddPhotoIcon />
            <p className="text-custom-brand-primary text-sm font-medium">이미지 등록</p>
            <Input
              type="file"
              multiple
              accept=".png, .jpg, .jpeg"
              onChange={handleImagesChange}
              className="hidden"
            />
          </Label>
        )}
      </div>
    </div>
  );
}
