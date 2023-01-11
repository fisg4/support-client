class TicketsApi {
    static getAllTickets = async () => {
        const headers = {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + ""
        };
        console.log(headers);
        const request = new Request("/api/v1/tickets", {
            method: "GET",
            headers: headers,
        });

        const response = await fetch(request);

        if (!response.ok) {
            throw Error("Response not valid" + response.status);
        }

        return response.json();
    }
}

export default TicketsApi;