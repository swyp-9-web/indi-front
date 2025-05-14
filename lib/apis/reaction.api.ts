import { API_BASE_URL } from '@/constants';

import { fetchWithAuth } from './common.api';
import { ErrorResponse } from './common.type';
import { ReactionResponse } from './reaction.type';

export const addItemReaction = async (
  itemId: number,
  emojiType: string
): Promise<ReactionResponse> => {
  const res = await fetchWithAuth(`${API_BASE_URL.CLIENT}/api/v1/item-emojis`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ itemId, emojiType }),
  });

  const data = await res.json();
  if (!res.ok) throw data as ErrorResponse;
  return data as ReactionResponse;
};

export const removeItemReaction = async (itemEmojiId: number): Promise<ReactionResponse> => {
  if (!itemEmojiId || itemEmojiId === 0) {
    throw new Error('Invalid emoji ID for deletion.');
  }

  const res = await fetchWithAuth(`${API_BASE_URL.CLIENT}/api/v1/item-emojis/${itemEmojiId}`, {
    method: 'DELETE',
  });

  const data = await res.json();
  if (!res.ok) throw data as ErrorResponse;
  return data as ReactionResponse;
};
