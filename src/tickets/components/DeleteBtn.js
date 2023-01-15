import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setValidationErrors } from "../slices/ticketSlice";
import { setReportValidationErrors } from "../slices/reportSlice";

function DeleteBtn({ endpoint }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    const ticket = endpoint.includes("tickets") ? "ticket" : "report";

    async function deleteTicketOrReport(endpoint) {
        const request = new Request(`${endpoint}`, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${token}`
            },
        });

        const response = await fetch(request);

        if (!response.ok) {
            ticket === "ticket" ? dispatch(setValidationErrors(true)) : dispatch(setReportValidationErrors(true));
            throw Error("Response not valid. " + response.status);
        }

        ticket === "ticket" ? dispatch(setValidationErrors(false)) : dispatch(setReportValidationErrors(false));
        endpoint.includes("tickets") ? navigate("/support/tickets") : navigate("/support/reports");

    }


    return (
        <>
            <a className="h1 darkBlueText" href="#deleteTicketOrReport" data-bs-toggle="modal" data-bs-target="#deleteTicketOrReportModal">
                <i className="bi bi-trash-fill"></i>
            </a>
            <div className="modal fade" id="deleteTicketOrReportModal" tabIndex="-1" aria-labelledby="deleteTicketOrReportModal" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5">Delete {ticket}</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <p>Are you sure you want to delete this {ticket}?</p>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn border-purple text-purple bg-blue" data-bs-dismiss="modal" onClick={() => { deleteTicketOrReport(endpoint) }}>Delete</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default DeleteBtn;