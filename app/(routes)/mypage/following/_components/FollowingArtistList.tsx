import FollowingArtistRow from './FollowingArtistRow';
import InfiniteArtistList from './InfiniteArtistList';

export default function FollowingArtistList() {
  return (
    <ul className="flex flex-col gap-15">
      <FollowingArtistRow />
      <FollowingArtistRow />
      <FollowingArtistRow />
      <FollowingArtistRow />
      <FollowingArtistRow />

      <InfiniteArtistList />
    </ul>
  );
}
