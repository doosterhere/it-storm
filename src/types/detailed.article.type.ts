import { CategoryName } from "./categories.type";
import { CommentType } from "./comment.type";

export type DetailedArticleType = {
  text: string,
  comments: CommentType[],
  commentsCount: number,
  id: string,
  title: string,
  description: string,
  image: string,
  date: string,
  category: CategoryName,
  url: string
}
