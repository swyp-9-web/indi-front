import { CATEGORY_ITEMS, SIZE_ITEMS } from '@/constants';

/**
 * Category value를 받아 label을 반환합니다.
 *
 * @param value - 카테고리 value
 * @returns 해당하는 label (없는 경우 undefined)
 * @example
 * getCategoryLabelByValue('2'); // '시각 예술'
 */
export function getCategoryLabelByValue(value: string): string | undefined {
  return CATEGORY_ITEMS.find((item) => item.value === value)?.label;
}

/**
 * Category label을 받아 value를 반환합니다.
 *
 * @param label - 카테고리 label
 * @returns 해당하는 value (없는 경우 undefined)
 * @example
 * getCategoryValueByLabel('공예 & 소품'); // '4'
 */
export function getCategoryValueByLabel(label: string): string | undefined {
  return CATEGORY_ITEMS.find((item) => item.label === label)?.value;
}

/**
 * Size value를 받아 label을 반환합니다.
 *
 * @param value - 사이즈 value
 * @returns 해당하는 label (없는 경우 undefined)
 * @example
 * getSizeLabelByValue('L'); // '대형'
 */
export function getSizeLabelByValue(value: string): string | undefined {
  return SIZE_ITEMS.find((item) => item.value === value)?.label;
}

/**
 * Size label을 받아 value를 반환합니다.
 *
 * @param label - 사이즈 label
 * @returns 해당하는 value (없는 경우 undefined)
 * @example
 * getSizeValueByLabel('중형'); // 'M'
 */
export function getSizeValueByLabel(label: string): string | undefined {
  return SIZE_ITEMS.find((item) => item.label === label)?.value;
}
