import ProfileImage from '@/app/_components/shared/ProfileImage';

export default function UserProfilePanel() {
  const isArtist = true;

  return (
    <div className="border-custom-gray-100 flex w-full flex-col items-center justify-center rounded-lg border p-7.5 pt-10">
      <div className="relative h-25 w-25">
        <ProfileImage className="h-full w-full" src={null} />
        {isArtist && (
          <div className="bg-custom-brand-primary text-custom-background outline-custom-background absolute bottom-0 left-1/2 flex h-6 w-10 -translate-x-1/2 translate-y-1/2 items-center justify-center rounded-full text-xs font-semibold outline-3">
            작가
          </div>
        )}
      </div>

      <p className="text-custom-brand-primary mt-7.5 mb-3 text-center text-2xl font-bold">
        유저명유저명유저명유저명유저명유저명유저명
      </p>

      <div className="flex flex-wrap items-center justify-center gap-1">
        <div className="bg-custom-ivory-50 text-custom-brand-primary rounded-sm px-1.5 py-0.75 text-xs font-semibold">
          네이버
        </div>
        <p className="text-custom-gray-300 text-sm font-medium">sfefw123123132adevdfs@naver.com</p>
      </div>

      <p className="text-custom-gray-300 mt-0.5 mb-4 text-sm font-medium">2025.04.25. 부터 활동</p>

      <button className="text-custom-brand-primary border-custom-gray-100 mb-2.5 flex h-12 w-full cursor-pointer items-center justify-center rounded-full border text-sm font-medium">
        내 정보 관리
      </button>

      {isArtist ? (
        <button className="bg-custom-brand-secondary text-custom-gray-900 flex h-12 w-full cursor-pointer items-center justify-center rounded-full text-sm font-medium">
          내 작품 피드로 이동
        </button>
      ) : (
        <button className="bg-custom-brand-secondary text-custom-gray-900 flex h-12 w-full cursor-pointer items-center justify-center rounded-full text-sm font-medium">
          작가 신청
        </button>
      )}
    </div>
  );
}
