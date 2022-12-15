import React from 'react';

const Ticket = ({ ticket }) => {

    return (
        <div class="accordion-item">
            <h2 class="accordion-header" id={"header" + ticket.id}>
                <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target={"#body" + ticket.id} aria-expanded="true" aria-controls={"body" + ticket.id}>
                    {ticket.title + " (" + ticket.priority + ")"}
                </button>
            </h2>
            <div id={"body" + ticket.id} class="accordion-collapse collapse" aria-labelledby={"header" + ticket.id} data-bs-parent="#ticket-list">
                <div class="accordion-body">
                    {ticket.text}
                </div>
            </div>
        </div>
    );
}

export default Ticket;