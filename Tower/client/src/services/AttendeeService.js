import { api } from "./AxiosService"
import { logger } from "../utils/Logger"
import { AppState } from "../AppState"
import { Attendee } from "../models/Attendee"
class AttendeeService {

async destroyTicket(ticketId) {
  const res = await api.delete(`api/tickets/${ticketId}`)
  const ticketIndex = AppState.attendee.findIndex(ticket => ticket.id == ticketId)
    AppState.attendee.splice(ticketIndex, 1)
    
}


  async getTicket(eventId) {
    const eventData = {eventId: eventId}
    const res = await api.post(`api/tickets/`, eventData)
    logger.log('got a ticket to event, res.data', res.data)
    AppState.attendee.push( new Attendee(res.data))
  }

  async getMyTickets() {
    AppState.attendee = []
    const res = await api.get('account/tickets') 
    logger.log('got my tickets, res.data', res.data)
    AppState.attendee = res.data.map(attendee => new Attendee(attendee))
  }
}

export const attendeeService = new AttendeeService()