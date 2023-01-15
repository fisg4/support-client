import { Fragment, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import DeleteBtn from "./DeleteBtn";
import EditModal from "./EditModal";
import { useSelector, useDispatch } from "react-redux";
import { setReportStatus, setReportValidationErrors } from "../slices/reportSlice";
import RequireLogin from "../../common/requireLogin";


const Report = () => {
    const { reportId } = useParams();
    const [report, setReport] = useState([]);
    const [message, setMessage] = useState([]);
    const [existMessage, setExistMessage] = useState(false);
    const dispatch = useDispatch();
    const reportState = useSelector((state) => state.report);
    const token = localStorage.getItem('token');
    let role = null;

    if (token) {
        role = JSON.parse(localStorage.getItem('user')).role;
    }

    useEffect(() => {
        async function fetchMessage(messageId) {
            console.log(messageId);
            const request = new Request("/api/v1/messages/" + messageId, {
                method: "GET",
                headers: {},
            });
            const response = await fetch(request);
            if (!response.ok) {
                throw Error("Response not valid. " + response.status);
            }
            const mes = await response.json();
            if (mes) {
                setExistMessage(true)
                setMessage(mes.content);
            }
        }

        async function getReportById() {
            const request = new Request("/api/v1/reports/" + reportId, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`
                },
            });
            const response = await fetch(request);
            if (!response.ok) {
                throw Error("Response not valid. " + response.status);
            }
            const report = await response.json();
            setReport(report);
            dispatch(setReportStatus(report.status));
            report?.messageId && fetchMessage(report.messageId);
        }

        if (token) {
            getReportById();
        }


    }, [reportId, dispatch]);

    function onAlertClose() {
        dispatch(setReportValidationErrors(false));
    }

    return (
        <Fragment>
            {!token ?
                <RequireLogin message={"You can not manage your reports if you are not logged in the system."} /> :
                <div className="row mb-5 pb-5" id="report-list">
                    <div className="col-12 my-4 p-2">
                        <h2 className="text-center">Report details</h2>
                    </div>
                    {reportState.reportValidationErrors ?
                        (<div className="row d-flew justify-content-center mb-3">
                            <div className="toast align-items-center border-purple bg-blue show" role="alert" aria-live="assertive" aria-atomic="true">
                                <div className="d-flex">
                                    <div className="toast-body">
                                        There are some problems with your request. Try again later!

                                    </div>
                                    <button type="button" className="btn-close me-2 m-auto" data-bs-dismiss="toast" aria-label="Close" onClick={onAlertClose}></button>
                                </div>
                            </div>
                        </div>) : (<></>)}
                    <div className="col-12 col-md-8 offset-md-2">
                        <div className="card text-center ticketDetails bgBlue">
                            <div class="card-header bg-transparent">
                                <h5 className="card-title my-2">{report.title?.toUpperCase()}</h5>
                            </div>
                            <div className="card-body m-3">
                                {existMessage ?
                                    (<div>
                                        <p className="card-text"><strong>Reported message:</strong> {message?.text}</p>
                                    </div>
                                    )
                                    : <></>}
                                <p className="card-text"><strong>Justification of the report:</strong> {report.text?.toLowerCase()}</p>
                            </div>
                            <div className="card-footer text-muted bg-transparent">
                                {report.status === "sent" ?
                                    <p className="card-text">This report has been {report.status} on {report.createDate?.split('T')[0]}</p>
                                    : <p className="card-text">This ticket has been {report.status}</p>}
                                <div className="text-center">
                                    <div className="d-grid gap-2 d-md-flex justify-content-center">
                                        <div className="col-12 ps-0">
                                            {reportState.reportStatus === "validated" || reportState.reportStatus === "rejected" || role === "user" ?
                                                (<></>) :
                                                (<a href="#edit" className="darkBlueText me-4" data-bs-toggle="modal" data-bs-target="#updateModal">
                                                    <i className="bi bi-pencil-square"></i>
                                                </a>)
                                            }
                                            <EditModal endpoint={`/api/v1/reports/${report._id}`} />
                                            {role === "admin" && <DeleteBtn endpoint={`/api/v1/reports/${report._id}`} />}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </Fragment>
    );
}

export default Report;