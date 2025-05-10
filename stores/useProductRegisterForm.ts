import { create } from 'zustand';

import { FormValues } from '@/lib/schemas/productRegisterForm.schema';

export type Mode = 'CREATE' | 'EDIT' | 'TEMP_EDIT' | null;

interface ProductRegisterFormState {
  mode: Mode;
  productId: number | null;
  initialValues: Partial<FormValues> | null;
  initialImgUrls: string[];
}

interface ProductRegisterFormActions {
  setMode: (mode: Mode) => void;
  setProductId: (productId: number) => void;
  setInitialFormValues: (payload: {
    initialValues: Partial<FormValues> | null;
    initialImgUrls: string[];
  }) => void;
  resetFormState: () => void;
}

type ProductRegisterFormStore = ProductRegisterFormState & ProductRegisterFormActions;

export const useProductRegisterForm = create<ProductRegisterFormStore>((set) => ({
  mode: null,
  productId: null,
  initialValues: null,
  initialImgUrls: [],

  setMode: (mode) => set({ mode }),

  // EDIT 모드인 경우 상품 아이디 설정
  setProductId: (productId) => set({ productId }),

  // 각각의 모드에 알맞는 초기값 설정
  setInitialFormValues: ({ initialValues, initialImgUrls }) =>
    set({ initialValues, initialImgUrls }),

  // 페이지를 나가는 경우, 설정 값 초기화
  resetFormState: () =>
    set({
      mode: null,
      initialValues: null,
      initialImgUrls: [],
    }),
}));
