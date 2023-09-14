import mongoose from "mongoose";
import Visitors from "../models/visitors";
import dbconn from "../db/dbconn";

const handler = async (req, res) => {
  try {
    await dbconn(); // Establish the database connection

    const { method } = req;

    switch (method) {
      case "GET":
        try {
          const user = await Visitors.findById(req.query.id);
          if (!user) {
            return res.status(404).json({ message: "User not found" });
          }
          return res.status(200).json(user);
        } catch (error) {
          console.error(error);
          return res.status(500).json({ message: "Internal Server Error" });
        }

      case "DELETE":
        try {
          const delUser = await Visitors.findByIdAndDelete(req.query.id);

          if (!delUser) {
            return res.status(404).json({ message: "User not found" });
          }

          return res.status(200).json({ message: "User deleted successfully" });
        } catch (error) {
          console.error(error);
          return res.status(500).json({ message: "Internal Server Error" });
        }

      case "PUT":
        const { id } = req.query;
        try {
          // check if provided id is correct
          if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid user ID" });
          }

          const updateUser = await Visitors.findByIdAndUpdate(id, req.body, {
            new: true, // return updated user
            runValidators: true,
          });

          if (!updateUser) {
            return res.status(404).json({ message: "User not found" });
          }

          return res.status(200).json(updateUser);
        } catch (error) {
          console.error(error);
          return res.status(500).json({ message: "Internal Server Error" });
        }

      default:
        return res.status(405).json({ message: "Method not allowed" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export default handler;
