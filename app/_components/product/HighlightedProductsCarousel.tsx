'use client';

import { useRef } from 'react';

import { Swiper as SwiperType } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import { Swiper, SwiperSlide } from 'swiper/react';

import { Product } from '@/lib/apis/products.type';
import { ArrowNextIcon, ArrowPrevIcon } from '@/lib/icons';
import { cn } from '@/lib/utils';

import ProductCard from './ProductCard';

interface HighlightedProductsCarouselProps {
  title: React.ReactNode;
  variant: 'primary' | 'secondary';
  hasScrapCount?: boolean;
  products: Product[];
  className?: string;
}

export default function HighlightedProductsCarousel({
  title,
  variant,
  hasScrapCount = false,
  products,
  className,
}: HighlightedProductsCarouselProps) {
  const swiperRef = useRef<SwiperType | null>(null);

  const handleNavigationButtonClick = (buttonType: 'prev' | 'next') => {
    if (buttonType === 'prev') {
      swiperRef.current?.slidePrev();
    }

    if (buttonType === 'next') {
      swiperRef.current?.slideNext();
    }
  };

  return (
    <section
      className={cn(
        'h-135 py-12.5',
        variant === 'primary' ? 'bg-custom-brand-primary' : 'bg-custom-brand-secondary',
        className
      )}
    >
      <div className="w-8xl relative mx-auto px-20">
        <h2
          className={cn(
            'mb-7.5 text-2xl font-bold',
            variant === 'primary' ? 'text-custom-background' : 'text-custom-brand-primary'
          )}
        >
          {title}
        </h2>

        {products.length > 4 && (
          <>
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
          </>
        )}

        <Swiper
          spaceBetween={20}
          slidesPerView={4}
          loop
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
          }}
          className="w-full"
        >
          {products.map((product) => (
            <SwiperSlide key={product.id}>
              <ProductCard
                product={product}
                textColor={variant === 'primary' ? 'light' : 'dark'}
                hasScrapCount={hasScrapCount}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
