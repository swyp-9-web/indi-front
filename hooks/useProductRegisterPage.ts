import { useRouter } from 'next/navigation';

import { ROUTE_PATHS } from '@/constants';
import { useProductRegisterForm } from '@/stores/useProductRegisterForm';

/**
 * 상품 등록/수정 및 임시저장 페이지 진입을 위한 커스텀 훅입니다.
 *
 * 반드시 해당 훅을 통헤서 상품 등록 페이지 (`ROUTE_PATHS.REGISTER_PRODUCT`)로 이동해야 하며,
 * 페이지 진입 시 mode 설정 및 초기 폼 데이터 초기화 로직을 포함합니다.
 *
 * 또한, 반드시 상품이 등록/수정/임시저장이 된 이후에는 `useProductRegisterForm`의 reset을 실행해 오류를 방지해야합니다.
 *
 * @example
 *  const enterRegisterPage = useProductRegisterPage();
 *  enterRegisterPage.create(); // 신규 등록 모드로 진입
 */
export function useProductRegisterPage() {
  const router = useRouter();
  const { setMode, setInitialFormValues, setProductId } = useProductRegisterForm();

  const enterRegisterPage = {
    create: () => {
      setMode('CREATE');
      setInitialFormValues({ initialValues: null, initialImgUrls: [] });
      router.push(ROUTE_PATHS.REGISTER_PRODUCT);
    },

    edit: ({ productId }: { productId: number }) => {
      setMode('EDIT');
      setProductId(productId);

      // TODO: productId를 통해 세부 정보를 불러와서 initialValue를 설정
      console.log(productId);

      router.push(ROUTE_PATHS.REGISTER_PRODUCT);
    },

    tempEdit: () => {
      setMode('TEMP_EDIT');

      // 현재 유저 정보를 통해 임시 저장된 값을 불러와서 initialValue를 설정하는 로직 추가 필요

      router.push(ROUTE_PATHS.REGISTER_PRODUCT);
    },
  };

  return enterRegisterPage;
}
