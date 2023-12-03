import jwt from "jsonwebtoken"
import dotenv from "dotenv"
import User from "../models/User"


dotenv.config()
const {SECRET_CODE} = process.env;

 const checkPremission = async (req, res, next) =>{
  try {
    // buoc 1: kiem tra nguoi dung dang nhap hay chua

    const token = req.headers.authorization?.split(" ")[1]

    // buoc 2: kiem tra token
    if(!token){
      return res.status(403).json({
        message: " ban chua dang nhap",
      });
    }

    // buoc 3: kiem tra quyen nguoi dung

    const decoded = jwt.verify(token, SECRET_CODE )
    const user = await User.findById(decoded._id)
    if(!user){
      return res.status(403).json({
        message: "Token loi",
      })
    }

    if(user.role !== "admin"){
      return res.status(400).json({
        message: "Ban khong co quyen lamf viec nayt",
      })
    }

    // buoc 4: next
    next();

    
  } catch (error) {
    return res.json({
      name: error.name,
      message: error.message,
    })
  }

}

export default checkPremission