import { FindInPageIcon } from '@/lib/icons';

export default function NoArtistProducts() {
  return (
    <div className="mt-25 flex flex-col items-center justify-center">
      <FindInPageIcon />
      <h2 className="text-custom-brand-primary mt-4 mb-6 text-center text-2xl font-bold">
        아직 작품이 없습니다.
      </h2>
      <p className="text-custom-gray-400 text-sm">작가님의 새로운 작품을 기대해 주세요!</p>
    </div>
  );
}
