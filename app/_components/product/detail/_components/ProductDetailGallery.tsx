'use client';

import { useState } from 'react';

import Image from 'next/image';

interface ProductDetailGalleryProps {
  images: string[];
  title: string;
}

export default function ProductDetailGallery({ images, title }: ProductDetailGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  return (
    <div className="w-full max-w-[706px]">
      <div className="flex gap-5">
        <div role="list" className="flex flex-col gap-2">
          {images.map((src, idx) => (
            <button
              key={src}
              type="button"
              role="listitem"
              onClick={() => setCurrentIndex(idx)}
              className={`relative h-17.5 w-17.5 overflow-hidden rounded-md ${
                currentIndex === idx ? 'ring-primary ring-2' : ''
              }`}
            >
              <Image src={src} alt={`${title} 썸네일`} fill className="object-cover" />
            </button>
          ))}
        </div>

        <div className="relative h-154 w-154 overflow-hidden rounded-md">
          <Image
            src={images[currentIndex]}
            alt={`${title} 메인 이미지`}
            fill
            className="object-cover"
          />
        </div>
      </div>
    </div>
  );
}
