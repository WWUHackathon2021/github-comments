import { Op } from "sequelize";
import { CommentModel } from "../models/CommentModel";
import CommentAPI from "./spec/CommentAPI";
import Comment from "./types/Comment";

export default class ModelCommentAPI implements CommentAPI {
  constructor(private commentModel: CommentModel) {}

  async getComment(id: number): Promise<Comment | undefined> {
    const comment = await this.commentModel.findOne({ where: { id: { [Op.eq]: id } } });
    return comment?.get() ?? undefined;
  }

  async getRepoComments(repo: string): Promise<Array<Comment>> {
    const comments = await this.commentModel.findAll({ where: { repoID: { [Op.eq]: repo } } });
    return comments.map((x) => x.get());
  }

  async getCommentCount(repo: string): Promise<number> {
    return await this.commentModel.count({ where: { repoID: { [Op.eq]: repo } } });
  }

  async createComment(comment: Comment): Promise<Comment> {
    return await this.commentModel.create(comment).then((x) => x.get());
  }

  async deleteComment(id: number): Promise<void> {
    await this.commentModel.destroy({
      where: {
        id: {
          [Op.eq]: id,
        },
      },
    });
  }

  async modifyComment(id: number, comment: Partial<Comment>): Promise<Comment> {
    const commentDB = await this.commentModel.findOne({ where: { id: { [Op.eq]: id } } });
    const result = (await commentDB?.update(comment))?.get();
    if (result == undefined) {
      throw new Error(`Comment ${id} does not exist`);
    }
    return result;
  }
}
