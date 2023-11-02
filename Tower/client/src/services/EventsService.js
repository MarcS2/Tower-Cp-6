import { AppState } from "../AppState"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"
import { TowerEvent } from "../models/TowerEvent"
import { Attendee } from "../models/Attendee"
class EventsService {


  // getMyEvents() {
  // const myEvents = AppState.towerEvent.filter(event => event.creatorId == AppState.account.id)
  // logger.log('found events', myEvents)
  // AppState.towerEvent = myEvents.map(event => new TowerEvent(event))
  // logger.log('found events in appstate', AppState.towerEvent)
  // }



async cancelEvent(eventId) {
  const res = await api.delete(`api/events/${eventId}`)
  return res.data
}



async getProfilesWithEventTicket(eventId) {
  AppState.attendee = []
  const res = await api.get(`api/events/${eventId}/tickets`)
  logger.log('[EventsService] getProfilesWithEventTicket(), Profiles with tickets', res.data)
  AppState.attendee = res.data.map(pojo => new Attendee(pojo))
logger.log('[AppState] getProfilesWithEventTicket(), Attendee in AppState', AppState.attendee)
}



async getEvents() {
  AppState.towerEvent = []
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


async createEvent(eventData) {
 eventData.startDate = new Date(eventData.startDate).toUTCString()
  const res = await api.post('api/events', eventData)
  logger.log('[EventsService] createEvent(), res.data', res.data)
  const event = new TowerEvent(res.data)
  logger.log('new event ',event )
  return res.data
}


}

export const eventsService = new EventsService()