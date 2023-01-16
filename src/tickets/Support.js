import { Fragment, React } from 'react';
import { Link } from "react-router-dom";
import RequireLogin from '../common/requireLogin';

const Support = () => {
  const token = localStorage.getItem('token');

  return (
    <Fragment>
      {!token ? <RequireLogin message={"In order to see your tickets and reports, it is required to be logged in."} /> :
        <div className="container">
          <div className="row my-4">
            <div className="col-12 text-center">
              <h2 className="my-4 pb-4">Welcome to FastMusik support center</h2>
              <p>FastMusik's support center allows you to view and create new tickets and reports.</p> 
              <p>Please contact us whenever you have a problem.</p>
            </div>
            <div className="row my-4">
              <div className="d-grid gap-2 d-md-flex justify-content-center">
                <Link to={`/support/tickets`}>
                  <div className="btn border-purple text-purple bg-blue btn-lg">
                    Go to ticket list
                  </div>
                </Link>
                <Link to={`/support/reports`}>
                  <div className="btn border-purple text-purple bg-blue btn-lg">
                    Go to report list
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>}
    </Fragment>
  );
}

export default Support;