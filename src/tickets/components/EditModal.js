import { useDispatch } from "react-redux";
import { setTicketStatus, setTicketPriority, setValidationErrors } from "../slices/ticketSlice";
import { setReportStatus, setReportValidationErrors } from "../slices/reportSlice";

function EditModal({ endpoint }) {
    const dispatch = useDispatch();
    const ticket = endpoint.includes("tickets") ? true : false;
    const token = localStorage.getItem('token');

    async function editTicketOrReport(endpoint, data) {
        const request = new Request(`${endpoint}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(data)
        });

        const response = await fetch(request);

        if (!response.ok) {
            ticket ? dispatch(setValidationErrors(true)) : dispatch(setReportValidationErrors(true));
            throw Error("Response not valid. " + response.status);
        }

        ticket ?
            dispatch(setTicketStatus(data.status)) && dispatch(setTicketPriority(data.priority)) :
            dispatch(setReportStatus(data.status));
    }

    return (

        <div className="modal fade" id="updateModal" tabIndex="-1" aria-labelledby="updateModal" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered modal-lg">
                <div className="modal-content">
                    <div className="modal-header">
                        {ticket ? (
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Update Ticket</h1>
                        ) : (
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Update Report</h1>)}
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <form>
                            <div className="form-check form-check-inline">
                                <input className="form-check-input" type="radio" name="radio" id="validatedRadio"></input>
                                <label className="form-check-label" htmlFor="validatedRadio">
                                    Validated
                                </label>
                            </div>
                            <div className="form-check form-check-inline">
                                <input className="form-check-input" type="radio" name="radio" id="rejectedRadio" defaultChecked></input>
                                <label className="form-check-label" htmlFor="rejectedRadio">
                                    Rejected
                                </label>
                            </div>
                            {ticket ? (
                                <select className="form-select mt-4" id="prioritySelected">
                                    <option value="low" defaultValue>LOW</option>
                                    <option value="medium">MEDIUM</option>
                                    <option value="high">HIGH</option>
                                </select>) : <></>}
                            <div className="text-end">
                                {ticket ?
                                    (<button type="button"
                                        className="btn border-purple text-purple bg-blue mt-4"
                                        data-bs-dismiss="modal"
                                        onClick={() => editTicketOrReport(
                                            endpoint,
                                            {
                                                "reviewerId": JSON.parse(localStorage.getItem('user')).id,
                                                "status": document.getElementById("validatedRadio").checked ? "validated" : "rejected",
                                                "priority": document.getElementById("prioritySelected").value
                                            })}>
                                        Confirm
                                    </button>) :
                                    (<button type="button"
                                        className="btn border-purple text-purple bg-blue mt-4"
                                        data-bs-dismiss="modal"
                                        onClick={() => editTicketOrReport(
                                            endpoint,
                                            {
                                                "reviewerId": JSON.parse(localStorage.getItem('user')).id,
                                                "status": document.getElementById("validatedRadio").checked ? "approved" : "rejected",
                                            })}>
                                        Confirm
                                    </button>)
                                }
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EditModal;