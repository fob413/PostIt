import React, {PropTypes} from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { signUserOut } from '../../actions/authActions';
import { authenticateUser } from '../auth';
import { unloadGroups } from '../../actions/groupsActions';

class NavBar extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      isAuth: this.props.auth.isLoggedIn
    };

    this.onSignOut = this.onSignOut.bind(this);
  }

  componentWillMount(){
    // if(localStorage.getItem('x-auth')){
    //   console.log('user logged in');
    //   this.setState({
    //     isAuth: true
    //   });
    // }
    // authenticateUser()
    // .then(status=>{
    //   this.setState({
    //     isAuth: true
    //   });
    // })
    // .catch(err=>{
    //   console.log(err);
    //   this.setState({
    //     isAuth: false
    //   })
    
    // });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      isAuth: nextProps.auth.isLoggedIn
    });
  }  

  onSignOut(e) {
    e.preventDefault();
    this.props.signUserOut()
    .then((res) => {
      this.props.unloadGroups();
      if (res) {
        this.setState({
          isAuth: false
        });
        //this.props.unloadGroups();
        this.props.history.push('/signin');
      }
    });
  }

  render() {
    const { isAuth } = this.state;
    return (
      <div>
        {isAuth && (
          <nav>
            <div className="nav-wrapper green darken-4">
           
              <Link className="brand-logo center" to="/broadpage">
                <img
                  width="70px"
                  alt="PostIt Logo"
                  src={require("../../image/postitL.png")}
                />
              </Link>
            
              <ul className="left" id="nav-mobile">
                <li>
                  <Link to="/profile">
                    <i
                      className="modal-trigger white-text material-icons hoverable logout"
                    >
                      settings
                    </i>
                  </Link>
                </li>
              </ul>

              <ul className="right" id="nav-mobile">
                <li>
                  <i
                    onClick={this.onSignOut}
                    className="material-icons white-text logout hoverable"
                  >
                    exit_to_app
                  </i>
                </li>
              </ul>
            </div>
          </nav>  
        )}
      </div>
    )
  }
}

/*
* Validation of the components properties
*/
NavBar.propTypes = {
};

const mapStateToProps = state => (
 {
    auth: state.MyApp,
    groups: state.Groups
 }
);

export default connect(mapStateToProps, { signUserOut, unloadGroups })(withRouter(NavBar));