import { dbContext } from "../db/DbContext.js"
import { BadRequest, Forbidden } from "../utils/Errors.js"
import { towerEventService } from "./TowerEventService.js"

class CommentsService {
  async destroyComment(userId, commentId) {
    const comment = await dbContext.Comment.findById(commentId)
    const event = await towerEventService.getTowerEventById(comment.eventId)
    if (userId != comment.creatorId && userId != event.creatorId) {
      throw new Forbidden('This is not your comment')
    }
    if (!comment) {
      throw new BadRequest(`${commentId} this id is not valid`)
    }
    await comment.delete()
    return 'Comment deleted'
  }
  async getComments(eventId) {
    const comments = await dbContext.Comment.find({ eventId: eventId }).populate('creator')
    return comments
  }
  async createComment(commentData) {
    const comment = await dbContext.Comment.create(commentData)
    await comment.populate('creator')
    return comment
  }

}

export const commentsService = new CommentsService()