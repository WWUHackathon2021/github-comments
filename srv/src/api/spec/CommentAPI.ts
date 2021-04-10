import Comment from "../types/Comment";

export default interface CommentAPI {
  getComment(id: number): Promise<Comment | undefined>;
  repoComments(repo: string): Promise<Array<Comment>>;
  getCommentCount(repo: string): Promise<number>;
  createComment(comment: Comment): Promise<void>;
  deleteComment(id: number): Promise<void>;
  modifyComment(id: number, comment: Comment): Promise<void>;
}
