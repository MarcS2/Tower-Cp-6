import { dbContext } from "../db/DbContext.js"
import { BadRequest, Forbidden } from "../utils/Errors.js"

class TowerEventService {
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
    const towerEvents = await dbContext.TowerEvent.find().populate('creator')

    return towerEvents
  }


  async getTowerEventById(eventId) {
    const event = await (await dbContext.TowerEvent.findById(eventId))
    await event.populate('creator')
    if (!event) {
      throw new BadRequest(`${eventId} is not a valid id`)
    }
    return event
  }


  async createTowerEvent(eventData) {
    const towerEvent = await dbContext.TowerEvent.create(eventData)
    await towerEvent.populate('creator')
    return towerEvent
  }

}

export const towerEventService = new TowerEventService()