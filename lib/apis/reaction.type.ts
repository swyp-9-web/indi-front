import { SuccessResponse } from './common.type';

export interface ItemReactions {
  itemId: number;
  reactions: {
    likes: number;
    wants: number;
    revisits: number;
    [key: string]: number;
  };
}
export interface Reaction {
  itemId: number;
  emojiType: string;
}

export interface ReactionResponse extends SuccessResponse {
  result: { Reaction: Reaction };
}

export interface ItemReactionsResponse extends SuccessResponse {
  result: {
    ItemReactions: ItemReactions;
  };
}
