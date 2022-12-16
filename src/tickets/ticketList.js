import { useEffect, useState } from "react";
import Ticket from "./ticket";
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
        <div className="accordion" id="ticket-list">
            {tickets.map(ticket => (
                <Ticket key={ticket.priority}
                        ticket={ticket}/>
            ))}
        </div>
    );
}

export default TicketList;