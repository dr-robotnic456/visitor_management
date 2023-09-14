import axios from "axios";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/router"; // Import useRouter
import Link from "next/link";

function Signup() {
  const [user, setUser] = useState({
    username: "",
    email:"",
    confirm_password:"",
    address:"",
    telephone:"",
    password: "",
    gender:""
  });

  const router = useRouter()

  const [error, setError] = useState("")

  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value
    }));
  };


  const addUser = async() => {
    try {
      if (user.password !== user.confirm_password) {
        setError("Passwords do not match");
        return;
      }

      if(user.email.includes("@admin.com")){
        await axios.post("/api/admin", user)
        router.push("/Login")
      }else if(user.email.includes("@staff.com")){
        setError("Sorry, Please visit admin")
      }else{
      await axios.post("/api/users", user);
      // Handle success if needed
      router.push("/Login")
    }
    } catch (err) {
      setError("Error creating employee");
      console.error(err);
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    addUser()
  }

  return (
    <div className="bg-[#f1f1f1] h-screen w-screen flex items-center justify-center">
      <div className=" h-full w-[90%] flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-2xl w-[80%]">
          <div className="flex">
            <div
              className="w-full relative items-center justify-center rounded-lg"
              style={{
                backgroundImage: "url(/side.jpg)",
                objectFit: "cover",
                backgroundSize: "100%",
                backgroundPosition: "center",
                justifyContent:"center",
                backgroundRepeat: "no-repeat"
              }}
            >
              <div className="w-[60%] ml-[10%] absolute inset-0 flex">
                <Image src="/logo.png" fill objectFit="contain" alt="logo"/>
              </div>
            </div>

            <div className="rounded-tl-[200px] rounded-bl-[200px] p-8 w-[80%]">
              {error && <p className="text-red-500">{error}</p>}
              <form
                onSubmit={handleSubmit}
                className="flex flex-col text-black rounded-tl-3xl"
              >
                <div className="flex items-center justify-center">
                  <h2 className="font-extrabold text-3xl">SIGN UP</h2>
                </div>
                <div className="py-3">
                  <input
                    type="text"
                    name="username"
                    id="username"
                    value={user.username}
                    onChange={handleInputChange}
                    className="w-full px-4 py-1 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                    placeholder="Username"
                  />
                </div>

                <div className="py-3">
                  <input
                    type="text"
                    name="email"
                    id="email"
                    value={user.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-1 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                    placeholder="Email"
                  />
                </div>
                <div className="py-3">
                  <input
                    type="text"
                    name="address"
                    id="address"
                    value={user.address}
                    onChange={handleInputChange}
                    className="w-full px-4 py-1 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                    placeholder="Address"
                  />
                </div>
                <div className="py-3">
                  <input
                    type="text"
                    name="telephone"
                    id="telephone"
                    value={user.telephone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-1 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                    placeholder="Telephone"
                  />
                </div>

                <div className="py-3">
                  <input
                    type="password"
                    name="password"
                    id="password"
                    value={user.password}
                    onChange={handleInputChange}
                    className="w-full px-4 py-1 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                    placeholder="Password"
                  />
                </div>

                <div className="py-3">
                  <input
                    type="password"
                    name="confirm_password"
                    id="confirm_password"
                    value={user.confirm_password}
                    onChange={handleInputChange}
                    className="w-full px-4 py-1 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                    placeholder="Confirm Password"
                  />
                </div>
                <div className="py-3">
                  
                </div>

                <button
                  type="submit"
                  className="bg-blue-500 text-white py-1 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
                >
                  Signup
                </button>
                <div>Already have an accouint <Link href={"/Login"}>Log in</Link></div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
