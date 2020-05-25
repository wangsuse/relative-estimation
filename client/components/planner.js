
import React from 'react'
import { connect } from 'react-redux'
import { loadInitialData } from '../store'
import { DragDropContext } from 'react-beautiful-dnd';

class Planner extends React.Component {
  componentDidMount() {
    this.props.dispatchLoadInitialData();
  }

  render() {
    return this.props.planner.columnOrder.map((columnId) => {
      const { id, title, taskIds } = this.props.planner.columns[columnId];
      return title;
    });
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
    dispatchLoadInitialData: () => dispatch(loadInitialData())
  }
}

export default connect(mapState, mapDispatch)(Planner)
