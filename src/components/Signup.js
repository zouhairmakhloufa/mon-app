import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";

const Signup = () => {
  const [type, setType] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = async (event) => {
    event.preventDefault();
    const registered = {type, firstName, lastName, email,password };
    const user = await axios.post(
      "http://localhost:5000/User/ajouter",
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
              value={type}
              className="form-control form-group"
            />
            <input
              type="text"
              placeholder="FirstName"
              onChange={(event) => setFirstName(event.target.value)}
              value={firstName}
              className="form-control form-group"
            />
            <input
              type="text"
              placeholder="LastName"
              onChange={(event) => setLastName(event.target.value)}
              value={lastName}
              className="form-control form-group"
            />
            <input
              type="text"
              placeholder="E-mail"
              onChange={(event) => setEmail(event.target.value)}
              value={email}
              className="form-control form-group"
            />
            <input
              type="Password"
              placeholder="Password"
              onChange={(event) => setPassword(event.target.value)}
              value={password}
              className="form-control form-group"
            />
            <input type="submit" className="btn btn-danger btn-block" value="Submit" />
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
