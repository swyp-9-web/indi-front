'use client';

import { useState } from 'react';

import Image from 'next/image';

import { cn } from '@/lib/utils';

interface ProductDetailImagesProps {
  images: string[];
}

export default function ProductDetailImages({ images }: ProductDetailImagesProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  return (
    <div className="flex gap-4">
      {/* 썸네일 리스트 */}
      <div className="flex flex-col gap-2">
        {images.map((src, index) => (
          <button
            key={index}
            onClick={() => setSelectedIndex(index)}
            className={cn(
              'relative h-[4.37rem] w-[4.37rem] overflow-hidden rounded-md border',
              selectedIndex === index ? 'border-black' : 'border-transparent'
            )}
          >
            <Image src={src} alt={`thumb-${index}`} fill className="object-cover" />
          </button>
        ))}
      </div>

      {/* 메인 이미지 */}
      <div className="relative h-[38.5rem] w-[38.5rem] overflow-hidden rounded-md">
        <Image
          src={images[selectedIndex]}
          alt="selected-product-image"
          fill
          className="object-cover"
        />
      </div>
    </div>
  );
}
