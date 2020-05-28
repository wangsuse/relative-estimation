import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { Draggable } from 'react-beautiful-dnd';

const Container = styled.div`
    border : 1px solid lightgrey;
    border-radius: 2px;
    padding : 8px;
    margin-bottom: 8px;
    background-color: ${props => (props.isDragging ? 'lightgreen' : 'white')};
`;

class Task extends React.Component {
  render() {
    let jiraLink = null;
    if (this.props.planner.jiraUrl != "Click to enter JIRA domain url" && this.props.task.content) {
      const jiraNums = this.props.task.content.match(/ENG\w+-\d+/g);
      if (jiraNums && jiraNums.length > 0){
        jiraLink = <a href={this.props.planner.jiraUrl + "/browse/" + jiraNums[0]} target="_blank">&#x279a; </a>;
      }
    }

    return (
      <Draggable draggableId={this.props.task.id} index={this.props.index}>
        {(provided, snapshot) => (
          <Container
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
            isDragging={snapshot.isDragging}
          > {jiraLink}
            {this.props.task.content}
          </Container>
        )}
      </Draggable>
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

  }
}

export default connect(mapState, mapDispatch)(Task)
