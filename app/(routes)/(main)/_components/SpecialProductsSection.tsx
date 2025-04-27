'use client';

import { useRef } from 'react';

import { Swiper as SwiperType } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import { Swiper, SwiperSlide } from 'swiper/react';

import ProductCard from '@/app/_components/shared/ProductCard';
import { ArrowNextIcon, ArrowPrevIcon } from '@/lib/icons';
import { productListMock } from '@/lib/mocks/product-list.mock';
import { cn } from '@/lib/utils';

interface SpecialProductsSectionProps {
  title: string;
  variant: 'primary' | 'secondary';
}

export default function SpecialProductsSection({ title, variant }: SpecialProductsSectionProps) {
  const swiperRef = useRef<SwiperType | null>(null);
  const data = productListMock.products;

  const handleNavigationButtonClick = (buttonType: 'prev' | 'next') => {
    if (buttonType === 'prev') {
      swiperRef.current?.slidePrev();
    }

    if (buttonType === 'next') {
      swiperRef.current?.slideNext();
    }
  };

  return (
    <div className="w-8xl relative mx-auto px-20">
      <h2
        className={cn(
          'mb-7.5 text-2xl font-bold',
          variant === 'primary' ? 'text-custom-background' : 'text-custom-brand-primary'
        )}
      >
        {title}
      </h2>

      <button
        onClick={() => handleNavigationButtonClick('prev')}
        className="border-custom-gray-100 bg-custom-background absolute top-46 left-20 z-10 flex h-10.5 w-10.5 -translate-x-1/2 translate-y-1/2 cursor-pointer items-center justify-center rounded-full"
      >
        <ArrowPrevIcon />
      </button>

      <button
        onClick={() => handleNavigationButtonClick('next')}
        className="border-custom-gray-100 bg-custom-background absolute top-46 right-20 z-10 flex h-10.5 w-10.5 translate-x-1/2 translate-y-1/2 cursor-pointer items-center justify-center rounded-full"
      >
        <ArrowNextIcon />
      </button>

      <Swiper
        spaceBetween={20}
        slidesPerView={4}
        loop
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
        className="w-full"
      >
        {data.map((product) => (
          <SwiperSlide key={product.id}>
            <ProductCard product={product} textColor={variant === 'primary' ? 'light' : 'dark'} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
