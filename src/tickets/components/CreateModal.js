import { useDispatch } from "react-redux";
import { addTicket, setValidationErrors } from "../slices/ticketSlice";

function CreateModal({ endpoint }) {
    const dispatch = useDispatch();
    const token = localStorage.getItem('token');

    async function createTicket(endpoint, data) {
        const request = new Request(`${endpoint}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({authorId: JSON.parse(localStorage.getItem('user')).id, ...data})
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
                                            "title": document.getElementById("ticketTitle").value,
                                            "text": document.getElementById("ticketText").value,
                                            "priority": document.getElementById("prioritySelected").value,
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