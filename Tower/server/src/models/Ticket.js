import { Schema } from "mongoose";

export const TicketSchema = new Schema({
  eventId: { type: Schema.Types.ObjectId, ref: 'TowerEvent' },
  accountId: { type: Schema.Types.ObjectId, ref: 'Account' }
},
  { timestamps: true, toJSON: { virtuals: true } }
)



TicketSchema.virtual('profile', {
  localField: 'accountId',
  foreignField: '_id',
  ref: 'Account',
  justOne: true
}),


  TicketSchema.virtual('event', {
    localField: 'eventId',
    foreignField: '_id',
    ref: 'TowerEvent',
    justOne: true
  })