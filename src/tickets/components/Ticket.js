import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DeleteBtn from "./DeleteBtn";
import EditModal from "./EditModal";
import { useSelector, useDispatch } from "react-redux";
import { setTicketStatus, setTicketPriority, setValidationErrors } from "../slices/ticketSlice";
import { useNavigate } from "react-router-dom";

const Ticket = () => {
    const { ticketId } = useParams();
    const [ticket, setTicket] = useState([]);
    const [song, setSong] = useState([]);
    const dispatch = useDispatch();
    const ticketState = useSelector((state) => state.ticket);
    const [existSong, setExistSong] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchSong(id) {
            const request = new Request("/api/v1/songs/" + id, {
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
                    "Authorization": "Bearer " + "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzYWVlNDQxMjA4N2NiYzg3MGNiNGRmYiIsInJvbGUiOiJhZG1pbiIsInBsYW4iOiJmcmVlIiwidXNlcm5hbWUiOiJlbGVuYTIiLCJlbWFpbCI6ImVsZW5hQGV4YW1wbGUuY29tIiwiaWF0IjoxNjcyNDA2MTM4fQ.ia1D_J-_dggngzozKmO1eAiKoU13_sfR1laLsMS9jXs"
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

            ticket?.songId && await fetchSong(ticket.songId);
        }

        getTicketById();

    }, [ticketId, dispatch]);


    return (
        <div className="row mb-5 pb-5">
            <div className="col-12 my-4 p-2">
                <h2 className="text-center">Ticket details</h2>
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
                <div className="card text-center ticketDetails">
                    <div className={ticketState.ticketPriority === "low" ? "rounded-top hGreen"
                        : ticketState.ticketPriority === "medium" ? "rounded-top hYellow" : "rounded-top hRed"}>
                        <div className="card-header">
                            {ticketState.ticketPriority?.toUpperCase()} PRIORITY
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
                                : (<p className="card-text">Suggested URL: {ticket.text}</p>)}
                        </div>
                    </div>
                    <div className={ticketState.ticketPriority === "low" ? "rounded-bottom bgGreen"
                        : ticketState.ticketPriority === "medium" ? "rounded-bottom bgYellow" : "rounded-bottom bgRed"}>
                        <div className="card-footer text-muted">
                            {ticketState.ticketStatus === "sent" ?
                                <p className="card-text">This ticket was {ticketState.ticketStatus} on {ticket.createDate?.split('T')[0]}</p>
                                : <p className="card-text">This ticket was {ticketState.ticketStatus} on {ticket.updateDate?.split('T')[0]}</p>}
                            <div className="pt-2 text-center">
                                <div className="d-grid gap-2 d-md-flex justify-content-center">
                                    <div className="col-12 ps-0">
                                        {ticketState.ticketStatus === "validated" || ticketState.ticketStatus === "rejected" ?
                                            (<></>) :
                                            (<>
                                                <a href="#edit" className="darkBlueText me-4" data-bs-toggle="modal" data-bs-target="#updateModal">
                                                    <i className="bi bi-pencil-square"></i>
                                                </a>
                                                <EditModal endpoint={`/api/v1/tickets/${ticket._id}`} />
                                            </>)}
                                        <DeleteBtn endpoint={`/api/v1/tickets/${ticket._id}`} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function youtubeParser(url) {
    var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    var match = url.match(regExp);
    return (match && match[7].length === 11) ? match[7] : false;
}

export default Ticket;