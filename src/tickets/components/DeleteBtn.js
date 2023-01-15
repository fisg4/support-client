import { useNavigate } from "react-router-dom";

function DeleteBtn({ endpoint }) {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    async function deleteTicketOrReport(endpoint) {
        const request = new Request(`${endpoint}`, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${token}`
            },
        });

        const response = await fetch(request);

        if (!response.ok) {
            throw Error("Response not valid. " + response.status);
        }

        endpoint.includes("tickets") ? navigate("/support/tickets") : navigate("/support/reports");

    }


    return (
        <div className="btn border-purple text-purple bg-blue btn-lg" onClick={() => {deleteTicketOrReport(endpoint)}}>
            Delete
        </div>
    );
}

export default DeleteBtn;