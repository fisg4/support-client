class TicketsApi {
    static API_BASE_URL = "/support/v1";

    static requestHeaders = () => {
        return {}
    }

    static getAllTickets = async () => {
        const headers = this.requestHeaders;
        const request = new Request(TicketsApi.API_BASE_URL + "/tickets", {
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