import { api } from "./AxiosService"
import { logger } from "../utils/Logger"
import { AppState } from "../AppState"
import { UserComment } from "../models/Comment"

class CommentsService {


  async getComments(eventId) {
    const res = await api.get(`api/events/${eventId}/comments`)
    logger.log('[CommentsService] getComments(), res.data', res.data)
    AppState.comments = res.data.map(comment => new UserComment(comment)  )
    logger.log('[AppState] getComments(), AppState.comments', AppState.comments)
  }


}

export const commentsService = new CommentsService()