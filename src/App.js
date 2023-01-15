import './css/App.css';
import './css/Tickets.css';
import Support from "./tickets/Support";
import TicketList from "./tickets/components/TicketList";
import Ticket from "./tickets/components/Ticket";
import ReportList from "./tickets/components/ReportList";
import Report from "./tickets/components/Report";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Footer from './common/footer';
import Header from './common/header';
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
            <Route path="/support" element={<Support />} />
            <Route path="/support/tickets" element={<TicketList />} />
            <Route path="/support/tickets/:ticketId" element={<Ticket />} />
            <Route path="/support/reports" element={<ReportList />} />
            <Route path="/support/reports/:reportId" element={<Report />} />
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </main>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
