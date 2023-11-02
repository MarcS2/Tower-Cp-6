import { Auth0Provider } from "@bcwdev/auth0provider"
import BaseController from "../utils/BaseController.js"
import { ticketsService } from "../services/TicketsService.js"

export class TicketController extends BaseController {
  constructor() {
    super('api/tickets')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.createTicket)
      .delete('/:ticketId', this.destroyTicket)
  }
  async destroyTicket(req, res, next) {
    try {
      const ticketId = req.params.ticketId
      const userId = req.userInfo.id
      const message = await ticketsService.destroyTicket(ticketId, userId)
      return res.send(message)
    } catch (error) {
      next(error)
    }
  }

  async createTicket(req, res, next) {
    try {
      const ticketData = req.body
      const userId = req.userInfo.id
      ticketData.accountId = userId
      const ticket = await ticketsService.createTicket(ticketData)
      return res.send(ticket)
    } catch (error) {
      next(error)
    }
  }
}