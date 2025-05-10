'use client';

import { useState } from 'react';

import Image from 'next/image';

interface ProductDetailGalleryProps {
  images: string[];
  title: string;
}

export default function ProductDetailGallery({ images, title }: ProductDetailGalleryProps) {
  const [currentImg, setCurrentImg] = useState(images[0]);

  return (
    <div className="w-full max-w-[706px]">
      <div className="flex gap-5">
        <div role="list" className="flex flex-col gap-2">
          {images.map((src) => (
            <button
              key={src}
              type="button"
              role="listitem"
              onClick={() => setCurrentImg(src)}
              className={`relative h-[4.37rem] w-[4.37rem] overflow-hidden rounded-md ${
                currentImg === src ? 'ring-primary ring-2' : ''
              }`}
            >
              <Image src={src} alt={`${title} 썸네일`} fill className="object-cover" />
            </button>
          ))}
        </div>

        <div className="relative h-[38.5rem] w-[38.5rem] overflow-hidden rounded-md">
          <Image src={currentImg} alt={`${title} 메인 이미지`} fill className="object-cover" />
        </div>
      </div>
    </div>
  );
}
