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
    <div className='fixed inset-0 flex flex-col justify-center items-center z-50 bg-opacity-50 bg-black'>
      <div className='w-full flex justify-end px-10 absolute top-0 right-6'><button className='font-extrabold text-[100px] cursor-pointer' onClick={() => setShowPcMenu()}>x</button></div>
      <div className='w-[500px] bg-[#f1f1f1] rounded-lg py-4'>
      <h2  className='text-center font-bold text-3xl uppercase text-black'>Create New Employee</h2>
      {error &&
        <p className="error">
          {error}
        </p>}
      <form onSubmit={handleSubmit}  className='px-10 w-full py-4 mx-auto rounded-lg text-black'>
        <div className='my-5'>
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={user.username}
            onChange={handleInputChange}
            required
            className="w-full px-3 py-2"
          />
        </div>
        <div className='my-5'>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={user.email}
            onChange={handleInputChange}
            required
            className="w-full px-3 py-2"
          />
        </div>
        <div className='my-5'>
          <input
            type="text"
            name="address"
            placeholder="Address"
            value={user.address}
            onChange={handleInputChange}
            required
            className="w-full px-3 py-2"
          />
        </div>
        <div className='my-5'>
          <input
            type="text"
            name="position"
            placeholder="Position"
            value={user.position}
            onChange={handleInputChange}
            required
            className="w-full px-3 py-2"
          />
        </div>
        <div className='my-5'>
          <input
            type="text"
            name="telephone"
            id="telephone"
            value={user.telephone}
            onChange={handleInputChange}
            placeholder="Telephone"
            className="w-full px-3 py-2"
          />
        </div>
        <div className='my-5'>
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={user.password}
            onChange={handleInputChange}
            required
            className="w-full px-3 py-2"
          />
        </div>
        <div className='my-5'>
          <input
            type="password"
            name="confirm_password"
            placeholder="Confirm Password"
            value={user.confirm_password}
            onChange={handleInputChange}
            required
            className="w-full px-3 py-2"
          />
        </div>
        <div className='items-center justify-center flex rounded-lg'>
          <button type="submit" className='uppercase text-white bg-[#4598FE] py-2 hover:bg-[#0762EA] w-full outline-none rounded-lg font-bold'>Create Employee</button>
        </div>
      </form>
    </div>
    </div>
  );
}

export default Auth(NewStaff);
