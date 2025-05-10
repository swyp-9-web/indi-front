import { API_BASE_URL } from '@/constants';

import { fetchWithAuth } from './common.api';
import { ErrorResponse } from './common.type';
import { ItemReactionsResponse, ReactionResponse } from './reaction.type';

export const fetchItemReactions = async (
  itemId: number,
  options: { runtime: 'server' | 'client' } = { runtime: 'client' }
): Promise<ItemReactionsResponse> => {
  const baseUrl = options.runtime === 'server' ? API_BASE_URL.SERVER : API_BASE_URL.CLIENT;

  const res = await fetchWithAuth(`${baseUrl}/api/v1/item-emojis`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
    cache: 'no-store',
  });

  const data = await res.json();
  if (!res.ok) throw data as ErrorResponse;
  return data as ItemReactionsResponse;
};

export const addItemReaction = async (
  itemId: number,
  reactionType: string
): Promise<ReactionResponse> => {
  const res = await fetchWithAuth(`${API_BASE_URL.CLIENT}/api/v1/item-emojis`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ reactionType }),
  });

  const data = await res.json();
  if (!res.ok) throw data as ErrorResponse;
  return data as ReactionResponse;
};

export const removeItemReaction = async (
  itemId: number,
  reactionType: string
): Promise<ReactionResponse> => {
  const res = await fetchWithAuth(`${API_BASE_URL.CLIENT}/api/v1/item-emojis/${itemId}`, {
    method: 'DELETE',
  });

  const data = await res.json();
  if (!res.ok) throw data as ErrorResponse;
  return data as ReactionResponse;
};
