import { useNavigate } from "react-router-dom";

function DeleteBtn({ endpoint }) {
    const navigate = useNavigate();

    async function deleteTicketOrReport(endpoint) {
        const request = new Request(`${endpoint}`, {
            method: "DELETE",
            headers: {
                "Authorization": "Bearer " + "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzYWVlNDQxMjA4N2NiYzg3MGNiNGRmYiIsInJvbGUiOiJhZG1pbiIsInBsYW4iOiJmcmVlIiwidXNlcm5hbWUiOiJlbGVuYTIiLCJlbWFpbCI6ImVsZW5hQGV4YW1wbGUuY29tIiwiaWF0IjoxNjcyNDA2MTM4fQ.ia1D_J-_dggngzozKmO1eAiKoU13_sfR1laLsMS9jXs"
            },
        });

        const response = await fetch(request);

        if (!response.ok) {
            throw Error("Response not valid. " + response.status);
        }

        navigate("/support/tickets");
    }


    return (
        <div className="btn border-purple text-purple bg-blue btn-lg" onClick={() => {deleteTicketOrReport(endpoint)}}>
            Delete
        </div>
    );
}

export default DeleteBtn;