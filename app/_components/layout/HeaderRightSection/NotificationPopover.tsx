import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { NotificationIcon, NotificationUnreadIcon } from '@/lib/icons';

export default function NotificationPopover() {
  const hasUnreadNotification = false;

  return (
    <Popover>
      <PopoverTrigger className="flex h-9.5 w-9.5 cursor-pointer items-center justify-center">
        {hasUnreadNotification ? (
          <NotificationUnreadIcon className="h-6 w-6" />
        ) : (
          <NotificationIcon className="h-6 w-6" />
        )}
      </PopoverTrigger>
      <PopoverContent
        align="end"
        sideOffset={4}
        alignOffset={-10}
        className="bg-custom-background border-custom-gray-100 z-10 w-80 rounded-none border p-0 shadow-none"
      >
        <div className="flex h-11.5 w-full items-center justify-between border-b px-5">
          <h3 className="text-custom-brand-primary text-sm font-medium">읽지 않은 알림 (0)</h3>
          <button className="text-custom-brand-primary cursor-pointer text-xs font-semibold underline underline-offset-2">
            모두 읽음
          </button>
        </div>

        <div className="text-custom-gray-200 flex h-35 w-full items-center justify-center text-xs">
          새로운 알림이 없습니다
        </div>
      </PopoverContent>
    </Popover>
  );
}
