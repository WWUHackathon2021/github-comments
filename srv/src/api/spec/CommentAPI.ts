import Comment from "../types/Comment";

export default interface CommentAPI {
  getComment(id: number): Promise<Comment | undefined>;
  getRepoComments(repo: string): Promise<Array<Comment>>;
  getCommentCount(repo: string): Promise<number>;
  createComment(comment: Partial<Comment>): Promise<Comment>;
  deleteComment(id: number): Promise<void>;
  modifyComment(id: number, comment: Partial<Comment>): Promise<Comment>;
}
