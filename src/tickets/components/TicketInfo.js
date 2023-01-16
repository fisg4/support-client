import React from 'react';
import { Link } from "react-router-dom";

const TicketInfo = ({ ticket }) => {

    return (
        <div className="col-12 col-md-4">
            <div className="card supportCard">
            <div className={ticket.priority === "low" ? "rounded bgGreen"
                : ticket.priority === "medium" ? "rounded bgYellow" : "rounded bgRed"}>
                <div className="card-body text-center m-3">
                    <h5 className="card-title">{ticket.title?.toUpperCase()}</h5>
                    <div className="mb-2 mt-4">
                    <p className="card-text">{ticket.priority?.toUpperCase()} PRIORITY</p>
                    <p className="card-text">Created on {ticket.createDate.split('T')[0]}</p>
                    </div>
                    <div className="pt-3 text-center">
                        <Link to={`/support/tickets/${ticket._id}`}>
                            <i class="bi bi-hammer"></i>
                        </Link>
                    </div>
                </div>
            </div>
            </div>
        </div>
    );
}

export default TicketInfo;