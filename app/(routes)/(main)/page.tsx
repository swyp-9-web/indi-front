'use client';

import Footer from '@/app/_components/shared/Footer';

import CategoryFilter from './_components/CategoryFilter';
import DefaultProductsSection from './_components/DefaultProductsSection';
import HeroSection from './_components/HeroSection';
import InfiniteProductsSection from './_components/InfiniteProductsSection';
import SpecialProductsSection from './_components/SpecialProductsSection';

// TODO: 상품 리스트 관련 API 연결 필요
export default function Home() {
  return (
    <>
      <div className="pt-14" />

      <HeroSection />

      <section className="w-8xl mx-auto mt-15 px-21">
        <CategoryFilter />
        <DefaultProductsSection />
      </section>

      <section className="bg-custom-brand-primary mt-25 py-12.5">
        <SpecialProductsSection title="주목할 만한 작품" variant="primary" />
      </section>

      <section className="w-8xl mx-auto mt-25 px-21">
        <DefaultProductsSection />
      </section>

      <section className="bg-custom-brand-secondary mt-25 py-12.5">
        <SpecialProductsSection title="반응 좋은 작품" variant="secondary" />
      </section>

      <section className="w-8xl mx-auto mt-25 px-21">
        <InfiniteProductsSection />
      </section>

      <Footer className="mt-27.5" />
    </>
  );
}
