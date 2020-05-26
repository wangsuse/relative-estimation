
import initialData from './initial-data'
/**
 * ACTION TYPES
 */
const LOAD_INITIAL_DATA = 'LOAD_INITIAL_DATA'
const UPDATE_PLANNER = 'UPDATE_PLANNER';
const UPDATE_COLUMN_TITLE = "UPDATE_COLUMN_TITLE";
/**
 * ACTION CREATORS
 */
export const loadInitialData = () => ({ type: LOAD_INITIAL_DATA, data: initialData })
export const updatePlanner = (planner) => ({ type: UPDATE_PLANNER, data: planner})
export const updateColumnTitle = (data) => ({type: UPDATE_COLUMN_TITLE, data: data})

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
    case UPDATE_COLUMN_TITLE:
      const {columnId, text} = action.data;
      const newColumn = {...state.columns[columnId]};
      newColumn.title = text;
      const newPlanner = {
        ...state,
        columns: {
          ...state.columns,
          [columnId]: newColumn
        }
      }
      return newPlanner;
    default:
      return state
  }
}
