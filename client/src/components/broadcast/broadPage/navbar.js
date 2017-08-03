import React, {PropTypes} from 'react';

class NavBar extends React.Component {
  constructor(props){
    super(props);

    this.onLogout = this.onLogout.bind(this);
  }

  onLogout(e){
    console.log('attempt to logout>>>>>>');
  }

  render() {
    return (
      <div>
        <nav>
          <div className="nav-wrapper green darken-4">
            <a className="brand-logo center" href="#">
              <img
                width="70px"
                alt="PostIt Logo"
                src={require("../../../image/postitL.png")}
              />
            </a>
            <ul className="left" id="nav-mobile">
              <li>
                <a className="modal-trigger" href="#modal1">
                  <i
                    href="#modal1"
                    className="modal-trigger white-text material-icons hoverable"
                  >
                    settings
                  </i>
                </a>
              </li>
            </ul>

            <ul className="right" id="nav-mobile">
              <li>
                <i onClick={this.props.logout} className="material-icons white-text logout hoverable">exit_to_app</i>
              </li>
            </ul>
          </div>
        </nav>

        <div id="modal1" className="modal">
          <div className="modal-content">
            <h4>USER PROFILE</h4>

            <form>

              <div className="row">
                <div className="input-field col s12 m12">
                  <input 
                    className="validate"
                    type="text"
                    id="userName"
                    data-error="wrong"
                    data-success="right"
                  />
                  <label htmlFor="userName">Username</label>
                </div>
              </div>

              <div className="row">
                <div className="input-field col s12 m12">
                  <input 
                    className="validate"
                    type="email"
                    id="email"
                    data-error="wrong"
                    data-success="right"
                  />
                  <label htmlFor="email">Email</label>
                </div>
              </div>

              <div className="row">
                <div className="input-field col s12 m12">
                  <input 
                    className="validate"
                    type="text"
                    id="phoneNumber"
                    data-error="wrong"
                    data-success="right"
                  />
                  <label htmlFor="phoneNumber">Phone Number</label>
                </div>
              </div>

              <div className="modal-footer">
                <button
                  className="btn-large green darken-4 waves-effect"
                  type="submit"
                  name="action"
                >
                  Submit
                </button>
              </div>

            </form>
          </div>
        </div>
      </div>
    )
  }
}

NavBar.propTypes = {
  logout: PropTypes.func.isRequired
}

export default NavBar;