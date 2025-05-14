import toast from '@/lib/toast';

import DeleteAccountDialog from './DeleteAccountDialog';

export default function UserSupportSection() {
  return (
    <div className="mt-47.5 w-full">
      <button
        onClick={() => toast.error('아직 준비 중인 기능입니다')}
        className="text-custom-brand-primary border-custom-gray-100 mb-2.5 h-12 w-full cursor-pointer items-center justify-center rounded-lg border text-sm font-medium"
      >
        고객센터
      </button>

      <DeleteAccountDialog />
    </div>
  );
}
