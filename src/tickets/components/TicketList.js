import { useEffect, useState } from "react";
import CreateModal from "./CreateModal";
import TicketInfo from "./TicketInfo";

const TicketList = () => {
    const [tickets, setTickets] = useState([]);

    useEffect(() => {
        async function getAllTickets() {
            const request = new Request("/api/v1/tickets", {
                method: "GET",
                headers: {
                    "Authorization": "Bearer " + "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzYWVlNDQxMjA4N2NiYzg3MGNiNGRmYiIsInJvbGUiOiJhZG1pbiIsInBsYW4iOiJmcmVlIiwidXNlcm5hbWUiOiJlbGVuYTIiLCJlbWFpbCI6ImVsZW5hQGV4YW1wbGUuY29tIiwiaWF0IjoxNjcyNDA2MTM4fQ.ia1D_J-_dggngzozKmO1eAiKoU13_sfR1laLsMS9jXs"
                },
            });

            const response = await fetch(request);

            if (!response.ok) {
                throw Error("Response not valid. " + response.status);
            }

            const tickets = await response.json();

            setTickets(tickets);
        }

        getAllTickets();

    }, []);


    return (
        <div className="row my-3" id="ticket-list">
            <div className="col-1 offset-11 mb-2 text-end">
                <a className="darkBlueText" href="#create" data-bs-toggle="modal" data-bs-target="#createModal"><i className="bi bi-plus-circle h1"></i></a>
            </div>
            <CreateModal endpoint={`/api/v1/tickets`}/>
            {tickets.length === 0 ?
                (<div>No hay tickets disponibles</div>) :
                (tickets.map((ticket) => {
                    return (
                        <TicketInfo key={ticket._id} ticket={ticket} />
                    );
                }))
            }
        </div>
    );
}

export default TicketList;