import dbconn from "../db/dbconn";
import Departments from "../models/department";

const handler = async (req, res) => {
    dbconn();
    const { method } = req;
  
    switch (method) {
      case "POST":
        try {
          // Check if the request body contains the required fields
          const { department, hod } = req.body;
          if (!department || !hod ) {
            return res.status(400).json({ message: "Please provide all required fields" });
          }
  
          // Create a new user with the hashed password
          const departments = await Departments.create({
            department,
            hod
          });
  
          if (!departments) {
            return res.status(400).json({ message: "Invalid Credentials" });
          }
  
          return res.status(200).json(departments);
        } catch (error) {
          console.error(error);
          return res.status(500).json({ message: "Internal Server Error" });
        }
  

    case "GET":
      const departments = await Departments.find();
      if (!departments) {
        return res.status(400).json({ message: "No Departments Found" });
      }
      return res.status(200).json(departments);

    
      case "DELETE":
        try {
          const delDepartment = await Departments.findByIdAndDelete(req.query.id);
      
          if (!delDepartment) {
            return res.status(404).json({ message: "department not found" });
          }
      
          return res.status(200).json({ message: "department deleted successfully" });
        } catch (error) {
          console.error(error);
          return res.status(500).json({ message: "Internal Server Error" });
        }
      

    default:
        break;
  }
};

export default handler;