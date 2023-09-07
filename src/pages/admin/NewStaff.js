import { useState } from "react";
import axios from "axios";
import Auth from "@/components/Auth";

function NewStaff() {
  const [user, setUser] = useState({
    username: "",
    email: "",
    address: "",
    position: "",
    password: "",
    telephone: "",
    confirm_password: ""
  });

  const [error, setError] = useState("");

  const handleInputChange = e => {
    const { name, value } = e.target;
    setUser(prevUser => ({
      ...prevUser,
      [name]: value
    }));
  };

  const addEmployee = async () => {
    try {
      if (user.password !== user.confirm_password) {
        setError("Passwords do not match");
        return;
      }

      const response = await axios.post("/api/employees", user);
      // Handle success if needed
      console.log(response.data);
    } catch (err) {
      setError("Error creating employee");
      console.error(err);
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    setError(""); // Clear any previous error message
    addEmployee();
  };

  return (
    <div>
      <h2>Create New Employee</h2>
      {error &&
        <p className="error">
          {error}
        </p>}
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={user.username}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={user.email}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <input
            type="text"
            name="address"
            placeholder="Address"
            value={user.address}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <input
            type="text"
            name="position"
            placeholder="Position"
            value={user.position}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="py-2">
          <input
            type="text"
            name="telephone"
            id="telephone"
            value={user.telephone}
            onChange={handleTelephoneChange}
            className="w-full px-4 py-1 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
            placeholder="Telephone"
          />
        </div>
        <div>
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={user.password}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <input
            type="password"
            name="confirm_password"
            placeholder="Confirm Password"
            value={user.confirm_password}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <button type="submit">Create Employee</button>
        </div>
      </form>
    </div>
  );
}

export default Auth(NewStaff);
