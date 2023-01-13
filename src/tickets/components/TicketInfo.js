import React from 'react';
import { Link } from "react-router-dom";

const TicketInfo = ({ ticket }) => {

    return (
        <div className="col-12 col-md-4">
            <div className="card ticketCard">
                <div className="card-body">
                    <h5 className="card-title">{ticket.title}</h5>
                    <p className="card-text">{ticket.priority}</p>
                    <p className="card-text">{ticket.createDate.split('T')[0]}</p>
                    <div className="pt-3 text-center">
                        <Link to={`/support/tickets/${ticket._id}`}>
                            <div className="btn border-purple text-purple bg-blue btn-lg">
                                Manage
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TicketInfo;