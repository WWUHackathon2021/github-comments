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

  async repoComments(repo: string): Promise<Array<Comment>> {
    const comments = await this.commentModel.findAll({ where: { repoID: { [Op.eq]: repo } } });
    return comments.map((x) => x.get());
  }

  async getCommentCount(repo: string): Promise<number> {
    return await this.commentModel.count({ where: { repoID: { [Op.eq]: repo } } });
  }

  async createComment(comment: Comment): Promise<void> {
    await this.commentModel.create(comment);
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

  async modifyComment(id: number, comment: Comment): Promise<void> {
    await this.commentModel.update(comment, {
      where: {
        id: {
          [Op.eq]: id,
        },
      },
    });
  }
}
