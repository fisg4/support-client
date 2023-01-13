import React from 'react'
import { Link } from "react-router-dom";

const Support = () => {
  return (
    <div className="container">
      <h2>Welcome to FastMusik support center</h2>
      <Link to={`/support/tickets`}>
        <div className="btn border-purple text-purple bg-blue btn-lg">
          Tickets
        </div>
      </Link>
    </div>
  );
}

export default Support;