import React from 'react';
import { Link } from 'react-router-dom';

const PageNotFound = () => (
  <div className="container mainBody">
    <div className="row center-align">
      <Link className="brand-logo" to="/dashboard">
        <img
          width="30%"
          src="https://github.com/fob413/PostIt/blob/chore/feedback/client/src/image/postItLogo.png?raw=true"
          alt="PostIt logo"
        />
      </Link>
      <h1>PAGE NOT FOUND</h1>
    </div>
  </div>
);

export default PageNotFound;
