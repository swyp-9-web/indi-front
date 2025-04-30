import HeaderCenterSection from './HeaderCenterSection';
import HeaderLeftSection from './HeaderLeftSection';
import HeaderRightSection from './HeaderRightSection';

export default function GlobalNavBar() {
  return (
    <header className="border-custom-gray-100 bg-custom-background absolute inset-x-0 top-0 z-50 h-14 border-b">
      <div className="w-8xl mx-auto flex h-full items-center justify-between px-6">
        <HeaderLeftSection />
        <HeaderCenterSection />
        <HeaderRightSection />
      </div>
    </header>
  );
}
