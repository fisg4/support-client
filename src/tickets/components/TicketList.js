import { useEffect } from "react";
import CreateModal from "./CreateModal";
import TicketInfo from "./TicketInfo";
import { useSelector, useDispatch } from "react-redux";
import { setTicketList } from "../slices/ticketSlice";

const TicketList = () => {
    const dispatch = useDispatch();
    const ticketState = useSelector((state) => state.ticket);

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

            dispatch(setTicketList(tickets));
        }

        getAllTickets();

    }, [dispatch]);


    return (
        <div className="row my-3" id="ticket-list">
            <div className="col-12">
                <h2 className="text-center">List of Lickets</h2>
            </div>
            <div className="col-12 mb-3 text-end">
                <a className="darkBlueText" href="#create" data-bs-toggle="modal" data-bs-target="#createModal"><i className="bi bi-plus-circle h1"></i></a>
            </div>
            <CreateModal endpoint={`/api/v1/tickets`}/>
            {ticketState.ticketList.length === 0 ?
                (<div className="text-center">No tickets available, would you like to add any?</div>) :
                (ticketState.ticketList.map((ticket) => {
                    return (
                        <TicketInfo key={ticket._id} ticket={ticket} />
                    );
                }))
            }
        </div>
    );
}

export default TicketList;