import { useDispatch } from "react-redux";
import { addTicket, setValidationErrors } from "../slices/ticketSlice";

function CreateModal({ endpoint }) {
    const dispatch = useDispatch();

    async function createTicket(endpoint, data) {
        const request = new Request(`${endpoint}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzYWNhYzljMjA4N2NiYzg3MGNiNGRjNyIsInJvbGUiOiJ1c2VyIiwicGxhbiI6ImZyZWUiLCJ1c2VybmFtZSI6ImVsZW5hIiwiZW1haWwiOiJ1c2VyQGV4YW1wbGUuY29tIiwiaWF0IjoxNjcyNDA0OTA5fQ.LBgT58_oXqb86yc9Oyc20nFGb_GuDRcmgK8hABvcyFQ"
            },
            body: JSON.stringify(data)
        });
        const response = await fetch(request);

        if (!response.ok) {
            dispatch(setValidationErrors(true));
            throw Error("Response not valid. " + response.status);
        }
        const ticket = await response.json(); 
               
        dispatch(setValidationErrors(false));
        dispatch(addTicket(ticket.content));
    }

    return (
        <div className="modal fade" id="createModal" data-bs-backdrop="static" tabIndex="-1" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5">Create ticket</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <form>
                            <div className="mb-3">
                                <label htmlFor="ticketTitle" className="form-label">Title</label>
                                <input type="text" className="form-control" id="ticketTitle" maxLength={100} required />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="ticketText" className="form-label">Text</label>
                                <textarea type="text" className="form-control" id="ticketText" maxLength={255} required />
                            </div>
                            <select className="form-select mt-4" id="prioritySelected" required>
                                <option value="low" defaultValue>LOW</option>
                                <option value="medium">MEDIUM</option>
                                <option value="high">HIGH</option>
                            </select>
                            <div className="text-end">
                                <button
                                    type="button"
                                    className="btn border-purple text-purple bg-blue mt-4"
                                    data-bs-dismiss="modal"
                                    onClick={() => createTicket(
                                        endpoint,
                                        {
                                            "authorId": "63acac9c2087cbc870cb4dc7",
                                            "title": document.getElementById("ticketTitle").value,
                                            "text": document.getElementById("ticketText").value,
                                            "status": document.getElementById("prioritySelected").value,
                                        }
                                    )}>
                                    Confirm
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CreateModal;