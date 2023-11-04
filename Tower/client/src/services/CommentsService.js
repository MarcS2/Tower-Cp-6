import { api } from "./AxiosService"
import { logger } from "../utils/Logger"
import { AppState } from "../AppState"
import { UserComment } from "../models/Comment"
import Pop from "../utils/Pop"
class CommentsService {


  async getComments(eventId) {
    const res = await api.get(`api/events/${eventId}/comments`)
    logger.log('[CommentsService] getComments(), res.data', res.data)
    const comments = res.data.reverse()
    AppState.comments = comments.map(comment => new UserComment(comment)  )
    logger.log('[AppState] getComments(), AppState.comments', AppState.comments)
  }



  async createComment(commentData) {
    const res = await api.post('api/comments', commentData)
    logger.log('[CommentsService] createComment(), res.data', res.data)
const newComment = new UserComment(res.data)
    AppState.comments = [newComment, ...AppState.comments]
  }



  async destroyComment(commentId) {
  await api.delete(`api/comments/${commentId}`)
    const commentIndex = AppState.comments.findIndex(comment => comment.id == commentId)

    if(commentId == -1) {
      Pop.error( `There is no comment with this Id ${commentId}`)
      return
    }
    AppState.comments.splice(commentIndex, 1) 
    
  }



}

export const commentsService = new CommentsService()