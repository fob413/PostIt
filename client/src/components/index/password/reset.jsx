import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { forgotPassword } from '../../../actions/resetPassActions';


/**
 * @class Reset
 * @extends {React.Component}
 */
class Reset extends React.Component {

  /**
   * Creates an instance of Reset.
   * @param {any} props
   * @memberof Reset
   */
  constructor(props) {
    super(props);
    this.onReset = this.onReset.bind(this);
  }


  /**
   * function to reset users password
   * @param {any} event
   * @memberof Reset
   * @return {void}
   */
  onReset(event) {
    event.preventDefault();
    const { email } = this.refs;
    email.value = email.value.trim();

    if (email.value.length > 0) {
      this.props.forgotPassword(email.value)
      .then((res) => {
        if (res.success) {
          Materialize.toast(
            'Check your mail for instructions',
            4000,
            'green darken-4');
          email.value = '';
        } else {
          Materialize.toast(
            res.message,
            4000,
            'red');
        }
      }, (err) => {
        Materialize.toast(
          `An error occured: ${err.message}`,
          4000,
          'red');
        email.value = '';
      });
    } else {
      Materialize.toast(
        'Invalid email',
        4000,
        'red');
    }
  }


  /**
   * @memberof Reset
   * @return {void}
   */
  render() {
    return (
      <div className="container">
        <div className="row center-align">
          <img
            width="30%"
            src="https://github.com/fob413/PostIt/blob/chore/feedback/client/src/image/postItLogo.png?raw=true"
            alt="PostIt Logo"
          />
        </div>

        <div className="row forgotInput">
          <div className="row">
            <div className="col s12 m3" />
            <div className="col s12 m6">
              <div className="card">
                <div className="card-content">
                  <p className="forgotBold">
                    Can't Sign In? Forgot Your Password?
                  </p>
                  <p>
                    Enter your email address below and
                     we'll send you password reset instructions.
                  </p>
                  <form onSubmit={this.onReset}>
                    <div className="input-field">
                      <input ref="email" id="email" type="email" className="validate" />
                      <label htmlFor="email" data-error="wrong" data-success="right">
                        Enter Your Email
                      </label>
                    </div>
                    <button
                      className="btn waves-effect waves-light pink darken-4"
                      type="submit"
                      name="action"
                    >
                      Send me reset instructions
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Reset.propTypes = {
  forgotPassword: PropTypes.func.isRequired
};

const mapStateToProps = state => (
  {

  }
);

export default connect(
  mapStateToProps,
  {
    forgotPassword
  }
)(Reset);
