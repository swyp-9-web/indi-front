import { SuccessResponse } from './common.type';

export enum EmojiType {
  LIKES = 'LIKES',
  WANTS = 'WANTS',
  REVISITS = 'REVISITS',
}

export interface Emoji {
  id: number;
  itemId: number;
  userName: string;
  emojiType: string;
  createdAt: string;
}

export interface CreateEmojiRequest {
  itemId: number;
  emojiType: string;
}

export interface DeleteEmojiResponse extends SuccessResponse {
  result: Record<string, never>;
}

export interface CreateEmojiResponse extends SuccessResponse {
  result: number;
}

export interface EmojiResponse extends SuccessResponse {
  result: Emoji[];
}
