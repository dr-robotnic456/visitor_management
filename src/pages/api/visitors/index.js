import dbconn from "../db/dbconn";
import Visitors from "../models/visitors"

const handler = async (req,res) => {
    dbconn()
    const {method} = req;

    switch (method) {
        case "POST":
            try{
            const visitor = await Visitors.create({...req.body});
            if(!visitor){
                return res.status(400).json({message:"Visitor does not exist"})
            }
            return res.status(200).json(visitor);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Internal Server Error" });
          }
        case "GET":
            try{
            const visitors = await Visitors.find();
            if(!visitors){
                return res.status(400).json({message:"No data found"})
            }
            return res.status(200).json(visitors);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Internal Server Error" });
          }
    
        default:
            break;
    }
}

export default handler;