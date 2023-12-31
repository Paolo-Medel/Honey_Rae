import { useEffect, useState } from "react";
import { getAllTickets } from "../../services/ticketServices";
import { Ticket } from "./Ticket";
import "./Ticket.css";
import { FilterBar } from "./FilterBar";

export const TicketList = ({ currentUser }) => {
  //? These const variables have the array (allTickets), the setter function (setAllTickets) and the initial value of the state which in this case is an empty array (useState([]))
  const [allTickets, setAllTickets] = useState([]);
  const [showEmergencyOnly, setShowEmergencyOnly] = useState(false);
  const [filteredTickets, setFilteredTickets] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const getAndSetTickets = () => {
    getAllTickets().then((ticketsArray) => {
      setAllTickets(ticketsArray);
    });
  };

  //? this function is invoking the imported function that fetches the ticket data, then stores the response in a variable named ticketsArray. Down below in the next useEffect, the allTickets array gets updated with this response
  useEffect(() => {
    getAndSetTickets();
  }, []);

  //? this function says, if showEmergency only is true, then filter the emergency tickets from the allTickets array and store that in the filteredTickets array. Else, set the filtered tickets to all tickets.
  useEffect(() => {
    if (showEmergencyOnly) {
      const emergencyTickets = allTickets.filter((ticket) => ticket.emergency);
      setFilteredTickets(emergencyTickets);
    } else {
      setFilteredTickets(allTickets);
    }
  }, [showEmergencyOnly, allTickets]);
  //! I do not understand the .includes below
  useEffect(() => {
    const foundTickets = allTickets.filter((ticket) =>
      ticket.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredTickets(foundTickets);
  }, [searchTerm, allTickets]);

  return (
    <div className="tickets_container">
      <h2>Tickets</h2>
      <FilterBar
        setShowEmergencyOnly={setShowEmergencyOnly}
        setSearchTerm={setSearchTerm}
      />
      <article className="tickets">
        {filteredTickets.map((ticketObj) => {
          return (
            <Ticket
              ticket={ticketObj}
              key={ticketObj.id}
              currentUser={currentUser}
              getAndSetTickets={getAndSetTickets}
            />
          );
        })}
      </article>
    </div>
  );
};
