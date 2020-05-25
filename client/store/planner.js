
import initialData from './initial-data'
/**
 * ACTION TYPES
 */
const LOAD_INITIAL_DATA = 'LOAD_INITIAL_DATA'
const UPDATE_PLANNER = 'UPDATE_PLANNER';

/**
 * ACTION CREATORS
 */
export const loadInitialData = () => ({ type: LOAD_INITIAL_DATA, data: initialData })
export const updatePlanner = (planner) => ({ type: UPDATE_PLANNER, data: planner})

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
    case UPDATE_PLANNER:
      return action.data
    default:
      return state
  }
}
