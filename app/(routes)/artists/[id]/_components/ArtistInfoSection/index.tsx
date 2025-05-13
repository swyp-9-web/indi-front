import Image from 'next/image';
import { redirect } from 'next/navigation';

import ProfileImage from '@/app/_components/shared/ProfileImage';
import { ROUTE_PATHS } from '@/constants';
import { fetchArtistDetail, fetchUserSummary } from '@/lib/apis/user.api';
import { LinkIcon, ShareIcon } from '@/lib/icons';
import { formatOverThousand } from '@/utils/formatNumber';
import { detectPlatformFromUrl } from '@/utils/url';

import { ArtistButtonGroups, ShareLinkButton, UserButtonGroups } from './ArtistInfoButtonGroups';
import EditProfileDialogButton from './EditProfileDialogButton';

interface ArtistInfoSectionProps {
  artistId: number;
}

export default async function ArtistInfoSection({ artistId }: ArtistInfoSectionProps) {
  const [artistRes, userRes] = await Promise.all([
    fetchArtistDetail(artistId, {
      onError: () => {
        return redirect(ROUTE_PATHS.HOME);
      },
    }),
    fetchUserSummary(),
  ]);

  const isMyPage = artistId === userRes.result?.id;
  const artist = artistRes.result;

  return (
    <section className="relative mt-10 w-66.25">
      <ShareLinkButton />

      <ProfileImage src={artist.profileImgUrl} className="mx-auto h-25 w-25" />

      <p className="text-custom-brand-primary mx-auto mt-7.5 mb-3 w-60 text-center text-2xl font-bold">
        {artist.nickname}
      </p>
      {isMyPage && <EditProfileDialogButton artist={artist} />}

      {isMyPage && <ArtistButtonGroups />}

      {!isMyPage && <UserButtonGroups artist={artist} />}

      <div className="mt-7.5 flex w-full flex-wrap gap-5.5">
        {[
          { label: '작품', value: artist.totalItems },
          { label: '스크랩수', value: artist.totalScraps },
          { label: '받은반응', value: artist.totalReactions },
          { label: '팔로잉', value: artist.totalFollower },
        ].map((item) => (
          <div key={item.label} className="w-22">
            <h5 className="text-custom-gray-300 text-xs">{item.label}</h5>
            <div className="text-custom-brand-primary mt-0.5 text-lg font-bold">
              {formatOverThousand(item.value)}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-7.5">
        <h5 className="text-custom-gray-300 text-xs">작가 소개</h5>
        <p className="text-custom-brand-primary mt-1 text-sm whitespace-pre-line">
          {artist.aboutMe}
        </p>
      </div>

      {artist.homeLink && artist.snsLinks.length === 0 && (
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
      )}
    </section>
  );
}
