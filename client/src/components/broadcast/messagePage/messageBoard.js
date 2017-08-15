import React from 'react';

class MessageBoard extends React.Component {
  constructor(props) {
    super(props);
    this.onSend = this.onSend.bind(this);
  }

  onSend(e){
    const {_message, _priority} = this.refs;
    e.preventDefault();
    alert(_message.value);
    console.log(_priority.value);
  }


  render () {
    return (
      <div className="container">
        <div className="row messageBoard">
          <div className="col s12">
            <div className="col s8">
              <div className="message">
                message side prolly
              </div>

              <div className="row">
                <form onSubmit={this.onSend}>
                  <div className="input-field col s12">
                    <input
                      ref="_message" 
                      className="sendMessage" 
                      type="text" 
                      placeholder="Type A Message" 
                    />
                  </div>

                  <div className="col m4 browser-default">
                    <select
                      defaultValue="1" 
                      ref="_priority" 
                      className="browser-default"
                    >
                      <option value="1">Normal</option>
                      <option value="2">Urgent</option>
                      <option value="3">Critical</option>
                    </select>
                  </div>
                  
                  <div className="right">
                    <button
                      className="btn-large green darken-4 waves effect"
                    >
                      SEND
                    </button>
                  </div>
                </form>
              </div>
              
            </div>

            <div className="col s4">
              <div>
                <form className="col s12">
                  <div className="row">
                    <input
                      className="validate"
                      type="text"
                      placeholder="Add User"
                    />
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default MessageBoard;
