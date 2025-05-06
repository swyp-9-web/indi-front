import { FindInPageIcon } from '@/lib/icons';

export default function NoFollowingArtists() {
  return (
    <div className="mt-25 flex flex-col items-center justify-center">
      <FindInPageIcon />
      <h2 className="text-custom-brand-primary mt-4 mb-6 text-center text-2xl font-bold">
        아직 팔로잉 중인 작가가 없습니다.
      </h2>
      <p className="text-custom-gray-400 text-sm">팔로잉하고 작가의 최신 작품을 탐색하세요.</p>
    </div>
  );
}
