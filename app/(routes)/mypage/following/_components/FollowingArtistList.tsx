import { Meta } from '@/lib/apis/common.type';
import { FollowingArtist } from '@/lib/apis/following.type';

import FollowingArtistRow from './FollowingArtistRow';
import InfiniteArtistList from './InfiniteArtistList';

interface FollowingArtistListProps {
  artists: FollowingArtist[];
  meta: Meta | undefined;
}

export default function FollowingArtistList({ artists, meta }: FollowingArtistListProps) {
  return (
    <ul className="flex flex-col gap-15">
      {artists.map((artist) => (
        <FollowingArtistRow key={artist.id} artist={artist} />
      ))}

      {meta?.hasNextPage && <InfiniteArtistList />}
    </ul>
  );
}
