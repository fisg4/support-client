import { Fragment, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import DeleteBtn from "./DeleteBtn";
import EditModal from "./EditModal";
import { useSelector, useDispatch } from "react-redux";
import { setTicketStatus, setTicketPriority, setValidationErrors } from "../slices/ticketSlice";
import RequireLogin from "../../common/requireLogin";

const Ticket = () => {
    const { ticketId } = useParams();
    const [ticket, setTicket] = useState([]);
    const dispatch = useDispatch();
    const ticketState = useSelector((state) => state.ticket);
    const token = localStorage.getItem('token');

    useEffect(() => {
        async function getTicketById() {
            const request = new Request("/api/v1/tickets/" + ticketId, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`
                },
            });

            const response = await fetch(request);

            if (!response.ok) {
                throw Error("Response not valid. " + response.status);
            }

            const ticket = await response.json();
            setTicket(ticket);
            dispatch(setTicketStatus(ticket.status));
            dispatch(setTicketPriority(ticket.priority));
            dispatch(setValidationErrors(false));
        }
        if (token) {
            getTicketById();
        }

    }, [ticketId, dispatch]);


    return (
        <Fragment>
            {!token ?
                <RequireLogin message={"You can not manage your tickets if you are not logged in the system."} /> :
                <div className="row my-3" id="ticket-list">
                    <div className="col-12">
                        <h2 className="text-center">Tickets detail</h2>
                    </div>
                    <div className="col-12 mb-4 text-start">
                        <Link to={`/support/tickets`}>
                            <div className="btn border-purple text-purple bg-blue">
                                <i className="bi bi-arrow-left"></i>
                            </div>
                        </Link>
                    </div>
                    {ticketState.validationErrors ?
                        <div className="row d-flew justify-content-center mb-3">
                            <div id="validationEditError" className="toast align-items-center border-purple bg-blue show" role="alert" aria-live="assertive" aria-atomic="true">
                                <div className="d-flex">
                                    <div className="toast-body">
                                        There are some problems with your request. Try again!
                                    </div>
                                    <button type="button" className="btn-close me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
                                </div>
                            </div>
                        </div> : <></>}

                    <div className="col-12 col-md-8 offset-md-2">
                        <div className="card ticketCard">
                            <div className="card-body">
                                <h5 className="card-title">{ticket.title}</h5>
                                {ticket?.text && youtubeParser(ticket.text) ?
                                    (<div className="ratio ratio-16x9 mt-lg-3">
                                        <iframe
                                            src={`https://www.youtube.com/embed/${youtubeParser(ticket.text)}`}
                                            title="Song video"
                                            frameBorder="0"
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                            allowFullScreen>
                                        </iframe>
                                    </div>)
                                    : (<p className="card-text">{ticket.text}</p>)}
                                <p className="card-text">{ticketState.ticketStatus}</p>
                                <p className="card-text">{ticketState.ticketPriority}</p>
                                <p className="card-text">{ticket.createDate?.split('T')[0]}</p>
                                <div className="pt-3 text-center">
                                    <div className="d-grid gap-2 d-md-flex justify-content-center">
                                        {ticketState.ticketStatus === "validated" || ticketState.ticketStatus === "rejected" ?
                                            (<></>) :
                                            (<div className="btn border-purple text-purple bg-blue btn-lg" data-bs-toggle="modal" data-bs-target="#updateModal">
                                                Edit
                                            </div>)
                                        }
                                        <EditModal endpoint={`/api/v1/tickets/${ticket._id}`} />
                                        <DeleteBtn endpoint={`/api/v1/tickets/${ticket._id}`} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </Fragment>
    );
}

function youtubeParser(url) {
    var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    var match = url.match(regExp);
    return (match && match[7].length === 11) ? match[7] : false;
}

export default Ticket;