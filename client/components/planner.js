
import React from 'react'
import {connect} from 'react-redux'

class Planner extends React.Component {
  render() {
    return <h1>Hello, shusen</h1>;
  }
}


/**
 * CONTAINER
 */
const mapState = state => {
  return {
  }
}

const mapDispatch = dispatch => {
  return {
  }
}

export default connect(mapState, mapDispatch)(Planner)
