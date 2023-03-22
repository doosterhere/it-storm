import { CategoryName } from "./categories.type";
import { CommentsType } from "./comments.type";

export type DetailedArticleType = {
  text: string,
  comments: CommentsType[],
  commentsCount: number,
  id: string,
  title: string,
  description: string,
  image: string,
  date: string,
  category: CategoryName,
  url: string
}
