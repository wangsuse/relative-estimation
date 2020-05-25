
import React from 'react'
import { connect } from 'react-redux'
import { loadInitialData, updatePlanner } from '../store'
import Column from './column'
import { DragDropContext } from 'react-beautiful-dnd';

class Planner extends React.Component {
  componentDidMount() {
    this.props.dispatchLoadInitialData();
  }

  onDragStart() {

  }
  onDragUpdate() {

  }
  onDragEnd(result) {
    const { destination, source, draggableId } = result;

    if (!destination) {
      return;
    }

    if (destination.droppableId === source.droppableId
      && destination.index === source.index
    ) {
      return;
    }

    const column = this.props.planner.columns[source.droppableId];
    const newTaskIds = Array.from(column.taskIds);
    newTaskIds.splice(source.index, 1);
    newTaskIds.splice(destination.index, 0, draggableId);

    const newColumn = {
      ...column,
      taskIds: newTaskIds
    };

    const newPlanner = {
      ...this.props.planner,
      columns: {
        ...this.props.planner.columns,
        [newColumn.id]: newColumn
      }
    };
    this.props.dispatchUpdatePlanner(newPlanner);
  }

  render() {
    return (
      <DragDropContext
        onDragStart={this.onDragStart.bind(this)}
        onDragUpdate={this.onDragUpdate.bind(this)}
        onDragEnd={this.onDragEnd.bind(this)}
      >
        {this.props.planner.columnOrder.map((columnId) => {
          const column = this.props.planner.columns[columnId];
          const tasks = column.taskIds.map(taskId => {
            return this.props.planner.tasks[taskId]
          })
          return <Column key={column.id} column={column} tasks={tasks} />
        })}
      </DragDropContext>
    )
  }
}


/**
 * CONTAINER
 */
const mapState = state => {
  return {
    planner: state.planner
  }
}

const mapDispatch = dispatch => {
  return {
    dispatchLoadInitialData: () => dispatch(loadInitialData()),
    dispatchUpdatePlanner: (planner) => dispatch(updatePlanner(planner))
  }
}

export default connect(mapState, mapDispatch)(Planner)
