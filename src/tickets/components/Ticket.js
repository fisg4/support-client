import { Fragment, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DeleteBtn from "./DeleteBtn";
import EditModal from "./EditModal";
import { useSelector, useDispatch } from "react-redux";
import { setTicketStatus, setTicketPriority, setValidationErrors } from "../slices/ticketSlice";
import RequireLogin from "../../common/requireLogin";

const Ticket = () => {
    const { ticketId } = useParams();
    const [ticket, setTicket] = useState([]);
    const [song, setSong] = useState([]);
    const [existSong, setExistSong] = useState(false);
    const dispatch = useDispatch();
    const ticketState = useSelector((state) => state.ticket);
    const token = localStorage.getItem('token');
    let role = null;

    if (token) {
        role = JSON.parse(localStorage.getItem('user')).role;
    }

    useEffect(() => {
        async function fetchSong(songId) {
            const request = new Request("/api/v1/songs/" + songId, {
                method: "GET",
                headers: {},
            });
            const response = await fetch(request);
            if (!response.ok) {
                throw Error("Response not valid. " + response.status);
            }
            const song = await response.json();
            if (song) {
                setExistSong(true)
                setSong(song);
            }
        }

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

            ticket?.songId && await fetchSong(ticket.songId);
        }
        if (token) {
            getTicketById();
        }

    }, [ticketId, dispatch]);

    function onAlertClose() {
        dispatch(setValidationErrors(false));
    }

    return (
        <Fragment>
            {!token ?
                <RequireLogin message={"You can not manage your tickets if you are not logged in the system."} /> :
                <div className="row my-5 pb-5">
                    <div className="col-12 py-3 mb-5">
                        <h2 className="text-center">Ticket details</h2>
                    </div>
                    {ticketState.validationErrors ?
                        <div className="row d-flew justify-content-center my-3">
                            <div id="validationEditError" className="toast align-items-center border-purple bg-blue show" role="alert" aria-live="assertive" aria-atomic="true">
                                <div className="d-flex">
                                    <div className="toast-body">
                                        There are some problems with your request. Try again later!
                                    </div>
                                    <button type="button" className="btn-close me-2 m-auto" data-bs-dismiss="toast" aria-label="Close" onClick={ onAlertClose }></button>
                                </div>
                            </div>
                        </div> : <></>}
                    <div className="col-12 col-md-8 offset-md-2">
                        <div className="card text-center supportDetails">
                            <div className={ticketState.ticketPriority === "low" ? "rounded-top hGreen bottomBorder"
                                : ticketState.ticketPriority === "medium" ? "rounded-top hYellow bottomBorder" : "rounded-top hRed bottomBorder"}>
                                <div className="card-header bg-transparent">
                                    <h5 className="card-title my-2">{ticketState.ticketPriority?.toUpperCase()} PRIORITY</h5>
                                </div>
                            </div>
                            <div className={ticketState.ticketPriority === "low" ? "bgGreen"
                                : ticketState.ticketPriority === "medium" ? "bgYellow" : "bgRed"}>
                                <div className="card-body">
                                    <h5 className="card-title">{ticket?.title}</h5>
                                    {existSong ?
                                        (<div>
                                            <p className="card-text">Expected song name: {song?.title} </p>
                                            <p className="card-text">Artists' names: {song?.artists.join(", ")}</p>
                                        </div>
                                        )
                                        : <></>}
                                    {ticket?.text && youtubeParser(ticket.text) ?
                                        (<div>
                                            <p className="card-text">Suggested video</p>
                                            <div className="ratio ratio-16x9 mt-lg-3">
                                                <iframe
                                                    src={`https://www.youtube.com/embed/${youtubeParser(ticket.text)}`}
                                                    title="Song video"
                                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                                    allowFullScreen>
                                                </iframe>
                                            </div>
                                        </div>)
                                        : ticket?.songId ?(<p className="card-text">Suggested URL: {ticket.text}</p>) : <p className="card-text">{ticket.text}</p>}
                                </div>
                            </div>
                            <div className={ticketState.ticketPriority === "low" ? "rounded-bottom bgGreen"
                                : ticketState.ticketPriority === "medium" ? "rounded-bottom bgYellow" : "rounded-bottom bgRed"}>
                                <div className="card-footer text-muted bg-transparent">
                                    {ticketState.ticketStatus === "sent" ?
                                        <p className="card-text">This ticket has been {ticketState.ticketStatus} on {ticket.createDate?.split('T')[0]}</p>
                                        : <p className="card-text">This ticket has been {ticketState.ticketStatus}</p>}
                                    <div className="pt-2 text-center">
                                        <div className="d-grid gap-2 d-md-flex justify-content-center">
                                            <div className="col-12 ps-0">
                                                {ticketState.ticketStatus === "validated" || ticketState.ticketStatus === "rejected" || role === "user" ?
                                                    (<></>) :
                                                    (<>
                                                        <a href="#edit" className="darkBlueText me-4" data-bs-toggle="modal" data-bs-target="#updateModal">
                                                            <i className="bi bi-pencil-square"></i>
                                                        </a>
                                                        <EditModal endpoint={`/api/v1/tickets/${ticket._id}`} />
                                                    </>)}
                                                {role === "admin" && <DeleteBtn endpoint={`/api/v1/tickets/${ticket._id}`} />}
                                            </div>
                                        </div>
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