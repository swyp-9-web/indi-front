import Image from 'next/image';
import { redirect } from 'next/navigation';

import ProfileImage from '@/app/_components/shared/ProfileImage';
import { ROUTE_PATHS } from '@/constants';
import { fetchArtistDetail, fetchUserSummary } from '@/lib/apis/user.api';
import { AddIcon, CheckIcon, LinkIcon, ShareIcon } from '@/lib/icons';
import { cn } from '@/lib/utils';
import { formatOverThousand } from '@/utils/formatNumber';
import { detectPlatformFromUrl } from '@/utils/url';

interface ArtistInfoSectionProps {
  artistId: number;
}

export default async function ArtistInfoSection({ artistId }: ArtistInfoSectionProps) {
  const [artistRes, userRes] = await Promise.all([
    fetchArtistDetail(artistId, {
      onError: (_error) => {
        return redirect(ROUTE_PATHS.HOME);
      },
    }),
    fetchUserSummary(),
  ]);

  const isMyPage = artistId === userRes.result?.id;
  const artist = artistRes.result;

  return (
    <section className="relative mt-10 w-66.25">
      <button className="absolute top-0 right-0 h-6 w-6 cursor-pointer">
        <ShareIcon />
      </button>

      <ProfileImage src={artist.profileImgUrl ?? null} className="mx-auto h-25 w-25" />

      <p className="text-custom-brand-primary mx-auto mt-7.5 mb-3 w-60 text-center text-2xl font-bold">
        {artist.nickname}
      </p>
      {isMyPage && (
        <button className="text-custom-brand-primary mx-auto block cursor-pointer text-sm font-medium underline underline-offset-2">
          작가 프로필 수정
        </button>
      )}

      {isMyPage && (
        <div className="mt-10 flex w-full flex-col gap-2.5">
          <button className="border-custom-gray-100 flex h-12 w-full cursor-pointer items-center justify-center rounded-full border text-sm font-medium">
            주문제작 의뢰 보기
          </button>
          <button className="border-custom-gray-100 flex h-12 w-full cursor-pointer items-center justify-center rounded-full border text-sm font-medium">
            임시저장된 글
          </button>
          <button className="bg-custom-brand-secondary text-custom-gray-900 flex h-12 w-full cursor-pointer items-center justify-center rounded-full text-sm font-medium">
            작품 등록
          </button>
        </div>
      )}

      {!isMyPage && (
        <div className="mt-10 flex w-full flex-col gap-2.5">
          <button
            className={cn(
              'border-custom-gray-100 flex h-12 w-full cursor-pointer items-center justify-center rounded-full border text-sm font-medium',
              artist.isFollowing && 'bg-custom-ivory-100'
            )}
          >
            {artist.isFollowing ? (
              <CheckIcon className="!h-6 !w-6" />
            ) : (
              <AddIcon className="!h-6 !w-6" />
            )}
            <span>{artist.isFollowing ? '팔로잉' : '팔로우'}</span>
          </button>
          <button className="bg-custom-brand-secondary text-custom-gray-900 flex h-12 w-full cursor-pointer items-center justify-center rounded-full text-sm font-medium">
            주문제작 의뢰하기
          </button>
        </div>
      )}

      <div className="mt-7.5 flex w-full flex-wrap gap-5.5">
        <div className="w-22">
          <h5 className="text-custom-gray-300 text-xs">작품</h5>
          <div className="text-custom-brand-primary mt-0.5 text-lg font-bold">
            {formatOverThousand(artist.totalItems)}
          </div>
        </div>
        <div className="w-22">
          <h5 className="text-custom-gray-300 text-xs">스크랩수</h5>
          <div className="text-custom-brand-primary mt-0.5 text-lg font-bold">
            {formatOverThousand(artist.totalScraps)}
          </div>
        </div>
        <div className="w-22">
          <h5 className="text-custom-gray-300 text-xs">받은 반응</h5>
          <div className="text-custom-brand-primary mt-0.5 text-lg font-bold">
            {formatOverThousand(artist.totalReactions)}
          </div>
        </div>
        <div className="w-22">
          <h5 className="text-custom-gray-300 text-xs">팔로잉</h5>
          <div className="text-custom-brand-primary mt-0.5 text-lg font-bold">
            {formatOverThousand(artist.totalFollower)}
          </div>
        </div>
      </div>

      <div className="mt-7.5">
        <h5 className="text-custom-gray-300 text-xs">작가 소개</h5>
        <p className="text-custom-brand-primary mt-1 text-sm">{artist.aboutMe}</p>
      </div>

      <div className="mt-7.5 mb-30 w-full">
        <h5 className="text-custom-gray-300 text-xs">웹사이트</h5>
        <ul className="mt-2 flex flex-col gap-1.5">
          {[artist.homeLink, ...artist.snsLinks].map((url) => {
            if (!url) return null;

            const platform = detectPlatformFromUrl(url);

            return (
              <li key={url}>
                <a
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border-custom-gray-100 flex w-full items-center gap-2 rounded-lg border px-2.5 py-2"
                >
                  {platform ? (
                    <Image src={platform.iconSrc} alt={platform.label} width={20} height={20} />
                  ) : (
                    <LinkIcon className="shrink-0" />
                  )}
                  <span className="truncate text-sm">{platform ? platform.label : url}</span>
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
