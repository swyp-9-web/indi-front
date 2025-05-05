'use client';

export default function InfiniteArtistList() {
  const startInfinite = false;
  const hasNextPage = true;

  return (
    <>
      {!startInfinite && hasNextPage && (
        <button className="border-custom-gray-100 text-custom-brand-primary mx-auto mt-20 flex h-11.5 w-46 cursor-pointer items-center justify-center rounded-full border text-sm font-medium">
          더보기
        </button>
      )}

      <div className="mb-25" />
    </>
  );
}
