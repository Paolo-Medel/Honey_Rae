import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getEmployeeById } from "../../services/employeeServices";
import "./EmployeeList.css";

export const EmployeeDetails = () => {
  const [employee, setEmployee] = useState([]);
  const { userId } = useParams();

  useEffect(() => {
    getEmployeeById(userId).then((data) => {
      const employeeById = data[0];
      setEmployee(employeeById);
    });
  }, [userId]);

  return (
    <section className="employee">
      <header className="employee-header">{employee.user?.fullName}</header>
      <div>
        <span className="employee-info">Email: </span>
        {employee.user?.email}
      </div>
      <div>
        <span className="employee-info">Specialty: </span>
        {employee.specialty}
      </div>
      <div>
        <span className="employee-info">Rate: </span>
        {employee.rate}
      </div>
    </section>
  );
};
