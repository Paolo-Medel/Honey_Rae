import { useEffect, useState } from "react";
import "./EmployeeForms.css";
import {
  getEmployeeById,
  updateEmployee,
} from "../../services/employeeServices";
import { useNavigate } from "react-router-dom";

export const EmployeeForm = ({ currentUser }) => {
  const [employee, setEmployee] = useState({});

  const navigate = useNavigate();

  useEffect(() => {
    getEmployeeById(currentUser.id).then((data) => {
      const employeeObj = data[0];
      setEmployee(employeeObj);
    });
  }, [currentUser]);

  const handleSave = (event) => {
    event.defaultPrevented();

    const editedEmployee = {
      id: employee.id,
      specialty: employee.specialty,
      rate: employee.rate,
      userId: employee.userId,
    };

    updateEmployee(editedEmployee).then(() => {
      navigate(`/employees/${currentUser.id}`);
    });
  };

  return (
    <form>
      <h2>Update Profile</h2>
      <fieldset>
        <div className="form-group">
          <label>Specialty</label>
          <input
            type="text"
            required
            className="form-control"
            value={employee.specialty}
            onChange={(event) => {
              const copy = { ...employee };
              copy.specialty = event.target.value;
              setEmployee(copy);
            }}
          />
        </div>
      </fieldset>
      <fieldset>
        <div className="form-group">
          <label>Hourly Rate:</label>
          <input
            type="number"
            required
            className="form-control"
            value={employee.rate}
            onChange={(event) => {
              const copy = { ...employee };
              copy.rate = event.target.value;
              setEmployee(copy);
            }}
          />
        </div>
      </fieldset>
      <fieldset>
        <div className="form-group">
          <button className="form-btn btn-primary">Save Profile</button>
        </div>
      </fieldset>
    </form>
  );
};
