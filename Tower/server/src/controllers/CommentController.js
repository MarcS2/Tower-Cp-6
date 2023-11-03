import { Auth0Provider } from "@bcwdev/auth0provider";
import BaseController from "../utils/BaseController.js";
import { commentsService } from "../services/CommentsService.js";

export class CommentController extends BaseController {
  constructor() {
    super('api/comments')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.createComment)
      .delete('/:commentId', this.destroyComment)
  }
  async destroyComment(req, res, next) {
    try {
      const userId = req.userInfo.id
      const commentId = req.params.commentId
      const message = await commentsService.destroyComment(userId, commentId)
      return res.send(message)
    } catch (error) {
      next(error)
    }
  }

  async createComment(req, res, next) {
    try {
      const commentData = req.body
      const userId = req.userInfo.id
      commentData.creatorId = userId
      const comment = await commentsService.createComment(commentData)
      return res.send(comment)
    } catch (error) {
      next(error)
    }
  }
}