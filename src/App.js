import { TicketList } from "./components/tickets/TicketList";
import "./app.css";
import { CustomerList } from "./components/customers/CustomersList";
import { EmployeeList } from "./components/employees/EmployeeList";
import { Routes, Route, Outlet } from "react-router-dom";
import { NavBar } from "./components/nav/NavBar";
import { Welcome } from "./components/welcome/welcome";
import { CustomerDetails } from "./components/customers/CustomerDetails";
import { EmployeeDetails } from "./components/employees/EmployeeDetails";

// the use effect function takes 2 arguments. A function and a dependency array. This is basically an event listener. It is listening for a change in the array to run the function defined within the argument.

export const App = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <>
            <NavBar />
            <Outlet />
          </>
        }
      >
        <Route index element={<Welcome />} />
        <Route path="tickets" element={<TicketList />} />
        <Route path="employees">
          <Route index element={<EmployeeList />} />
          <Route path=":userId" element={<EmployeeDetails />} />
        </Route>
        <Route path="customers">
          <Route index element={<CustomerList />} />
          <Route path=":customerId" element={<CustomerDetails />} />
        </Route>
      </Route>
    </Routes>
  );
};
