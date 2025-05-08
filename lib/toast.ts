import { toast as sonner } from 'sonner';

const toast = {
  default: (title: string, options: { duration: number } = { duration: 3000 }) =>
    sonner(title, {
      duration: options.duration,
      classNames: {
        toast:
          'left-1/2 -translate-x-1/2 !w-auto !py-2 !rounded-full !border-custom-background !bg-custom-brand-primary',
        title: 'text-xs !text-custom-background',
      },
    }),
  error: (title: string, options: { duration: number } = { duration: 3000 }) =>
    sonner(title, {
      duration: options.duration,
      classNames: {
        toast:
          'left-1/2 -translate-x-1/2 !w-auto !py-2 !rounded-full !border-custom-status-negative !bg-[#F7E6E6]',
        title: 'text-xs !text-custom-status-negative',
      },
    }),
};

export default toast;
