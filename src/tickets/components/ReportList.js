import { Fragment, useEffect } from "react";
import ReportInfo from "./ReportInfo";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setReportList } from "../slices/reportSlice";
import RequireLogin from "../../common/requireLogin";

const ReportList = () => {
    const dispatch = useDispatch();
    const reportState = useSelector((state) => state.report);
    const token = localStorage.getItem('token');

    useEffect(() => {
        async function getAllReports() {
            const request = new Request("/api/v1/reports", {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`
                },
            });

            const response = await fetch(request);

            if (!response.ok) {
                throw Error("Response not valid. " + response.status);
            }

            const reports = await response.json();

            dispatch(setReportList(reports));
        }

        async function getReportsFromUser(id) {
            const request = new Request(`/api/v1/reports/user/${id}`, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`
                },
            });

            const response = await fetch(request);

            if (!response.ok) {
                throw Error("Response not valid. " + response.status);
            }

            const reports = await response.json();

            dispatch(setReportList(reports));
        }

        if (token) {
            const role = JSON.parse(localStorage.getItem('user')).role;

            if (role === "admin") {
                getAllReports();
            } else if (role === "user") {
                const userId = JSON.parse(localStorage.getItem('user')).id;
                getReportsFromUser(userId);
            }
        }

    }, [dispatch, token]);

    return (
        <Fragment>
            {!token ?
                <RequireLogin message={"In order to see your reports, it is required to be logged in."} /> :
                <div className="row my-5 pb-5" id="report-list">
                    <div className="col-12 mb-5">
                        <h2 className="text-center">List of Reports</h2>
                    </div>
                    {reportState.reportList.length === 0 ?
                        (<div className="text-center">No reports available</div>) :
                        (reportState.reportList.map((report) => {
                            return (
                                <ReportInfo key={report._id} report={report} />
                            );
                        }))
                    }
                </div>
            }
        </Fragment>
    );
}

export default ReportList;