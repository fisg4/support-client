import { useEffect, useState } from "react";
import TicketInfo from "./ticketInfo";
import TicketsApi from "./TicketsApi";


const TicketList = () => {
    const [tickets, setTickets] = useState([]);

    useEffect(() => {
        console.log('Me estoy ejecutando');
        getAllTickets();
    }, []);

    const getAllTickets = async () => {
        try {
            const tickets = await TicketsApi.getAllTickets();
            setTickets(tickets);
        } catch (error) {
            console.log('Could not contact with the server');
        }
    }

    return (
        <div className="accordion my-3" id="ticket-list">
            {tickets}
            {tickets.map(ticket => (
                <TicketInfo key={ticket.priority}
                    ticket={ticket} />
            ))}
        </div>
    );
}

export default TicketList;