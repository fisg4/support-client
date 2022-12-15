import TicketList from "./tickets/ticketList";

const App = () => {
  return (
    <div className="container">
      <header className="border-bottom">
        <div className="row my-3">
          <div className="col-8 offset-2 text-center">
            <a href="http://localhost:3000/">
              <img src="fastMusik_logo.svg" alt="Logo FastMusik" width={200} height={75}/>
            </a>
          </div>
          <div className="col-2 text-end">
            <a href="http://localhost:3000/">
              <i className="bi bi-person-circle"></i>
            </a>
          </div>
        </div>
      </header>
      <main className="my-3">
        <TicketList/>
      </main>
    </div>
  );
}

export default App;
