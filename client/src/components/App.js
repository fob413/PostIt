import React, {PropTypes} from 'react';

class App extends React.Component {
  render() {
    return (
      <div>
        <p>Test one two three</p>
        {this.props.children}
      </div>
    );
  }
}

App.PropTypes = {
  children: PropTypes.object.isRequired
};

export default App;