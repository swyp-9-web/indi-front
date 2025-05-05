import { FollowingArtist } from '@/lib/apis/following.type';

import FollowingArtistRow from './FollowingArtistRow';
import InfiniteArtistList from './InfiniteArtistList';

interface FollowingArtistListProps {
  artists: FollowingArtist[];
}

export default function FollowingArtistList({ artists }: FollowingArtistListProps) {
  return (
    <ul className="flex flex-col gap-15">
      {artists.map((artist) => (
        <FollowingArtistRow key={artist.id} artist={artist} />
      ))}

      <InfiniteArtistList />
    </ul>
  );
}
