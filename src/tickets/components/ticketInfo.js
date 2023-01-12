import React from 'react';

const TicketInfo = ({ ticket }) => {

    return (
        <div className="col-12 col-md-4">
            <div className="card ticketCard">
                <div className="card-body">
                    <h5 className="card-title">{ticket.title}</h5>
                    <p className="card-text">{ticket.text}</p>
                    <div className="pt-3 text-center">
                        <button className="btn border-purple text-purple bg-blue me-3">Review</button>
                        <button className="btn border-purple text-purple bg-blue">Delete</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TicketInfo;