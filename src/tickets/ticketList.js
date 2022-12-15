import Ticket from "./ticket";


const tickets = [
    {
        "id": 1,
        "title": "Título del ticket",
        "text": "Mensaje con la incidencia",
        "priority": "low",
    },
    {
        "id": 2,
        "title": "Segundo título del ticket",
        "text": "Segundo mensaje con la incidencia",
        "priority": "medium",
    }
]

const TicketList = () => {

    return (
        <div class="accordion" id="ticket-list">
            {tickets.map(ticket => (
                <Ticket key={ticket.id}
                        ticket={ticket}/>
            ))}
        </div>
    );
}

export default TicketList;