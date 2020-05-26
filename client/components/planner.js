
import React from 'react'
import { connect } from 'react-redux'
import { loadInitialData, updatePlanner } from '../store'
import Column from './column'
import Actions from './actions'
import { DragDropContext } from 'react-beautiful-dnd';
import styled from 'styled-components'
import { v4 as uuidv4 } from 'uuid';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css

const Container = styled.div`
  display : flex;
  flex-direction : column
`;
const ColumnContainer = styled.div`
display : flex;
`;

class Planner extends React.Component {
  componentDidMount() {
    this.props.dispatchLoadInitialData();
  }

  onDragStart(start) {
    console.log("drag started")
  }
  onDragUpdate() {
    console.log("onDragUpdate called")
  }

  handleRemove(result) {
    const { destination, source, draggableId } = result;
    const column = this.props.planner.columns[source.droppableId];
    const newTaskIds = Array.from(column.taskIds);
    newTaskIds.splice(source.index, 1);

    const newTasks = { ...this.props.planner.tasks };
    delete newTasks[draggableId]

    const newColumn = {
      ...column,
      taskIds: newTaskIds
    };

    const newPlanner = {
      ...this.props.planner,
      columns: {
        ...this.props.planner.columns,
        [newColumn.id]: newColumn
      },
      tasks: newTasks
    };
    this.props.dispatchUpdatePlanner(newPlanner);
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
    // if drop to delete zone, delete task
    if (destination.droppableId === "deleteZone") {
      confirmAlert({
        message: 'Are you sure to delete this card?',
        buttons: [
          {
            label: 'Yes',
            onClick: this.handleRemove.bind(this, result)
          },
          {
            label: 'No',
          }
        ]
      });

      return;
    }

    const startColumn = this.props.planner.columns[source.droppableId];
    const finishColumn = this.props.planner.columns[destination.droppableId];

    if (startColumn === finishColumn) {
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
    } else if (finishColumn.type === "dummy") {
      // remove from start column
      const startColumn = this.props.planner.columns[source.droppableId];
      const newStartTaskIds = Array.from(startColumn.taskIds);
      newStartTaskIds.splice(source.index, 1);

      const newStartColumn = {
        ...startColumn,
        taskIds: newStartTaskIds
      };

      const newColumnId = "column-" + uuidv4();
      const destinationColumn = {
        id: newColumnId,
        title: "Click to edit title",
        taskIds: [draggableId]
      }
      const newDummyId = "dummy-" + uuidv4();
      const newDummyColumn = {
        id: newDummyId,
        title: "n",
        taskIds: [],
        type: "dummy"
      }

      const dropColumnIndex = this.props.planner.columnOrder.findIndex((element => {
        return element === finishColumn.id;
      }));

      const newColumnOrder = Array.from(this.props.planner.columnOrder);
      newColumnOrder.splice(dropColumnIndex + 1, 0, newColumnId, newDummyId)

      const newPlanner = {
        ...this.props.planner,
        columns: {
          ...this.props.planner.columns,
          [newStartColumn.id]: newStartColumn,
          [destinationColumn.id]: destinationColumn,
          [newDummyColumn.id]: newDummyColumn
        },
        columnOrder: newColumnOrder
      };
      this.props.dispatchUpdatePlanner(newPlanner);



    } else {
      // moving from one list to another
      const startColumn = this.props.planner.columns[source.droppableId];
      const newStartTaskIds = Array.from(startColumn.taskIds);
      newStartTaskIds.splice(source.index, 1);

      const newStartColumn = {
        ...startColumn,
        taskIds: newStartTaskIds
      };

      const finishColumn = this.props.planner.columns[destination.droppableId];
      const newFinishTaskIds = Array.from(finishColumn.taskIds);
      newFinishTaskIds.splice(destination.index, 0, draggableId);

      const newFinishColumn = {
        ...finishColumn,
        taskIds: newFinishTaskIds
      };

      const newPlanner = {
        ...this.props.planner,
        columns: {
          ...this.props.planner.columns,
          [newStartColumn.id]: newStartColumn,
          [newFinishColumn.id]: newFinishColumn
        }
      };
      this.props.dispatchUpdatePlanner(newPlanner);
    }
  }

  render() {
    return (
      <Container>
        <DragDropContext
          onDragStart={this.onDragStart.bind(this)}
          onDragUpdate={this.onDragUpdate.bind(this)}
          onDragEnd={this.onDragEnd.bind(this)}
        >
          <Actions />
          <ColumnContainer>
            {this.props.planner.columnOrder.map((columnId) => {
              const column = this.props.planner.columns[columnId];
              const tasks = column.taskIds.map(taskId => {
                return this.props.planner.tasks[taskId]
              })
              return <Column key={column.id} column={column} tasks={tasks} />
            })}
          </ColumnContainer>
        </DragDropContext>
      </Container>
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
