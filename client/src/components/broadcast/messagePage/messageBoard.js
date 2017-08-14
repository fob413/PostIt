import React from 'react';

class MessageBoard extends React.Component {
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
                <form>
                  <div className="input-field col s12">
                    <input className="sendMessage" type="text" placeholder="Type A Message" />
                  </div>

                  <div className="input-field col s12">
                  <select>
                    <option value="1" selected>Normal</option>
                    <option value="2">Urgent</option>
                    <option value="3">Critical</option>
                  </select>
                    <label>Message Priority</label>
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
