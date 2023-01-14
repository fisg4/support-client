import React from 'react';
import { Link } from "react-router-dom";

const ReportInfo = ({ report }) => {

    return (
        <div className="col-12 col-md-4">
            <div className="card supportCard">
                <div className="card-body">
                    <h5 className="card-title">{report.title}</h5>
                    <p className="card-text">{report.createDate.split('T')[0]}</p>
                    <div className="pt-3 text-center">
                        <Link to={`/support/reports/${report._id}`}>
                            <div className="btn border-purple text-purple bg-blue btn-lg">
                                Manage
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ReportInfo;