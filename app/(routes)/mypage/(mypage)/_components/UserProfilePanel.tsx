import Link from 'next/link';

import ProfileImage from '@/app/_components/shared/ProfileImage';
import { ROUTE_PATHS } from '@/constants';
import { useUserSummary } from '@/lib/queries/useUserQueries';
import toast from '@/lib/toast';
import { formatDateToYMD } from '@/utils/date';

export default function UserProfilePanel() {
  const { data: userData } = useUserSummary();

  const user = userData?.result ?? null;
  const isArtist = user?.role === 'ARTIST';

  return (
    <div className="border-custom-gray-100 flex w-full flex-col items-center justify-center rounded-lg border p-7.5 pt-10">
      <div className="relative h-25 w-25">
        <ProfileImage className="h-full w-full" src={user?.profileImgUrl ?? null} />
        {isArtist && (
          <div className="bg-custom-brand-primary text-custom-background outline-custom-background absolute bottom-0 left-1/2 flex h-6 w-10 -translate-x-1/2 translate-y-1/2 items-center justify-center rounded-full text-xs font-semibold outline-3">
            작가
          </div>
        )}
      </div>

      <p className="text-custom-brand-primary mt-7.5 mb-3 text-center text-2xl font-bold">
        {user?.nickname}
      </p>

      <div className="flex flex-wrap items-center justify-center gap-1">
        <div className="bg-custom-ivory-50 text-custom-brand-primary rounded-sm px-1.5 py-0.75 text-xs font-semibold">
          네이버
        </div>
        <p className="text-custom-gray-300 text-sm font-medium">{user?.email}</p>
      </div>

      <p className="text-custom-gray-300 mt-0.5 mb-4 text-sm font-medium">
        {user?.createdAt ? `${formatDateToYMD(user.createdAt)} 부터 활동` : null}
      </p>

      <button className="text-custom-brand-primary border-custom-gray-100 mb-2.5 flex h-12 w-full cursor-pointer items-center justify-center rounded-full border text-sm font-medium">
        내 정보 관리
      </button>

      {isArtist ? (
        <Link
          href={ROUTE_PATHS.ARTIST(String(user.id))}
          className="bg-custom-brand-secondary text-custom-gray-900 flex h-12 w-full items-center justify-center rounded-full text-sm font-medium"
        >
          내 작품 피드로 이동
        </Link>
      ) : (
        <button
          onClick={() => toast.error('아직 준비 중인 기능입니다')}
          className="bg-custom-brand-secondary text-custom-gray-900 flex h-12 w-full cursor-pointer items-center justify-center rounded-full text-sm font-medium"
        >
          작가 신청
        </button>
      )}
    </div>
  );
}
