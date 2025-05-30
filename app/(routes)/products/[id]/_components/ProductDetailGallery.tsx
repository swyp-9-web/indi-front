'use client';

import { useState } from 'react';

import Image from 'next/image';

import { cn } from '@/lib/utils';

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
              key={`${src}-${idx}`}
              type="button"
              role="listitem"
              onClick={() => setCurrentIndex(idx)}
              className={cn(
                'relative h-17.5 w-17.5 overflow-hidden rounded-md',
                currentIndex === idx && 'ring-primary ring-2'
              )}
            >
              <Image
                src={src}
                alt={`${title} 썸네일`}
                quality={50}
                fill
                loading="lazy"
                sizes="70px"
                className="object-cover"
              />
            </button>
          ))}
        </div>

        <div className="relative h-154 w-154 overflow-hidden rounded-md">
          <Image
            src={images[currentIndex]}
            alt={`${title} 메인 이미지`}
            fill
            loading={currentIndex === 0 ? 'eager' : 'lazy'}
            priority={currentIndex === 0}
            sizes="(max-width: 768px) 100vw, 616px"
            className="object-cover"
          />
        </div>
      </div>
    </div>
  );
}
