export type ReactionResponseType = {
  comment: string,
  action: ReactionType
}

export enum ReactionType {
  like = 'like',
  dislike = 'dislike',
  violate = 'violate'
}
