import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import DeleteBtn from "./DeleteBtn";
import EditModal from "./EditModal";
import { useSelector, useDispatch } from "react-redux";
import { setReportStatus, setReportValidationErrors } from "../slices/reportSlice";


const Report = () => {
    const { reportId } = useParams();
    const [report, setReport] = useState([]);
    const dispatch = useDispatch();
    const reportState = useSelector((state) => state.report);

    useEffect(() => {
        async function getReportById() {
            const request = new Request("/api/v1/reports/" + reportId, {
                method: "GET",
                headers: {
                    "Authorization": "Bearer " + "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzYWVlNDQxMjA4N2NiYzg3MGNiNGRmYiIsInJvbGUiOiJhZG1pbiIsInBsYW4iOiJmcmVlIiwidXNlcm5hbWUiOiJlbGVuYTIiLCJlbWFpbCI6ImVsZW5hQGV4YW1wbGUuY29tIiwiaWF0IjoxNjcyNDA2MTM4fQ.ia1D_J-_dggngzozKmO1eAiKoU13_sfR1laLsMS9jXs"
                },
            });

            const response = await fetch(request);

            if (!response.ok) {
                throw Error("Response not valid. " + response.status);
            }

            const report = await response.json();
            setReport(report);
            dispatch(setReportStatus(report.status));
            dispatch(setReportValidationErrors(false));
        }

        getReportById();

    }, [reportId, dispatch]);


    return (
        <div className="row my-3" id="report-list">
            <div className="col-12">
                <h2 className="text-center">Report details</h2>
            </div>
            <div className="col-12 mb-4 text-start">
                <Link to={`/support/reports`}>
                    <div className="btn border-purple text-purple bg-blue">
                        <i className="bi bi-arrow-left"></i>
                    </div>
                </Link>
            </div>
            {reportState.reportValidationErrors ?
                (<div className="row d-flew justify-content-center mb-3">
                    <div className="toast align-items-center border-purple bg-blue show" role="alert" aria-live="assertive" aria-atomic="true">
                        <div className="d-flex">
                            <div className="toast-body">
                                There are some problems with your request. Try again!
                            </div>
                            <button type="button" className="btn-close me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
                        </div>
                    </div>
                </div>) : (<></>)}
            <div className="col-12 col-md-8 offset-md-2">
                <div className="card ticketCard">
                    <div className="card-body">
                        <h5 className="card-title">{report.title}</h5>
                        <p className="card-text">{report.text}</p>
                        <p className="card-text">{reportState.reportStatus}</p>
                        <p className="card-text">{report.createDate?.split('T')[0]}</p>
                        <div className="pt-3 text-center">
                            <div className="d-grid gap-2 d-md-flex justify-content-center">
                                {reportState.reportStatus === "validated" || reportState.reportStatus === "rejected" ?
                                    (<></>) :
                                    (<div className="btn border-purple text-purple bg-blue btn-lg" data-bs-toggle="modal" data-bs-target="#updateModal">
                                        Edit
                                    </div>)
                                }
                                <EditModal endpoint={`/api/v1/reports/${report._id}`} />
                                <DeleteBtn endpoint={`/api/v1/reports/${report._id}`} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Report;