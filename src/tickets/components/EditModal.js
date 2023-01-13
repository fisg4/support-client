import { useDispatch } from "react-redux";
import { setTicketStatus, setRadio, setTicketPriority, setSelect } from "../slices/ticketSlice";

function EditModal({ endpoint }) {
    const dispatch = useDispatch();

    async function editTicketOrReport(endpoint, data) {
        const request = new Request(`${endpoint}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzYWVlNDQxMjA4N2NiYzg3MGNiNGRmYiIsInJvbGUiOiJhZG1pbiIsInBsYW4iOiJmcmVlIiwidXNlcm5hbWUiOiJlbGVuYTIiLCJlbWFpbCI6ImVsZW5hQGV4YW1wbGUuY29tIiwiaWF0IjoxNjcyNDA2MTM4fQ.ia1D_J-_dggngzozKmO1eAiKoU13_sfR1laLsMS9jXs"
            },
            body: JSON.stringify(data)
        });

        const response = await fetch(request);

        if (!response.ok) {
            throw Error("Response not valid. " + response.status);
        }

        dispatch(setTicketStatus(data.status));
        dispatch(setTicketPriority(data.priority));
    }

    return (

        <div className="modal fade" id="updateModal" tabIndex="-1" aria-labelledby="ticketModal" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered modal-lg">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="exampleModalLabel">Update Ticket</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <form>
                            <div className="form-check form-check-inline">
                                <input className="form-check-input" type="radio" name="radio" id="validatedRadio" onClick={() => dispatch(setRadio("validated"))}></input>
                                <label className="form-check-label" htmlFor="validatedRadio">
                                    Validated
                                </label>
                            </div>
                            <div className="form-check form-check-inline">
                                <input className="form-check-input" type="radio" name="radio" id="rejectedRadio" defaultChecked onClick={() => dispatch(setRadio("rejected"))}></input>
                                <label className="form-check-label" htmlFor="rejectedRadio">
                                    Rejected
                                </label>
                            </div>
                            <select className="form-select mt-4" id="prioritySelected" onChange={(e) => dispatch(setSelect(e.target.value))}>
                                <option value="low" defaultValue>LOW</option>
                                <option value="medium">MEDIUM</option>
                                <option value="high">HIGH</option>
                            </select>
                        </form>
                    </div>
                    <div className="modal-footer">
                        <button
                            type="button"
                            className="btn border-purple text-purple bg-blue"
                            data-bs-dismiss="modal"
                            onClick={() => editTicketOrReport(
                                endpoint,
                                {
                                    "reviewerId": "63aee4412087cbc870cb4dfb",
                                    "status": document.getElementById("validatedRadio").checked ? "validated" : "rejected",
                                    "priority": document.getElementById("prioritySelected").value
                                }
                            )}
                        >
                            Confirm
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EditModal;