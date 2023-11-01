import { Auth0Provider } from "@bcwdev/auth0provider";
import { towerEventService } from "../services/TowerEventService.js";
import BaseController from "../utils/BaseController.js";

export class TowerEventController extends BaseController {
  constructor() {
    super('api/events')
    this.router
      .get('/:eventId', this.getTowerEventById)
      .get('', this.getTowerEvents)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.createTowerEvent)
      .delete('/:eventId', this.cancelEvent)
  }
  async cancelEvent(req, res, next) {
    try {
      const eventId = req.params.eventId
      const userId = req.userInfo.id
      const event = await towerEventService.cancelEvent(eventId, userId)
      return res.send(event)
    } catch (error) {
      next(error)
    }
  }
  async createTowerEvent(req, res, next) {
    try {
      const eventData = req.body
      const userId = req.userInfo.id
      eventData.creatorId = userId
      const towerEvent = await towerEventService.createTowerEvent(eventData)
      return res.send(towerEvent)
    } catch (error) {
      next(error)
    }
  }


  async getTowerEventById(req, res, next) {
    try {
      const eventId = req.params.eventId
      const event = await towerEventService.getTowerEventById(eventId)
      return res.send(event)
    } catch (error) {
      next(error)
    }
  }


  async getTowerEvents(req, res, next) {
    try {
      // const query = req.query
      const event = await towerEventService.getTowerEvents()
      return res.send(event)
    } catch (error) {
      next(error)
    }
  }
}


