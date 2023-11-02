export class Attendee {
 constructor(data) {
  this.id = data.id
  this.accountId = data.accountId
  this.createdAt = data.createdAt
  this.updatedAt = data.updatedAt
  this.profile = data.profile 
  this.event = data.event
  
 } 
}