import User from "../models/User"
import userValidator from "../models/User"
import bcryptjs from "bcryptjs"
import SignInValidator from "../models/User"
import jwt from "jsonwebtoken"
import dotenv from "dotenv"

dotenv.config()
const {SECRERT_CODE} = process.env
export const signUp = async (req, res) =>{
  try {
    //Buoc 1: validate du lieu nguoi dung

    const {error} = userValidator.validate(req.body, {abortEarly: false})

    if(error){
      const errors = error.details.map(err => err.message)
      return res.status(400).json({
        message: errors
      })
    }
    //uoc 2: kiem tra xem email da ton tai trong he thong chua

    const userExits = await User.findOne({email: req.body.email})
    if(userExits){
      return res.status(400).json({
        message: "email nay da duoc dang ky, ban co muo dang nhap ko"
      })
    }

    //Buoc 3: ma hoa password

    const hashedpassword = await bcryptjs.hash(req.body.password, 10)
    //Buoc 4:Khoi tao user trong db

    const user = await User.create({
      ...req.body,
      password: hashedpassword
    })

    //Buoc 5: thong bao cho nguoi dung dang ky thanh cong
    // Xoa mat khau

    user.password = undefined
    return res.status(200).json({
      message: "Dang ky tai khoan thanh cong",
      user
    })
  } catch (error) {
    return res.status(500).json({
      name: error.name,
      message: error.message,
    })
  }
}


export const signIn = async(req,res) => {
  try {

    // buoc 1: validate data tu phia client

    const {error} = SignInValidator.validate(req.body, {abortEarly: false})
    if(error){
      const errors = error.details.map(err => err.message)
      return res.status(400).json({
        message: errors
      })
    }

    // buoc 2: kiem tra email da ton tai hay chua

    const user = await User.findOne({email: req.body.email})
    if(!user){
      return res.status(400).json({
        message: "Email nay chua duoc dang ky, ban co muon dang ky khong"
      })
    }
    
    // buoc 3: kiem tra password

    const issMatch = await bcryptjs.compare(req.body.password, user.password)
    if(!issMatch){
      return res.status(400).json({
        message: "Mat khau khong dung"
      })
    }

    // buoc 4: tao JWT
    const accessToken = jwt.sign({_id: user._id}, SECRERT_CODE)
    
    // buoc 5: tra ra thong bao cho nguoi dung
    
    user.password = undefined
    return res.status(200).json({
      message: "dang nhap thanh cong",
      user, accessToken
    })
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    })
  }
}