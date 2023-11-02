import { dbContext } from "../db/DbContext.js"
import { BadRequest, Forbidden } from "../utils/Errors.js"
import { towerEventService } from "./TowerEventService.js"

class TicketsService {
  async destroyTicket(ticketId, userId) {
    const ticket = await dbContext.Ticket.findById(ticketId)

    if (!ticket) {
      throw new BadRequest(`${ticketId} is not a valid ID`)
    }

    if (ticket.accountId.toString() != userId) {
      throw new Forbidden('Not your ticket')
    }

    await ticket.delete()
    return "ticket deleted"
  }
  async getTicketsByEventId(eventId) {
    const tickets = await dbContext.Ticket.find({ eventId: eventId })
      .populate('profile')
    return tickets
  }
  async getEventsByMyTickets(userId) {
    const tickets = await dbContext.Ticket.find({ accountId: userId })
      .populate({
        path: 'event',
        populate: {
          path: 'ticketCount'
        }
      })
    return tickets
  }
  async createTicket(ticketData) {
    const event = await towerEventService.getTowerEventById(ticketData.eventId)
    if (event.isCanceled) {
      throw new BadRequest(`${event.name} has been canceled`)
    }

    const ticket = await dbContext.Ticket.create(ticketData)
    await ticket.populate('profile', 'name picture')
    await ticket.populate('event')
    return ticket

  }
}

export const ticketsService = new TicketsService()