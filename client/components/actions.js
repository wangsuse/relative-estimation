import React from 'react';
import { connect } from 'react-redux'
import styled from 'styled-components'
import { Droppable } from 'react-beautiful-dnd';

const Container = styled.div`
  border: 1px solid lightgrey;
  border-radius: 2px;
  margin: 1px;
  width: 100%;

  display: flex;
  flex-direction: column;
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

export default class Actions extends React.Component {
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

      </Container>
    );
  }
}
