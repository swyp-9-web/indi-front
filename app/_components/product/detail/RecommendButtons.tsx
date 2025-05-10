import { formatOverThousand } from '@/utils/formatNumber';

interface RecommendButtonsProps {
  likes: number;
  wants: number;
  revisits: number;
}

export default function RecommendButtons({ likes, wants, revisits }: RecommendButtonsProps) {
  return (
    <div className="flex gap-1.5">
      <div className="border-custom-gray-100 text-custom-brand-primary rounded-4xl border-[1px] px-[13px] py-[8px] text-[14px]">
        💖 마음에 들어요 {formatOverThousand(likes)}
      </div>
      <div className="border-custom-gray-100 text-custom-brand-primary rounded-4xl border-[1px] px-[13px] py-[8px] text-[14px]">
        🖼️ 소장하고 싶어요 {formatOverThousand(wants)}
      </div>
      <div className="border-custom-gray-100 text-custom-brand-primary rounded-4xl border-[1px] px-[13px] py-[8px] text-[14px]">
        👀 또 보고 싶어요 {formatOverThousand(revisits)}
      </div>
    </div>
  );
}
