import { TicketList } from "./components/tickets/TicketList";
import "./app.css";
import { CustomerList } from "./components/customers/CustomersList";
import { EmployeeList } from "./components/employees/EmployeeList";

// the use effect function takes 2 arguments. A function and a dependency array. This is basically an event listener. It is listening for a change in the array to run the function defined within the argument.

export const App = () => {
  return (
    <>
      {/* <TicketList />
      <CustomerList /> */}
      <EmployeeList />
    </>
  );
};
