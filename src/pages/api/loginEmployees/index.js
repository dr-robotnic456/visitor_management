import { compare } from "bcrypt";
import jwt from "jsonwebtoken";
import dbconn from "../db/dbconn";
import Employees from "../models/employees";

const handler = async (req, res) => {
    dbconn()
    const {method} = req;

    switch (method) {
        case "POST":
            const secret = process.env.SECRET
            const {email, password} = req.body
            const user = await Employees.findOne({email});
            if(!user){
                return res.status(400).json({message: "Invalid Credentials"})
            }else{
                // check if password is correct
                const isPasswordCorrect = await compare(password, user.password);
                if(!isPasswordCorrect){
                    return res.status(400).json({message:"Invalid Password"})
                }

                // Generate token for user
                const token = jwt.sign({ email: user.email, id:user._id, name:user.name }, secret, { expiresIn: "1d" });
                return res.status(200).json({message:"Login successfull", token})
            };

        
    
        default:
            break;
    }
}

export default handler