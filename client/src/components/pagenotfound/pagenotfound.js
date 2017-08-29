import React from 'react';

class PageNotFound extends React.Component{
  render() {
    return (
      <div className="container">
        <div className="row center-align">
          <img
            width="30%"
            src={require("../../image/postitD.png")}
            alt="PostIt logo"
          />
          <h1>PAGE NOT FOUND</h1>
        </div>
      </div>
    );
  }
}

export default PageNotFound;
