// 서버와 프론트엔드 모두에서 사용하는 value-label 매핑 상수입니다.

export const CATEGORY_ITEMS = [
  { label: '섬유 & 텍스타일 아트', value: 'TEXTILE_ART' },
  { label: '시각 예술', value: 'VISUAL_ART' },
  { label: '입체 & 조형 예술', value: 'SCULPTURE_ART' },
  { label: '공예 & 소품', value: 'CRAFTS' },
  { label: '종이 & 북아트', value: 'PAPER_BOOK_ART' },
  { label: '가구 & 인테리어', value: 'FURNITURE_INTERIOR' },
  { label: '자연 & 생활 공예', value: 'NATURE_LIFE_CRAFT' },
  { label: '패션 & 의류', value: 'FASHION_CLOTHING' },
] as const;

export const SIZE_ITEMS = [
  { label: '대형', value: 'L' },
  { label: '중형', value: 'M' },
  { label: '소형', value: 'S' },
  { label: '해당없음', value: 'X' },
] as const;
