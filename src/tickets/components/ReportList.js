import { useEffect } from "react";
import ReportInfo from "./ReportInfo";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setReportList } from "../slices/reportSlice";

const ReportList = () => {
    const dispatch = useDispatch();
    const reportState = useSelector((state) => state.report);

    useEffect(() => {
        async function getAllReports() {
            const request = new Request("/api/v1/reports", {
                method: "GET",
                headers: {
                    "Authorization": "Bearer " + "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzYWVlNDQxMjA4N2NiYzg3MGNiNGRmYiIsInJvbGUiOiJhZG1pbiIsInBsYW4iOiJmcmVlIiwidXNlcm5hbWUiOiJlbGVuYTIiLCJlbWFpbCI6ImVsZW5hQGV4YW1wbGUuY29tIiwiaWF0IjoxNjcyNDA2MTM4fQ.ia1D_J-_dggngzozKmO1eAiKoU13_sfR1laLsMS9jXs"
                },
            });

            const response = await fetch(request);

            if (!response.ok) {
                throw Error("Response not valid. " + response.status);
            }

            const reports = await response.json();

            dispatch(setReportList(reports));
        }

        getAllReports();

    }, [dispatch]);


    return (
        <div className="row my-3" id="report-list">
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
    );
}

export default ReportList;