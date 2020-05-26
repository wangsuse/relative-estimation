
import initialData from './initial-data'
/**
 * ACTION TYPES
 */
const LOAD_INITIAL_DATA = 'LOAD_INITIAL_DATA'
const UPDATE_PLANNER = 'UPDATE_PLANNER';
const UPDATE_COLUMN_TITLE = "UPDATE_COLUMN_TITLE";
const REMOVE_COLUMN = "REMOVE_COLUMN";
const CLEAR_BOARD = "CLEAR_BOARD";
const ADD_TASKS = "ADD_TASKS";
/**
 * ACTION CREATORS
 */
export const loadInitialData = () => ({ type: LOAD_INITIAL_DATA, data: initialData })
export const updatePlanner = (planner) => ({ type: UPDATE_PLANNER, data: planner })
export const updateColumnTitle = (data) => ({ type: UPDATE_COLUMN_TITLE, data: data })
export const removeColumn = (columnId) => ({ type: REMOVE_COLUMN, data: columnId })
export const clearBoard = () => ({ type: CLEAR_BOARD, data: null })
export const addTasks = (tasks) => ({ type: ADD_TASKS, data: tasks })


const defaultPlanner = {
  tasks: {
  },
  columns: {
  },
  columnOrder: []
}

function addToLocalStorage(data) {
  window.localStorage.setItem("planner", JSON.stringify(data));
}
function loadFromLocalStorage(data) {
  return window.localStorage.getItem("planner");
}

function clearLocalStorage() {
  window.localStorage.clear();
}

/**
 * REDUCER
 */
export default function (state = defaultPlanner, action) {
  let newPlanner;
  switch (action.type) {
    case LOAD_INITIAL_DATA:
      const planner = loadFromLocalStorage();
      if (planner) {
        return JSON.parse(planner);
      }
      return action.data
    case UPDATE_PLANNER:
      addToLocalStorage(action.data);
      return action.data
    case UPDATE_COLUMN_TITLE:
      let { columnId, text } = action.data;
      const newColumn = { ...state.columns[columnId] };
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
      let newColumns = { ...state.columns };
      delete newColumns[columnId];

      const newColumnOrder = Array.from(state.columnOrder)
      const columnIndex = newColumnOrder.findIndex((name) => name === columnId);

      const nextDummyId = newColumnOrder[columnIndex + 1]
      delete newColumns[nextDummyId];

      newColumnOrder.splice(columnIndex, 2)

      newPlanner = {
        ...state,
        columns: newColumns,
        columnOrder: newColumnOrder
      }
      addToLocalStorage(newPlanner);
      return newPlanner;
    case ADD_TASKS:
      const tasks = action.data;
      const newTasks = { ...state.tasks, ...tasks };

      newColumns = { ...state.columns };
      const column = { ...newColumns[state.columnOrder[0]] }
      const keys = Object.keys(tasks);
      column.taskIds = column.taskIds.concat(keys)

      newPlanner = {
        ...state,
        columns: {
          ...state.columns,
          [column.id]: column
        },
        tasks: newTasks
      }
      addToLocalStorage(newPlanner);
      return newPlanner;
    case CLEAR_BOARD:
      clearLocalStorage();
      return initialData;
    default:
      return state
  }
}
