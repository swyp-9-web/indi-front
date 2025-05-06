import { useUserSummary } from '@/lib/queries/useUserQueries';
import { useAuthDialog } from '@/stores/useAuthDialog';

/**
 * 인증이 필요한 동작을 감싸는 헬퍼 훅
 *
 * 인증되지 않은 경우 인증 다이얼로그를 띄우고,
 * 인증된 경우에만 주어진 콜백 함수를 실행합니다.
 *
 * @returns checkAuth - 인증 상태 확인 후 콜백 실행 함수
 *
 * @example
 * const { checkAuth } = useRequireAuth();
 *
 * const handleClick = () => {
 *   checkAuth(() => {
 *     // 인증된 유저만 실행되는 로직
 *     doSomethingProtected();
 *   });
 * };
 */
export function useRequireAuth() {
  const { data: user } = useUserSummary();
  const { toggleIsOpen: toggleAuthDialogOpen } = useAuthDialog();

  // 유저가 인증된 경우에만 콜백 실행
  const checkAuth = (onAuthed: () => void) => {
    if (!user || !user.result) {
      toggleAuthDialogOpen();
      return;
    }

    // 인증된 경우 해당 콜백 실행
    onAuthed();
  };

  return { checkAuth };
}
