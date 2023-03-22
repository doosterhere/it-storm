export type CommentsType = {
  allCount: number,
  comments: CommentType[]
}

export type CommentType = {
  id: string,
  text: string,
  date: string,
  likesCount: number,
  dislikesCount: number,
  user: {
    id: string,
    name: string
  }
}
