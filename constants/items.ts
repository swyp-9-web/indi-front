// 서버와 프론트엔드 모두에서 사용하는 value-label 매핑 상수입니다.
// 실제 컴포넌트를 랜더링 또는 프론트에서 로직을 처리할 때 주로 사용됩니다.

export const CATEGORY_ITEMS = [
  { label: '섬유 & 텍스타일 아트', value: 'TEXTILE_ART' },
  { label: '시각 예술', value: 'VISUAL_ART' },
  { label: '입체 & 조형 예술', value: 'SCULPTURE_ART' },
  { label: '공예 & 소품', value: 'CRAFTS' },
  { label: '종이 & 북아트', value: 'PAPER_BOOK_ART' },
  { label: '가구 & 인테리어', value: 'FURNITURE_INTERIOR' },
  { label: '자연 & 생활 공예', value: 'NATURE_LIFE_CRAFT' },
  { label: '패션 & 의류', value: 'FASHION_CLOTHING' },
];

export const CATEGORY_VALUES = CATEGORY_ITEMS.map((item) => item.value) as readonly string[];

export const SIZE_ITEMS = [
  { label: '대형', value: 'L' },
  { label: '중형', value: 'M' },
  { label: '소형', value: 'S' },
  { label: '해당없음', value: 'X' },
];

export const NORMAL_SORT_ITEMS = [
  { label: '최신순', value: 'CREATED_RECENT' },
  { label: '인기순', value: 'SCRAPED_TOP' },
  { label: '과거순', value: 'CREATED_OLDEST' },
];

export const SCRAP_SORT_ITEMS = [
  { label: '최신 작품순', value: 'CREATED_RECENT' },
  { label: '최신 스크랩순', value: 'SCRAPED_RECENT' },
];
