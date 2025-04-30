'use client';

import Footer from '@/app/_components/shared/Footer';
import ScrollToTopButton from '@/app/_components/shared/ScrollToTopButtont';

import CategoryFilter from './_components/CategoryFilter';
import DefaultProductsSection from './_components/DefaultProductsSection';
import HeroSection from './_components/HeroSection';
import InfiniteProductsSection from './_components/InfiniteProductsSection';
import SpecialProductsSection from './_components/SpecialProductsSection';

// TODO: 상품 리스트 관련 API 연결 필요
export default function Home() {
  return (
    <>
      <HeroSection />

      <div className="w-8xl mx-auto mt-15 px-21">
        <h2 className="text-custom-brand-primary mb-5 text-2xl font-bold">아르테고의 최신 작품</h2>
        <CategoryFilter />
      </div>

      <DefaultProductsSection />
      <SpecialProductsSection title="주목할 만한 작품" variant="primary" />
      <DefaultProductsSection />
      <SpecialProductsSection title="반응 좋은 작품" variant="secondary" />
      <InfiniteProductsSection />

      <Footer className="mt-27.5" />

      <ScrollToTopButton />
    </>
  );
}
