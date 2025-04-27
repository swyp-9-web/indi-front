import { describe, expect, it } from 'vitest';

import {
  getCategoryLabelByValue,
  getCategoryValueByLabel,
  getSizeLabelByValue,
  getSizeValueByLabel,
} from './itemUtils';

describe('ItemUtils 테스트', () => {
  describe('Category 변환 함수', () => {
    it('value로 label을 가져온다', () => {
      expect(getCategoryLabelByValue('TEXTILE_ART')).toBe('섬유 & 텍스타일 아트');
      expect(getCategoryLabelByValue('FURNITURE_INTERIOR')).toBe('가구 & 인테리어');
    });

    it('label로 value를 가져온다', () => {
      expect(getCategoryValueByLabel('공예 & 소품')).toBe('CRAFTS');
      expect(getCategoryValueByLabel('자연 & 생활 공예')).toBe('NATURE_LIFE_CRAFT');
    });
  });

  describe('Size 변환 함수', () => {
    it('value로 label을 가져온다', () => {
      expect(getSizeLabelByValue('L')).toBe('대형');
      expect(getSizeLabelByValue('M')).toBe('중형');
    });

    it('label로 value를 가져온다', () => {
      expect(getSizeValueByLabel('소형')).toBe('S');
      expect(getSizeValueByLabel('해당없음')).toBe('X');
    });
  });
});
