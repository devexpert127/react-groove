export const BUTTON_STATES = {
  IDLE: 'idle',
  LOADING: 'loading',
  SOLD_OUT: 'sold out',
  ERROR: 'error',
}

export const PURCHASE_STATE = {
  UNAVALIABLE: 0,
  AVALIABLE: 1,
  NEEDSMOREINFO: 2,
  OUTOFSTOCK: 3,
}
// Error message duration
export const ERROR_MSG_DURATION = 3 * 1000

export default {
  BUTTON_STATES,
  PURCHASE_STATE,
  ERROR_MSG_DURATION,
}
