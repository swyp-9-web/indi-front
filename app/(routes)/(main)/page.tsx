import Link from 'next/link';

import Footer from '@/app/_components/shared/Footer';
import { ROUTE_PATHS } from '@/constants';

import CategoryFilter from './_components/CategoryFilter';
import DefaultProductsSection from './_components/DefaultProductsSection';
import HeroSection from './_components/HeroSection';
import SpecialProductsSection from './_components/SpecialProductsSection';

// TODO: ProductsSection API 연결 필요
export default function Home() {
  return (
    <>
      <div className="pt-14" />

      <HeroSection />

      <section className="w-8xl mx-auto mt-25 px-20">
        <CategoryFilter />
        <DefaultProductsSection />
      </section>

      <section className="bg-custom-brand-primary mt-25 py-12.5">
        <SpecialProductsSection title="주목할 만한 작품" variant="primary" />
      </section>

      <section className="w-8xl mx-auto mt-25 px-20">
        <DefaultProductsSection />
        <Link
          href={ROUTE_PATHS.PRODUCTS}
          className="border-custom-gray-100 mx-auto mt-12.5 flex h-12 w-29 items-center justify-center rounded-full border text-sm font-medium"
        >
          모두보기
        </Link>
      </section>

      <section className="bg-custom-brand-secondary mt-25 py-12.5">
        <SpecialProductsSection title="반응 좋은 작품" variant="secondary" />
      </section>

      <Footer className="mt-27.5" />
    </>
  );
}
