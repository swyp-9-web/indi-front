'use client';

interface StatusProps {
  status: string;
  rejCount: number;
}

export default function Status({ status, rejCount }: StatusProps) {
  const displayStatus =
    status === 'PENDING'
      ? '보류'
      : status === 'REJECTED'
        ? '반려'
        : status === 'APPROVED'
          ? '승인'
          : status;

  const statusColor =
    status === 'PENDING'
      ? 'text-yellow-500 border-yellow-500'
      : status === 'REJECTED'
        ? 'text-red-500 border-red-500'
        : status === 'APPROVED'
          ? 'text-green-500 border-green-500'
          : 'text-gray-900 border-gray-900';

  const countColor = rejCount > 0 ? 'text-red-500' : 'text-green-500';

  return (
    <div className="px-4 text-center align-middle text-sm">
      <div className={`rounded-2xl border-[1px] px-1 py-0.5 ${statusColor}`}>
        {displayStatus} / <span className={countColor}>{rejCount}</span>
      </div>
    </div>
  );
}
