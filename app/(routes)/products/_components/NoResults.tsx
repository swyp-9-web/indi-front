import { FindInPageIcon } from '@/lib/icons';

interface NoResultsProps {
  keyword?: string;
}

export default function NoResults({ keyword }: NoResultsProps) {
  return (
    <div className="w-8xl mx-auto mt-20 flex flex-col items-center justify-center">
      <FindInPageIcon />
      <h2 className="text-custom-brand-primary mt-4 mb-6 text-center text-2xl font-bold">
        &quot;{keyword}&quot;에 대한
        <br />
        검색 결과가 없습니다.
      </h2>
      <p className="text-custom-gray-400 text-sm">검색어를 다시 한 번 확인해주세요.</p>
    </div>
  );
}
