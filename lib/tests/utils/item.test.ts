import { describe, expect, it } from 'vitest';

import {
  getCategoryLabelByValue,
  getCategoryValueByLabel,
  getSizeLabelByValue,
  getSizeValueByLabel,
  getSortValueByLabel,
} from '@/utils/item';

describe('Item utility functions', () => {
  describe('Category conversion functions', () => {
    it('should returns the correct label from a given value', () => {
      expect(getCategoryLabelByValue('TEXTILE_ART')).toBe('섬유 & 텍스타일 아트');
      expect(getCategoryLabelByValue('FURNITURE_INTERIOR')).toBe('가구 & 인테리어');
    });

    it('should returns the correct value from a given label', () => {
      expect(getCategoryValueByLabel('공예 & 소품')).toBe('CRAFTS');
      expect(getCategoryValueByLabel('자연 & 생활 공예')).toBe('NATURE_LIFE_CRAFT');
    });
  });

  describe('Size conversion functions', () => {
    it('should returns the correct label from a given value', () => {
      expect(getSizeLabelByValue('L')).toBe('대형');
      expect(getSizeLabelByValue('M')).toBe('중형');
    });

    it('should returns the correct value from a given label', () => {
      expect(getSizeValueByLabel('소형')).toBe('S');
      expect(getSizeValueByLabel('해당없음')).toBe('X');
    });
  });

  describe('Sort conversion functions', () => {
    it('should returns the correct value from a given label', () => {
      expect(getSortValueByLabel('최신순')).toBe('CREATED_RECENT');
      expect(getSortValueByLabel('인기순')).toBe('SCRAPED_TOP');
      expect(getSortValueByLabel('최신 작품순')).toBe('SCRAPED_RECENT');
      expect(getSortValueByLabel('최신 스크랩순')).toBe('SCRAP_ITEM_RECENT');
    });

    it('should returns undefined when given an unknown label', () => {
      expect(getSortValueByLabel('없는 정렬값')).toBeUndefined();
    });
  });
});
