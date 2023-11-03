export class UserComment {
  constructor(data) {
    this.id = data.id
    this.creatorId = data.creatorId
    this.eventId = data.eventId
    this.description = data.body
    this.creator = data.creator
  }
}