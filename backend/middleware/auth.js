import jwt from "jsonwebtoken";

const Authentication = async(req,res,next)=>{
  try {
    const token = req.cookies.token
    if(!token){
      return res.status(401).json({message:"User is not authenticated "});
    }
    
    const decode = await jwt.verify(token, process.env.JWT_SECRET_KEY);
    // console.log(decode);

    if(!decode){
      return res.status(401).json({message:"Invalid token "});
    }

    req.id = decode.userId;
    
    // console.log(decode);
    
    next();
  } catch (error) {
    return res.status(401).json({
      message:error.message
    })
  }
}

export default Authentication;