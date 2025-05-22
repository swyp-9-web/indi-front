'use client';

import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useRequireAuth } from '@/hooks/useRequireAuth';
import { CancelIcon, CheckCircleIcon } from '@/lib/icons';
import { useApplyArtist, useUserSummary } from '@/lib/queries/useUserQueries';
import {
  artistApplyFormSchema,
  FormValues,
  MAX_LENGTH,
} from '@/lib/schemas/artistApplyForm.schema';
import toast from '@/lib/toast';

interface ArtistApplicationDialogProps {
  trigger?: React.ReactElement<HTMLButtonElement>;
}

export default function ArtistApplicationDialog({ trigger }: ArtistApplicationDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const dialogContentRef = useRef<HTMLDivElement | null>(null);

  // transition duration 동안 isComplete가 바뀌지 않도록 해서, 일시적으로 form이 보이는 현상을 방지
  useEffect(() => {
    if (!isOpen && dialogContentRef.current) {
      const durationMs =
        parseFloat(window.getComputedStyle(dialogContentRef.current).transitionDuration) * 1000;

      const timer = setTimeout(() => {
        setIsCompleted(false);
      }, durationMs);

      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const { checkAuth } = useRequireAuth();
  const { data } = useUserSummary();

  const user = data?.result ?? null;

  const handleOpenChange = (open: boolean) => {
    if (open) {
      checkAuth(() => {
        if (user && user.role === 'ARTIST') {
          toast.error('이미 작가 입니다.');
        } else {
          setIsOpen(true);
        }
      });
    } else {
      setIsOpen(false);
    }
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={handleOpenChange}>
        {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}

        {!isCompleted ? (
          <DialogContent ref={dialogContentRef} className="w-145 gap-0 sm:max-w-none">
            <DialogHeader>
              <DialogTitle className="text-custom-brand-primary text-2xl font-bold">
                작가 신청하기
              </DialogTitle>
              <DialogDescription className="text-custom-brand-primary mt-14 flex flex-col gap-1.5 text-center text-4xl leading-13 font-bold">
                여러분의 작가 신청을
                <br />
                환영합니다!
                <span className="text-sm font-normal">
                  3가지 질문에 답해주시고 신청하기를 누르세요.
                </span>
              </DialogDescription>
            </DialogHeader>

            <ArtistApplyForm onSubmit={() => setIsCompleted(true)} />
          </DialogContent>
        ) : (
          <DialogContent ref={dialogContentRef} className="w-100 gap-0">
            <DialogHeader className="mb-16">
              <DialogTitle className="text-custom-brand-primary text-2xl font-bold">
                작가 신청
              </DialogTitle>
              <DialogDescription className="text-custom-brand-primary mt-14 text-center text-4xl leading-13 font-bold">
                <CheckCircleIcon className="mx-auto mb-6.5" />
                <span>
                  신청이
                  <br />
                  완료되었습니다!
                </span>
              </DialogDescription>
            </DialogHeader>

            <button
              type="button"
              onClick={() => setIsOpen((prev) => !prev)}
              className="bg-custom-brand-secondary text-custom-gray-900 mx-auto flex h-12 w-72 cursor-pointer items-center justify-center rounded-full text-sm"
            >
              확인
            </button>
          </DialogContent>
        )}
      </Dialog>
    </>
  );
}

interface ArtistApplyFormProps {
  onSubmit: () => void;
}

function ArtistApplyForm({ onSubmit }: ArtistApplyFormProps) {
  const form = useForm<FormValues>({
    resolver: zodResolver(artistApplyFormSchema),
    defaultValues: {
      artistAboutMe: '',
      email: '',
      snsLink: '',
    },
  });

  const handleSubmit = () => {
    onSubmit();
  };

  return (
    <form className="mt-15.5" onSubmit={form.handleSubmit(handleSubmit)}>
      <Form {...form}>
        <FormField
          control={form.control}
          name="artistAboutMe"
          render={({ field }) => (
            <FormItem className="relative block">
              <FormLabel className="data-[error=true]:text-custom-brand-primary mb-1.5 gap-0 text-sm font-semibold">
                질문1 작가 소개를 작성해주세요
                <span className="text-custom-status-notice ml-0.5">*</span>
              </FormLabel>

              <FormControl>
                <Textarea
                  className="border-custom-gray-100 aria-invalid:border-input aria-invalid:focus-visible:ring-ring/50 placeholder:text-custom-gray-200 text-custom-gray-900 h-23.5 w-full resize-none px-4.5 py-3.5 font-medium break-words shadow-none placeholder:text-sm placeholder:font-medium"
                  placeholder="예) 호기심이 많고 고양이를 좋아하는 작가입니다."
                  maxLength={MAX_LENGTH.artistAboutMe}
                  {...field}
                />
              </FormControl>

              <div className="mt-1 flex h-5 items-center justify-between">
                <FormMessage className="text-custom-status-negative text-xs font-semibold" />
                <p className="flex-1 text-right text-xs">
                  <span className="text-custom-status-notice">{field.value.length}</span>/
                  {MAX_LENGTH.artistAboutMe}
                </p>
              </div>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="relative mt-6 block">
              <FormLabel className="data-[error=true]:text-custom-brand-primary mb-1.5 gap-0 text-sm font-semibold">
                질문2 인증가능한 이메일을 입력해주세요.
                <span className="text-custom-status-notice ml-0.5">*</span>
              </FormLabel>

              <FormControl>
                <div className="relative">
                  <Input
                    className="border-custom-gray-100 placeholder:text-custom-gray-200 text-custom-gray-900 h-12 pr-12 pl-4.5 font-medium shadow-none placeholder:text-sm placeholder:font-medium"
                    placeholder="이메일 입력"
                    {...field}
                  />
                  {field.value && (
                    <button
                      type="button"
                      onClick={() => field.onChange('')}
                      className="absolute top-1/2 right-4.5 -translate-y-1/2 cursor-pointer"
                    >
                      <CancelIcon />
                    </button>
                  )}
                </div>
              </FormControl>

              <div className="mt-1 h-4">
                <FormMessage className="text-custom-status-negative text-xs font-semibold" />
              </div>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="snsLink"
          render={({ field }) => (
            <FormItem className="relative mt-6 block">
              <FormLabel className="data-[error=true]:text-custom-brand-primary mb-1.5 gap-0 text-sm font-semibold">
                질문3 작품을 볼 수 있는 링크를 남겨주세요.
                <span className="text-custom-status-notice ml-0.5">*</span>
              </FormLabel>

              <FormControl>
                <div className="relative">
                  <Input
                    className="border-custom-gray-100 placeholder:text-custom-gray-200 text-custom-gray-900 h-12 pr-12 pl-4.5 font-medium shadow-none placeholder:text-sm placeholder:font-medium"
                    placeholder="작품 사이트 입력"
                    {...field}
                  />
                  {field.value && (
                    <button
                      type="button"
                      onClick={() => field.onChange('')}
                      className="absolute top-1/2 right-4.5 -translate-y-1/2 cursor-pointer"
                    >
                      <CancelIcon />
                    </button>
                  )}
                </div>
              </FormControl>

              <div className="mt-1 h-4">
                <FormMessage className="text-custom-status-negative text-xs font-semibold" />
              </div>
            </FormItem>
          )}
        />

        <button
          type="submit"
          className="bg-custom-brand-secondary text-custom-gray-900 mx-auto mt-10 flex h-12 w-49.5 cursor-pointer items-center justify-center rounded-full text-sm"
        >
          신청하기
        </button>
      </Form>
    </form>
  );
}
