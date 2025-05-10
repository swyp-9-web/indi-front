import { SuccessResponse } from './common.type';

export interface ItemReactionsResponse extends SuccessResponse {
  result: {
    itemId: number;
    reactions: {
      likes: number;
      wants: number;
      revisits: number;
      [key: string]: number;
    };
  };
}

export interface ReactionResponse extends SuccessResponse {
  result: {
    itemId: number;
    emojiType: string;
  };
}
