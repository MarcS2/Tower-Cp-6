import { dbContext } from "../db/DbContext.js"
import { BadRequest, Forbidden, UnAuthorized } from "../utils/Errors.js"

class TowerEventService {
  async editEvent(eventData, userId, eventId) {
    const event = await this.getTowerEventById(eventId)
    if (!event) {
      throw new BadRequest(`${eventId} is not a valid id`)
    }
    if (event.creatorId != userId) {
      throw new Forbidden('This is not your event')
    }
    if (event.isCanceled) {
      throw new BadRequest('This event is canceled')
    }

    event.name = eventData.name || event.name
    event.description = eventData.description || event.description
    await event.save()
    return event
  }


  async cancelEvent(eventId, userId) {
    const towerEvent = await this.getTowerEventById(eventId)
    if (towerEvent.creatorId.toString() != userId) {
      throw new Forbidden('This is not your event to delete')
    }
    towerEvent.isCanceled = !towerEvent.isCanceled
    await towerEvent.save()
    return towerEvent

  }
  // { type: query }
  async getTowerEvents() {
    const towerEvents = await dbContext.TowerEvent.find()
      .populate('creator')
      .populate('ticketCount')

    return towerEvents
  }


  async getTowerEventById(eventId) {
    const event = await (await dbContext.TowerEvent.findById(eventId))
    await event.populate('creator')
    await event.populate('ticketCount')
    if (!event) {
      throw new BadRequest(`${eventId} is not a valid id`)
    }
    return event
  }


  async createTowerEvent(eventData) {
    const towerEvent = await dbContext.TowerEvent.create(eventData)
    await towerEvent.populate('creator')
    await towerEvent.populate('ticketCount')
    return towerEvent
  }

}

export const towerEventService = new TowerEventService()