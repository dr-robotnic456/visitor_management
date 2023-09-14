import Image from "next/image";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import Link from "next/link";

function Login() {
  const [user, setUser] = useState({
    email: "",
    password: ""
  });

  const [error, setError] = useState(""); // State for error messages

  const router = useRouter();

  const fetchUser = async (email, password) => {
    try {
      const response = await axios.post("/api/loginUser", { email, password });
      const { token } = response.data;

      if (token) {

        localStorage.setItem("token", token);
        router.push("/UserDashboard");
      }
    } catch (err) {
      // Handle errors and set the error state
      if (err.response && err.response.data) {
        setError(err.response.data.message);
      } else {
        setError("An error occurred while logging in.");
      }
    }
  };
  const fetchAdmin = async (email, password) => {
    try {
      const response = await axios.post("/api/loginEmployees", {
        email,
        password
      });
      const { token } = response.data;

      if (token) {

        localStorage.setItem("token", token);
        router.push("/admin/Dashboard");
      }
    } catch (err) {
      // Handle errors and set the error state
      if (err.response && err.response.data) {
        setError(err.response.data.message);
      } else {
        setError("An error occurred while logging in.");
      }
    }
  };
  const fetchEmployee = async (email, password) => {
    try {
      const response = await axios.post("/api/loginEmployees", {
        email,
        password
      });
      const { token } = response.data;

      if (token) {

        localStorage.setItem("token", token);
        router.push("/staff/Dashboard");
      }
    } catch (err) {
      // Handle errors and set the error state
      if (err.response && err.response.data) {
        setError(err.response.data.message);
      } else {
        setError("An error occurred while logging in.");
      }
    }
  };

  const handleEmailChange = e => {
    setUser(prevUser => ({
      ...prevUser,
      email: e.target.value
    }));
  };

  const handlePasswordChange = e => {
    setUser(prevUser => ({
      ...prevUser,
      password: e.target.value
    }));
  };

  const handleSubmit = e => {
    e.preventDefault();

    // Call the appropriate fetch function based on user's email
    if (user.email.includes("@admin.com")) {
      fetchAdmin(user.email, user.password);
    } else if (user.email.includes("@staff.com")) {
      fetchEmployee(user.email, user.password);
    } else {
      fetchUser(user.email, user.password);
    }
  };

  return (
    <div className="bg-[#f1f1f1] h-screen w-screen flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-2xl w-[60%] h-[80%]">
        <div className="flex h-full">
          <div
            className="relative w-[50%] items-center justify-center rounded-lg"
            style={{
              backgroundImage: "url(/side.jpg)",
              objectFit: "cover",
              backgroundSize: "100%",
              backgroundPosition: "center",
              justifyContent: "center",
              backgroundRepeat: "no-repeat"
            }}
          >
            <div className="w-[60%] ml-[10%] absolute inset-0 flex">
              <Image src="/logo.png" fill objectFit="contain" alt="logo"/>
            </div>
          </div>

          <div className="rounded-tl-[200px] rounded-bl-[200px] p-8">
            <form
              onSubmit={handleSubmit}
              className="flex flex-col space-y-10 justify-center text-black rounded-tl-3xl"
            >
              <div className="flex items-center justify-center">
                <h2 className="font-extrabold text-3xl">CRYSTAL TV</h2>
              </div>

              <div className="space-y-10">
                <div>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    value={user.email}
                    onChange={handleEmailChange}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                    placeholder="Email"
                  />
                </div>

                <div className="space-y-2">
                  <input
                    type="password"
                    name="password"
                    id="password"
                    value={user.password}
                    onChange={handlePasswordChange}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                    placeholder="Password"
                  />
                </div>
              </div>

              {error &&
                <div className="text-red-600 text-center">
                  {error}
                </div>
                }

              <button
                type="submit"
                className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
              >
                Login
              </button>
              <div>
                Don't have an account, <Link href="/Signup">Sign Up</Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
