import React from 'react';
import { Link } from "react-router-dom";

const ReportInfo = ({ report }) => {

    return (
        <div className="col-12 col-md-4">
            <div className="card supportCard bgBlue">
                <div className="card-body text-center m-3">
                    <h5 className="card-title">{report.title?.toUpperCase()}</h5>
                    <p className="card-text">Create on {report.createDate.split('T')[0]}</p>
                    <div className="pt-3 text-center">
                        <Link to={`/support/reports/${report._id}`}>
                            <i class="bi bi-hammer"></i>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ReportInfo;