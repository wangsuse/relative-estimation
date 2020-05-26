import React from 'react'
import styled from 'styled-components'
import Task from './task'
import { Droppable } from 'react-beautiful-dnd'

const Container = styled.div`
  border: 1px solid lightgrey;
  border-radius: 2px;
  margin: 1px;
  width: 220px;

  display: flex;
  flex-direction: column;
  min-height: 600px;
`;

const PlusContainer = styled.div`
  border: 1px solid lightgrey;
  border-radius: 2px;
  margin: 1px;
  width: 15px;

  //display: flex;
  flex-direction: column;
  display: flex;
`;

const Title = styled.h3`
  padding: 8px;
`;
const TaskList = styled.div`
  padding: 8px;
  transition: background-color 0.2s ease;
  background-color: ${props => props.isDraggingOver ? 'skyblue' : 'white'};
  flex-grow: 1;
  min-height: 100px;
`;

const PlusHolder = styled.div`
  padding: 1px;
  transition: background-color 0.2s ease;
  background-color: ${props => props.isDraggingOver ? 'skyblue' : 'white'};
  flex-grow: 1;
  min-height: 100px;
  text-align:center;
  font-size: 15px;
`;



export default class Column extends React.Component {
  render() {
    if (this.props.column.type == "dummy") {
      return (
        <PlusContainer
          type="dummy"
          displayValue={this.props.column.display}
        >
          <Droppable droppableId={this.props.column.id}>
            {(provided, snapshot) => (
              <PlusHolder
                ref={provided.innerRef}
                {...provided.droppableProps}
                isDraggingOver={snapshot.isDraggingOver}
              >
                +
                {provided.placeholder}
              </PlusHolder>
            )}
          </Droppable>
        </PlusContainer >
      );
    } else {
      return (
        < Container >
          <Title >{this.props.column.title}</Title>
          <Droppable droppableId={this.props.column.id}>
            {(provided, snapshot) => (
              <TaskList
                ref={provided.innerRef}
                {...provided.droppableProps}
                isDraggingOver={snapshot.isDraggingOver}
              >
                {this.props.tasks.map((task, index) => (
                  <Task key={task.id} task={task} index={index}></Task>
                ))}
                {provided.placeholder}
              </TaskList>
            )}
          </Droppable>
        </Container >
      )
    }

  }
}
