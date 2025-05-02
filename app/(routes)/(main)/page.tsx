'use client';

import ScrollToTopButton from '@/app/_components/shared/ScrollToTopButton';

import DefaultProductsFilter from './_components/DefaultProductsFilter';
import DefaultProductsSection from './_components/DefaultProductsSection';
import HeroSection from './_components/HeroSection';
import InfiniteProductsSection from './_components/InfiniteProductsSection';
import SpecialProductsSection from './_components/SpecialProductsSection';

export default function Home() {
  return (
    <>
      <HeroSection />

      <div className="w-8xl mx-auto mt-15 px-21">
        <h2 className="text-custom-brand-primary mb-5 text-2xl font-bold">아르테고의 최신 작품</h2>
        <DefaultProductsFilter />
      </div>

      <DefaultProductsSection />
      <SpecialProductsSection title="주목할 만한 작품" variant="primary" />
      <DefaultProductsSection />
      <SpecialProductsSection title="반응 좋은 작품" variant="secondary" />
      <InfiniteProductsSection />

      <ScrollToTopButton />
    </>
  );
}
