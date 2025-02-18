// import jwt from 'jsonwebtoken'

// // Admin authentication middleware
// const authAdmin = async (req,res,next) => {
//   try{

//       const {atoken} = req.headers
//       if (!atoken) {
//           return res.json({sucess:false,message:"Not Authorized Login Again"})

//       }
//       const token_decode = jwt.verify(atoken,process.env.JWT_SECRET)

//       if (token_decode !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD){
//           return res.json({sucess:false,message:"Not Authorized Login Again"})
//       }

//       next()

//   } catch(error){
//       console.log(error)
//       res.json({sucess:false, message:error.message})

//   }

// }

// export default authAdmin;


import jwt from 'jsonwebtoken'

const authAdmin = async (req, res, next) => {
  try {
      // Get token from Authorization header
      const authHeader = req.headers.authorization
      if (!authHeader?.startsWith('Bearer ')) {
          return res.status(401).json({success: false, message: "Not Authorized - Login Again"})
      }

      const token = authHeader.split(' ')[1]
      const token_decode = jwt.verify(token, process.env.JWT_SECRET)

      // Verify admin email matches
      if (token_decode.email !== process.env.ADMIN_EMAIL) {
          return res.status(403).json({success: false, message: "Invalid Authorization Token"})
      }

      next()

  } catch(error) {
      console.log(error)
      if (error.name === 'TokenExpiredError') {
          return res.status(401).json({success: false, message: "Session Expired - Please Login Again"})
      }
      res.status(500).json({success: false, message: "Internal Server Error"})
  }
}

export default authAdmin;
