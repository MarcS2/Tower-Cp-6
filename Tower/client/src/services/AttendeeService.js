import { api } from "./AxiosService"
import { logger } from "../utils/Logger"
import { AppState } from "../AppState"
import { Attendee } from "../models/Attendee"
class AttendeeService {
  async getTicket(eventId) {
    const eventData = {eventId: eventId}
    const res = await api.post(`api/tickets/`, eventData)
    logger.log('got a ticket to event, res.data', res.data)
    AppState.attendee.push( new Attendee(res.data))
  }
}

export const attendeeService = new AttendeeService()