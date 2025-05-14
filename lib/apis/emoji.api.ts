import { API_BASE_URL } from '@/constants';

import { fetchWithAuth } from './common.api';
import { ErrorResponse } from './common.type';
import {
  CreateEmojiRequest,
  CreateEmojiResponse,
  DeleteEmojiResponse,
  Emoji,
  EmojiResponse,
} from './emoji.type';

// GET: 이모지 리스트 조회
export const fetchEmojisByItemId = async (
  itemId: number,
  options: { runtime: 'server' | 'client' } = { runtime: 'server' }
): Promise<Emoji[]> => {
  const baseUrl = options.runtime === 'server' ? API_BASE_URL.SERVER : API_BASE_URL.CLIENT;
  const res = await fetchWithAuth(`${baseUrl}/api/v1/item-emojis?itemId=${itemId}`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  });

  const data = await res.json();
  if (!res.ok) throw data as ErrorResponse;
  return (data as EmojiResponse).result;
};

// POST: 이모지 생성
export const createEmoji = async (payload: CreateEmojiRequest): Promise<CreateEmojiResponse> => {
  const res = await fetchWithAuth(`${API_BASE_URL.CLIENT}/api/v1/item-emojis`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  const data = await res.json();

  if (!res.ok) {
    throw data as ErrorResponse;
  }

  return data as CreateEmojiResponse;
};

// DELETE: 이모지 삭제
export const deleteEmoji = async (itemEmojiId: number): Promise<DeleteEmojiResponse> => {
  const res = await fetchWithAuth(`${API_BASE_URL.CLIENT}/api/v1/item-emojis/${itemEmojiId}`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
  });

  const data = await res.json();

  if (!res.ok) {
    throw data as ErrorResponse;
  }

  return data as DeleteEmojiResponse;
};
