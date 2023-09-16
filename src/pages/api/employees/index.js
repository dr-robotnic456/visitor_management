import { hash } from "bcrypt";
import dbconn from "../db/dbconn";
import Employees from "../models/employees";

const handler = async (req, res) => {
    dbconn();
    const { method } = req;
  
    switch (method) {
      case "POST":
        try {
          // Check if the request body contains the required fields
          const { username, email, password, address, telephone, position, department } = req.body;
          if (!username || !email || !password || !address || !telephone || !position || !department) {
            return res.status(400).json({ message: "Please provide all required fields" });
          }
  
          // Hash the password
          const hashedPassword = await hash(password, 10);
  
          // Create a new user with the hashed password
          const user = await Employees.create({
            username,
            email,
            password: hashedPassword,
            address,
            telephone,
            position,
            department
          });
  
          if (!user) {
            return res.status(400).json({ message: "Invalid Credentials" });
          }
  
          return res.status(200).json(user);
        } catch (error) {
          console.error(error);
          return res.status(500).json({ message: "Internal Server Error" });
        }
  

    case "GET":
      const users = await Employees.find();
      if (!users) {
        return res.status(400).json({ message: "No Users Found" });
      }
      return res.status(200).json(users);

    
      case "DELETE":
        try {
          const delUser = await Employees.findByIdAndDelete(req.query.id);
      
          if (!delUser) {
            return res.status(404).json({ message: "User not found" });
          }
      
          return res.status(200).json({ message: "User deleted successfully" });
        } catch (error) {
          console.error(error);
          return res.status(500).json({ message: "Internal Server Error" });
        }
      

    default:
        break;
  }
};

export default handler;