import { createStore as reduxCreateStore, applyMiddleware} from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import * as reducerFnList from './reducer'

import {
  ARROW_KEY,
  RESET,
  TICK,
} from './actions'

export * from './actions'

/* Map our reducer func to a action type
 * so no need to have a switch statement
 * in our reducers
 */
const __MAP = {
  [ARROW_KEY]:reducerFnList.arrowKey,
  [RESET]:reducerFnList.reset,
  [TICK]:reducerFnList.tick,
}

export const createStore = (initialState = {}) =>
  reduxCreateStore((state, action) =>
    ({}.hasOwnProperty.call(__MAP, action.type))
      ? __MAP[action.type](state, action)
      : state,
    initialState,
    composeWithDevTools(
      applyMiddleware(/*middleware*/)
    ))
