import React from 'react';

const TicketInfo = ({ ticket }) => {

    return (
        <div className="accordion-item">
            <h2 className="accordion-header" id={"header" + ticket.priority}>
                <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target={"#body" + ticket.priority} aria-expanded="true" aria-controls={"body" + ticket.priority}>
                    {ticket.title + " (" + ticket.priority + ")"}
                </button>
            </h2>
            <div id={"body" + ticket.priority} className="accordion-collapse collapse" aria-labelledby={"header" + ticket.priority} data-bs-parent="#ticket-list">
                <div className="accordion-body">
                    {ticket.text}
                </div>
            </div>
        </div>
    );
}

export default TicketInfo;