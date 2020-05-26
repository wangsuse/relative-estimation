import React from 'react';
import { connect } from 'react-redux'
import styled from 'styled-components'
import { Droppable } from 'react-beautiful-dnd';
import {clearBoard} from '../store'
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css

const Container = styled.div`
  border: 1px solid lightgrey;
  border-radius: 2px;
  margin: 1px;
  width: 100%;

  display: flex;
  flex-direction: row;
  height: 30px;
`;

const DeleteZone = styled.div`
  border: 1px solid darkorange;
  border-radius: 2px;
  margin: 1px;
  width: 200px;
  height: 28px;
  text-align: center;
`;

const Button = styled.button`
  background-color: indianred;
  border: none;
  color: white;
  padding: 5px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
`;



class Actions extends React.Component {
  handleClearBoard() {
    confirmAlert({
      message: 'Are you sure to reset the Board? This will delete all user data.',
      buttons: [
        {
          label: 'Yes',
          onClick: () => this.props.dispatchClearBoard()
        },
        {
          label: 'No',
        }
      ]
    });

    return;
  }

  render(){
    return (
      <Container>
          <Droppable droppableId="deleteZone">
            {(provided, snapshot) => (
              <DeleteZone
                ref={provided.innerRef}
                {...provided.droppableProps}
                isDraggingOver={snapshot.isDraggingOver}
              >
               Drop here to remove
                {provided.placeholder}
              </DeleteZone>
            )}
          </Droppable>
          <Button onClick={this.handleClearBoard.bind(this)}>Reset Board(Clear all)</Button>

      </Container>
    );
  }
}

const mapDispatch = dispatch => {
  return {
    dispatchClearBoard: () => dispatch(clearBoard())
  }
}

export default connect(null, mapDispatch)(Actions)
