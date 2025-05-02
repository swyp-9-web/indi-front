import { describe, expect, it } from 'vitest';

import {
  getCategoryLabelByValue,
  getCategoryValueByLabel,
  getSizeLabelByValue,
  getSizeValueByLabel,
  getSortValueByLabel,
} from './item';

describe('Item 관련 유틸 함수 테스트', () => {
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

  describe('Sort 변환 함수', () => {
    it('label로 value를 가져온다', () => {
      expect(getSortValueByLabel('최신순')).toBe('CREATED_RECENT');
      expect(getSortValueByLabel('인기순')).toBe('SCRAPED_TOP');
      expect(getSortValueByLabel('최신 작품순')).toBe('CREATED_RECENT');
      expect(getSortValueByLabel('최신 스크랩순')).toBe('SCRAPED_RECENT');
    });

    it('없는 label을 넣으면 undefined를 반환한다', () => {
      expect(getSortValueByLabel('없는 정렬값')).toBeUndefined();
    });
  });
});
