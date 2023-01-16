import { Fragment, useEffect } from "react";
import CreateModal from "./CreateModal";
import TicketInfo from "./TicketInfo";
import { useSelector, useDispatch } from "react-redux";
import { setTicketList, setValidationErrors } from "../slices/ticketSlice";
import RequireLogin from "../../common/requireLogin";

const TicketList = () => {
    const dispatch = useDispatch();
    const ticketState = useSelector((state) => state.ticket);
    const token = localStorage.getItem('token');
    let role = null;

    if (token) {
        role = JSON.parse(localStorage.getItem('user')).role;
    }

    useEffect(() => {
        async function getAllTickets() {
            const request = new Request("/api/v1/tickets", {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`
                },
            });

            const response = await fetch(request);

            if (!response.ok) {
                throw Error("Response not valid. " + response.status);
            }

            const tickets = await response.json();
            const sortedTickets = tickets.slice().sort((a, b) => b.createDate.localeCompare(a.createDate));
            dispatch(setTicketList(sortedTickets));
        }

        async function getTicketsFromUser(id) {
            const request = new Request(`/api/v1/tickets/user/${id}`, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`
                },
            });

            const response = await fetch(request);

            if (!response.ok) {
                throw Error("Response not valid. " + response.status);
            }

            const tickets = await response.json();
            const sortedTickets = tickets.slice().sort((a, b) => b.createDate.localeCompare(a.createDate));
            dispatch(setTicketList(sortedTickets));
        }

        if (role === "admin") {
            getAllTickets();
        } else if (role === "user") {
            const userId = JSON.parse(localStorage.getItem('user')).id;
            getTicketsFromUser(userId);
        }
    }, []);

    function onAlertClose() {
        dispatch(setValidationErrors(false));
    }

    return (
        <Fragment>
            {!token ?
                <RequireLogin message={"In order to see your tickets, it is required to be logged in."} /> :
                <div className="row my-5 pb-5" id="ticket-list">
                    <div className="col-12">
                        <h2 className="text-center">List of Tickets</h2>
                    </div>
                    {ticketState.validationErrors ? (
                        <div className="row d-flew justify-content-center my-3">
                            <div className="toast align-items-center border-purple bg-blue show" role="alert" aria-live="assertive" aria-atomic="true">
                                <div className="d-flex">
                                    <div className="toast-body">
                                    There are some problems with your request. Try again later!
                                    </div>
                                    <button type="button" className="btn-close me-2 m-auto" data-bs-dismiss="toast" aria-label="Close" onClick={onAlertClose}></button>
                                </div>
                            </div>
                        </div>)
                        : <></>}
                    <div className="col-12 mb-3 text-end">
                    {role === "user" && <a className="darkBlueText" href="#create" data-bs-toggle="modal" data-bs-target="#createModal"><i className="bi bi-plus-circle h1"></i></a>}
                    </div>
                    <CreateModal />
                    {ticketState.ticketList.length === 0 ?
                        (<div className="text-center">No tickets available, would you like to add any?</div>) :
                        (ticketState.ticketList.map((ticket) => {
                            return (
                                <TicketInfo key={ticket._id} ticket={ticket} />
                            );
                        }))
                    }
                </div>
            }
        </Fragment>
    );
}

export default TicketList;