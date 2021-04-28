import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";

const Signup = () => {
  const [Type, setType] = useState("");
  const [FirstName, setFirstName] = useState("");
  const [LastName, setLastName] = useState("");
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");

  const onSubmit = async (event) => {
    event.preventDefault();
    const registered = {
      Type,
      FirstName,
      LastName,
      Email,
      Password,
    };
    const user = await axios.post(
      "http://localhost:5000/User/Ajouter",
      registered
    );

    setType("");
    setFirstName("");
    setLastName("");
    setEmail("");
    setPassword("");
  };

  return (
    <div>
      <div className="container">
        <div className="form-div">
          <form onSubmit={onSubmit}>
            <input
              type="text"
              placeholder="Type"
              onChange={(event) => setType(event.target.value)}
              value={Type}
              className="form-control form-group"
            />
            <input
              type="text"
              placeholder="FirstName"
              onChange={(event) => setFirstName(event.target.value)}
              value={FirstName}
              className="form-control form-group"
            />
            <input
              type="text"
              placeholder="LastName"
              onChange={(event) => setLastName(event.target.value)}
              value={LastName}
              className="form-control form-group"
            />
            <input
              type="text"
              placeholder="Email"
              onChange={(event) => setEmail(event.target.value)}
              value={Email}
              className="form-control form-group"
            />
            <input
              type="Password"
              placeholder="Password"
              onChange={(event) => setPassword(event.target.value)}
              value={Password}
              className="form-control form-group"
            />
            <input
              type="submit"
              className="btn btn-danger btn-block"
              value="Submit"
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
