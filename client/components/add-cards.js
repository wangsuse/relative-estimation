import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import Popup from "reactjs-popup";
import { addTasks } from '../store';
import { v4 as uuidv4 } from 'uuid';

const AddCardsButton = styled.button`
  background-color: green;
  border: none;
  color: white;
  padding: 5px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 13px;
  margin: 0 2px 0 5px;
`;

const Textaera = styled.textarea`
  width: 100%;
`;

class AddCards extends React.Component {
  handleTextChange(event) {
    this.setState({
      text: event.target.value
    })
  }

  addCardsHandler() {
    if (this.state && this.state.text) {
      const text = this.state.text;
      console.log(text);
      const tasks = this.convertToTask(text);
      this.props.dispatchAddTasks(tasks);
    }
  }

  convertToTask(text) {
    const res = {};
    try {
      let data = text.split(/\r?\n/);

      data = data.filter((line) => {
        return line.trim().toLowerCase() !== "actions"
      })
      data.map(line => {
        return line.trim()
      })

      for (let i = 0; i < data.length; i++) {
        const taskId = uuidv4()
        res[taskId] = {
            id: taskId,
            content: data[i]
        };
      }

        }catch(error) {
    console.log(error)
  }
    return res;
  }

render() {
  return (
    <Popup trigger={<AddCardsButton >Click to add cards</AddCardsButton>} modal>
      {close => (
        <div className="modal">
          <a className="close" onClick={close}>
            &times;
               </a>
          <div className="header"> Enter Cards(One card will be created per line) </div>
          <Textaera rows="30" onChange={this.handleTextChange.bind(this)}></Textaera>
          <div className="actions">
            <button className="button" onClick={this.addCardsHandler.bind(this)}> Add </button>
            <button
              className="button"
              onClick={() => {
                console.log("modal closed ");
                close();
              }}
            >
              close
          </button>
          </div>
        </div>
      )}
    </Popup>
  );
}
}



const mapDispatch = dispatch => {
  return {
    dispatchAddTasks: (tasks) => dispatch(addTasks(tasks))
  }
}

export default connect(null, mapDispatch)(AddCards)
