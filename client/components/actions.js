import React from 'react';
import { connect } from 'react-redux'
import styled from 'styled-components'
import { Droppable } from 'react-beautiful-dnd';
import { clearBoard, updatePlanner } from '../store'
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import AddCards from './add-cards';
import EditableLabel from 'react-inline-editing';


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
  background-color: ${props => props.isDraggingOver ? 'skyblue' : 'white'};
`;

const Button = styled.button`
  background-color: indianred;
  border: none;
  color: white;
  padding: 5px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 13px;
  margin: 0 2px 0 2px;
`;


const ExportButton = styled.button`
  background-color: cornflowerblue;
  border: none;
  color: white;
  padding: 5px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 13px;
  margin: 0 2px 0 2px;
`;

const ImportButton = styled.button`
  background-color: cornflowerblue;
  border: none;
  color: white;
  padding: 5px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 13px;
  margin: 0 2px 0 2px;
  width: 300px;
`;


const UrlContainer = styled.div`
  padding: 6px;
  border: 1px solid blue;
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

  handleExport() {
    const dataStr = JSON.stringify(this.props.planner);
    const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);

    const exportFileDefaultName = 'data.json';

    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  }

  handleClickJiraUrl(text) {
    console.log(`text changed to ${text}`)
    const newPlanner = {
      ...this.props.planner,
      jiraUrl: text
    }
    this.props.dispatchUpdatePlanner(newPlanner)
  }

  handleImport(event){
    const reader = new FileReader();
    reader.onload = this.onReaderLoad.bind(this);
    reader.readAsText(event.target.files[0]);
  }

  onReaderLoad(event){
    console.log(event.target.result);
    const planner = JSON.parse(event.target.result);
    this.props.dispatchUpdatePlanner(planner);
  }



  render() {
    return (
      <Container>
        <AddCards></AddCards>
        <Button onClick={this.handleClearBoard.bind(this)}>Reset Board(Clear all)</Button>

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
        <UrlContainer>
          <EditableLabel text={this.props.planner.jiraUrl}
            labelClassName='myLabelClass'
            inputClassName='myInputClass'
            inputWidth='150px'
            inputHeight='25px'
            onFocusOut={this.handleClickJiraUrl.bind(this)}
          />
        </UrlContainer>
        <ExportButton onClick={this.handleExport.bind(this)}>Export/Download</ExportButton>
        <ImportButton ><input id="file" type="file" onChange={this.handleImport.bind(this)}/>Import</ImportButton>

      </Container>
    );
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
    dispatchClearBoard: () => dispatch(clearBoard()),
    dispatchUpdatePlanner: (planner) => dispatch(updatePlanner(planner))
  }
}

export default connect(mapState, mapDispatch)(Actions)
