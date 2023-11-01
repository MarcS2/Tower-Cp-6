import { logger } from "../utils/Logger"
import { api } from "./AxiosService"
class EventsService {

async getEvents() {
  const res = await api.get('api/events')
  logger.log('[EventsService] getEvents(), got events', res.data)
}

}

export const eventsService = new EventsService()