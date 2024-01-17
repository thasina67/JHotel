import express, {Request, Response} from "express"
import User from "../models/user"
import jwt from  "jsonwebtoken";

const router= express.Router();

// /api/users/register
router.post("/egister", async (req: Request, res: Response)=>
  {
    try{
        let user = await User.findOne( {
            email: req.body.email,
        })

        if (user) {
            return res.status(400).json({ message:"User already exists"})
        }

        user =new User(req.body)
        await user.save();
         //JWTs serve as a means of securely transmitting information between services for authorization and authentication purposes.JSON Web Tokens are a good way of securely transmitting information between parties.
        const token = jwt.sign({userId: user.id}, process.env.JWT_SECRET_KEY as string, {
          expiresIn: "1d"   //1d means 1day expires in1day.
        })
        return res.sendStatus(200);
        res.cookie("auth_token",token, {
          httpOnly: true,
          secure:process.env.NODE_ENV==="production",
          maxAge:86400000,
        } )
    } catch (error) {
       console.log(error)
       res.status(500).send({message: "Something went wrong"})
    }
  }
)

export default router;