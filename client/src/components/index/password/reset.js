import React from 'react';
import { connect } from 'react-redux';
import { forgotPassword } from '../../../actions/resetPassActions';

class Reset extends React.Component {
  constructor(props){
    super(props);
    this.onReset = this.onReset.bind(this);
  }

  onReset(e){
    e.preventDefault();
    const { _email } = this.refs;
    _email.value = _email.value.trim();
    
    if (_email.value.length > 0) {
      this.props.forgotPassword(_email.value)
      .then((res) => {
        if (res.success){
          Materialize.toast(
            'Check your mail for instructions',
            4000,
            'green darken-4');
            _email.value='';
        } else {
          Materialize.toast(
            res.message,
            4000,
            'red');
        }
        
          
      }, err => {
        console.log(err);
        Materialize.toast(
          'An error occured',
          4000,
          'red');
          _email.value='';
      });
    } else {
      Materialize.toast(
        'Invalid email',
        4000,
        'red');
    }
  }

  render() {
    return (
      <div className="container">
        <div className="row center-align">
          <img
            width="30%"
            src={require("../../../image/postitD.png")}
            alt="PostIt Logo"
          />
        </div>

        <div className="row forgotInput">
          <div className="row">
            <div className="col s12 m2"></div>
            <div className="col s12 m8">
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
                      <input ref="_email" id="email" type="email" className="validate" />
                      <label htmlFor="email" data-error="wrong" data-success="right">Enter Your Email</label>
                    </div>
                    <button className="btn waves-effect waves-light green darken-1" type="submit" name="action">
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
