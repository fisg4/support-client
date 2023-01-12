import Tickets from "./tickets/tickets";
import TicketList from "./tickets/components/ticketList";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Footer from './common/footer';
import Header from './common/header';
import './css/App.css';
import './css/Tickets.css';
import Home from './common/home';
import ErrorPage from './common/errorPage';


const App = () => {
  return (
    <div className="min-vh-100 d-flex flex-column justify-content-between">
      <BrowserRouter>
        <Header />
        <main className="container my-4">
          <Routes>
            <Route index element={<Home />} />
            <Route path="/support" element={<Tickets />} />
            <Route path="/support/tickets" element={<TicketList />} />
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </main>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
