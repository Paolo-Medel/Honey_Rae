import { useEffect, useState } from "react";
import "./EmployeeList.css";
import { getStaffUsers } from "../../services/UserService";
import { User } from "../users/User";
import { Link } from "react-router-dom";

export const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    getStaffUsers().then((staffArray) => {
      setEmployees(staffArray);
    });
  }, []);

  return (
    <div className="employees">
      {employees.map((employeeObj) => {
        return (
          <Link to={`/employees/${employeeObj.id}`} key={employeeObj.id}>
            <User user={employeeObj} />
          </Link>
        );
      })}
    </div>
  );
};
