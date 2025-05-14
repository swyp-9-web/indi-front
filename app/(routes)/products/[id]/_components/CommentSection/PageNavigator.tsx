import { PageArrowLeftIcon, PageArrowRightIcon } from '@/lib/icons';
import { cn } from '@/lib/utils';

interface PageNavigatorProps {
  currentPage: number;
  totalPage: number;
  onPageChange: (page: number) => void;
}

export default function PageNavigator({
  currentPage,
  totalPage,
  onPageChange,
}: PageNavigatorProps) {
  const pageRangeSize = 5; // 한번에 총 몇개의 페이지 보여줄지
  const currentGroup = Math.floor((currentPage - 1) / pageRangeSize);
  const startPage = currentGroup * pageRangeSize + 1;
  const endPage = Math.min(startPage + pageRangeSize - 1, totalPage);

  const handlePrevGroup = () => {
    const prevGroupLastPage = startPage - 1;
    if (prevGroupLastPage > 0) {
      onPageChange(prevGroupLastPage);
    }
  };

  const handleNextGroup = () => {
    const nextGroupFirstPage = endPage + 1;
    if (nextGroupFirstPage <= totalPage) {
      onPageChange(nextGroupFirstPage);
    }
  };

  return (
    <div className="mt-7.5 flex items-center justify-center gap-2.5">
      <button onClick={handlePrevGroup} disabled={startPage === 1} className="cursor-pointer">
        <PageArrowLeftIcon
          className={cn(startPage === 1 ? 'text-custom-gray-200' : 'text-custom-brand-primary')}
        />
      </button>

      {Array.from({ length: endPage - startPage + 1 }, (_, i) => {
        const page = startPage + i;

        return (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={cn(
              'flex cursor-pointer items-center justify-center px-3 py-0.5 text-2xl font-semibold',
              currentPage === page
                ? 'border-custom-gray-100 text-custom-brand-primary rounded-lg border'
                : 'text-custom-gray-200'
            )}
          >
            {page}
          </button>
        );
      })}

      <button onClick={handleNextGroup} disabled={endPage === totalPage} className="cursor-pointer">
        <PageArrowRightIcon
          className={cn(
            endPage === totalPage ? 'text-custom-gray-200' : 'text-custom-brand-primary'
          )}
        />
      </button>
    </div>
  );
}
