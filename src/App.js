import { useEffect, useState } from "react";
import { getAllTickets } from "./services/ticketServices";
import "./app.css";

// the use effect function takes 2 arguments. A function and a dependency array. This is basically an event listener. It is listening for a change in the array to run the function defined within the argument.

export const App = () => {
  //? These const variables have the array (allTickets), the setter function (setAllTickets) and the initial value of the state which in this case is an empty array (useState([]))
  const [allTickets, setAllTickets] = useState([]);
  const [showEmergencyOnly, setShowEmergencyOnly] = useState(false);
  const [filteredTickets, setFilteredTickets] = useState([]);

  //? this function is invoking the imported function that fetches the ticket data, then stores the response in a variable named ticketsArray. on line 15, the allTickets array gets updated with this response
  useEffect(() => {
    getAllTickets().then((ticketsArray) => {
      setAllTickets(ticketsArray);
    });
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

  return (
    <div className="tickets_container">
      <h2>Tickets</h2>
      <div>
        <button
          className="filter-btn btn-primary"
          onClick={() => {
            setShowEmergencyOnly(true);
          }}
        >
          Emergency
        </button>
        <button
          className="filter-btn btn-info"
          onClick={() => {
            setShowEmergencyOnly(false);
          }}
        >
          Show All
        </button>
      </div>
      <article className="tickets">
        {filteredTickets.map((ticket) => {
          return (
            <section className="ticket" key={ticket.id}>
              <header className="ticket-info">#{ticket.id}</header>
              <div>{ticket.description}</div>
              <footer>
                <div>
                  <div className="ticket_info">emergency</div>
                  <div>{ticket.emergency ? "yes" : "no"}</div>
                </div>
              </footer>
            </section>
          );
        })}
      </article>
    </div>
  );
};
