import { AppState } from "../AppState"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"
import { TowerEvent } from "../models/TowerEvent"
class EventsService {

async getProfilesWithEventTicket(eventId) {
  const res = await api.get(`api/events/${eventId}/tickets`)
  logger.log('[EventsService] getProfilesWithEventTicket(), Profiles with tickets', res.data)
AppState.activeEvent
}



async getEvents() {
  const res = await api.get('api/events')
  logger.log('[EventsService] getEvents(), got events', res.data)
  const newEvent = res.data.map(eventPojo => new TowerEvent(eventPojo))
  AppState.towerEvent = newEvent
}


async getEventById(eventId) {
  AppState.activeEvent = null
  const res = await api.get(`api/events/${eventId}`)
  AppState.activeEvent = new TowerEvent(res.data)
  
}


}

export const eventsService = new EventsService()