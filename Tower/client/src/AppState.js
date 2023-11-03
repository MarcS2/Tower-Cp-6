import { reactive } from 'vue'

// NOTE AppState is a reactive object to contain app level data
export const AppState = reactive({
  user: {},
  /** @type {import('./models/Account.js').Account} */
  account: {},
  /** @type {import('./models/TowerEvent.js').Event} */
  towerEvent: [],
  
  /** @type {Event | null} */
  activeEvent: null,
  /** @type {import('./models/Attendee.js').Attendee} */
  
  attendee: [],
  
  /** @type {import('./models/Comment.js').UserComment} */
comments: [],
})
