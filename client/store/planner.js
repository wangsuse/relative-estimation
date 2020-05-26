
import initialData from './initial-data'
/**
 * ACTION TYPES
 */
const LOAD_INITIAL_DATA = 'LOAD_INITIAL_DATA'
const UPDATE_PLANNER = 'UPDATE_PLANNER';
const UPDATE_COLUMN_TITLE = "UPDATE_COLUMN_TITLE";
const REMOVE_COLUMN = "REMOVE_COLUMN";
/**
 * ACTION CREATORS
 */
export const loadInitialData = () => ({ type: LOAD_INITIAL_DATA, data: initialData })
export const updatePlanner = (planner) => ({ type: UPDATE_PLANNER, data: planner})
export const updateColumnTitle = (data) => ({type: UPDATE_COLUMN_TITLE, data: data})
export const removeColumn = (columnId) => ({type: REMOVE_COLUMN, data: columnId})

const defaultPlanner = {
  tasks: {
  },
  columns: {
  },
  columnOrder: []
}

function addToLocalStorage(data){
  window.localStorage.setItem("planner", JSON.stringify(data));
}
function loadFromLocalStorage(data) {
  return window.localStorage.getItem("planner");
}

/**
 * REDUCER
 */
export default function (state = defaultPlanner, action) {
  let newPlanner;
  switch (action.type) {
    case LOAD_INITIAL_DATA:
      const planner =loadFromLocalStorage();
      if (planner) {
        return JSON.parse(planner);
      }
      return action.data
    case UPDATE_PLANNER:
      addToLocalStorage(action.data);
      return action.data
    case UPDATE_COLUMN_TITLE:
      let {columnId, text} = action.data;
      const newColumn = {...state.columns[columnId]};
      newColumn.title = text;
      newPlanner = {
        ...state,
        columns: {
          ...state.columns,
          [columnId]: newColumn
        }
      }
      addToLocalStorage(newPlanner);
      return newPlanner;
    case REMOVE_COLUMN:
      columnId = action.data;
      const newColumns = {...state.columns};
      delete newColumns[columnId];

      const newColumnOrder = Array.from(state.columnOrder)
      const columnIndex = newColumnOrder.findIndex((name) => name === columnId);

      const nextDummyId = newColumnOrder[columnIndex+1]
      delete newColumns[nextDummyId];

      newColumnOrder.splice(columnIndex, 2)

      newPlanner = {
        ...state,
        columns: newColumns,
        columnOrder: newColumnOrder
      }
      addToLocalStorage(newPlanner);
      return newPlanner;
    default:
      return state
  }
}
