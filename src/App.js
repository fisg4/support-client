import TicketList from "./tickets/ticketList";
import Footer from './common/footer';
import Header from './common/header';
import './css/App.css';

const App = () => {
  return (
    <div className="min-vh-100 d-flex flex-column justify-content-between">
        <Header />
          <main className="container my-4">
            <TicketList/>
          </main>
        <Footer />
    </div>
  );
}

export default App;
