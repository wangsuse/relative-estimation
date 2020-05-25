
import initialData from './initial-data'
/**
 * ACTION TYPES
 */
const LOAD_INITIAL_DATA = 'LOAD_INITIAL_DATA'


/**
 * ACTION CREATORS
 */
export const loadInitialData = () => ({ type: LOAD_INITIAL_DATA, data: initialData })


const defaultPlanner = {
  tasks: {
  },
  columns: {
  },
  columnOrder: []
}
/**
 * REDUCER
 */
export default function (state = defaultPlanner, action) {
  switch (action.type) {
    case LOAD_INITIAL_DATA:
      return action.data
    default:
      return state
  }
}
