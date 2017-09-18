import React from 'react';

class Sample extends React.Component{
  render() {
    return (
      <div>
          <a className='dropdown-button btn' href='#' data-activates='dropdown1'>Drop Me!</a>
          
          <ul id='dropdown1' className='dropdown-content'>
            <li><a href="#!">one</a></li>
            <li><a href="#!">two</a></li>
            <li className="divider"></li>
            <li><a href="#!">three</a></li>
            <li><a href="#!"><i className="material-icons">view_module</i>four</a></li>
            <li><a href="#!"><i className="material-icons">cloud</i>five</a></li>
          </ul>
      </div>
    );
  }
}

export default Sample;
