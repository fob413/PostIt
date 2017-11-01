import React, { PropTypes } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';


/**
 * @class NavBar
 * @extends {React.Component}
 */
class Footer extends React.Component {

  /**
   * Creates an instance of NavBar.
   * @param {any} props
   * @memberof NavBar
   */
  constructor(props) {
    super(props);
    this.state = {
      isAuth: this.props.auth.isLoggedIn
    };
  }


  /**
   * @param {any} nextProps
   * @memberof NavBar
   * @return {void}
   */
  componentWillReceiveProps(nextProps) {
    this.setState({
      isAuth: nextProps.auth.isLoggedIn
    });
  }

  /**
   * @memberof NavBar
   * @return {void}
   */
  render() {
    const { isAuth } = this.state;
    return (
      <div>
        {isAuth && (
          <footer className="page-footer teal darken-4">
            <div className="footer-copyright">
              <div className="container">
                © 2017 Copyright PostIt
              </div>
            </div>
          </footer>
        )}
      </div>
    );
  }
}

/*
* Validation of the components properties
*/
Footer.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => (
  {
    auth: state.Auth,
    groups: state.Groups
  }
);

export default connect(mapStateToProps, {})(withRouter(Footer));
