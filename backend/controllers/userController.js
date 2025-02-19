import validator from 'validator';
import bcrypt from 'bcrypt';



// Api to register user

const registerUser = async (req,res) => {

    try {
        
        const { name, email, password } = req.body
        if ( !name || !email || !password ) {
            return res.json({success:false,message:"Missing Details"})
            
        }
        //validating email format
        if (!validator.isEmail(email)) {
            return res.json({success:false,message:"Invalid Email"})
            
        }

        // validating strong password
        if (password.length < 8) {
            return res.json({success:false,message:"Password should be at least 8 characters long"})
            
        }

        // Hashing user password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)


    } catch (error) {
        
    }
}