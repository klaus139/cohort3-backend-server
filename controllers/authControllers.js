import Auth from "../models/authModels.js";
import bcrypt from 'bcryptjs';
import createToken from '../utils/createToken.js';
import asyncHandler from "../middleware/asyncHandler.js";


const createUser= async(req, res) => {
    try{
        const {firstname, lastname, phonenumber, email, password} = req.body;
        if(!firstname || !lastname){
            throw new Error('please fill all the details')
        }

        //check if the user is an old user
        const oldUser = await Auth.findOne({email})
        if(oldUser){
            res.status(400).json({
                message:'Email is already registered'
            })
        }

        //hash my password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = Auth({firstname, lastname, phonenumber, email, password:hashedPassword});

        try{
            await newUser.save();
            createToken(res, newUser._id);
            res.status(201).json({
                data:newUser,
                message:"user created successfully"
            })

        }catch(error){
            console.log(error)
            throw new Error(error.message)
        }

    }catch(error){
        console.log('error is here')
        throw new Error(error.message)
    }
}

//login user
const loginUser = async(req, res) => {
    try{
        const {email, password} = req.body;

        const existingUser = await Auth.findOne({email});

        if(!existingUser){
            return res.status(400).json({
                message:'you are not yet registered'
            })
        }
        const validPassowrd = await bcrypt.compare(password, existingUser.password)
        if(!validPassowrd){
            return res.status(401).json({
                message:'your email or password is incorrect'
            })
        }

        if(validPassowrd){
            const token = createToken(res, existingUser._id);
            res.status(200).json({
                message:'user loged in successfully',
                isVerified: existingUser.isVerified = true,
                data: existingUser,
                token,

    
            });
        }
       

        

    }catch(error){
        console.log(error)
        res.status(500).json({
            message:'internal server error'
        })
    }
}

const getAllUsers = async(req, res) => {
    try{
        const allUsers = await Auth.find({})
        res.status(200).json({
            allUsers
        })

    }catch(error){
        console.log(error)
    }
}

const getAUser = async(req, res) => {
    try{
        const user = await Auth.findById(req.params.id).select('-password');
        if(user){
            res.json(user)
        }else{
            res.status(404).json({message:"No User Found"})
        }

    }catch(error){
        console.log(error);
        res.status(500).json({
            message:"Internal Server Error"
        })
    }
}
const updateProfile = async(req, res) => {
    try{
       
        const user = await Auth.findById(req.user._id);
        if(!user){
            res.status(400).json({
                message:"you are not authorized to use this route"
            })
        }

        if(user){
            user.email = req.body.email || user.email;
            user.phonenumber = req.body.phonenumber || user.phonenumber
            if(req.body.password){
                const salt = await bcrypt.genSalt(10)
                const hashpassword = await bcrypt.hash(req.body.password, salt)
                user.password = hashpassword
            }
    
            const updatedUser = await user.save()
            res.json(updatedUser);
        }else{
            res.status(400).json({
                message: "Failed To Update Profile!"
            })
        }

      

    }catch(error){
        console.log(error)
        throw new Error('internal server errir')
    }
}

const logoutUser = asyncHandler(async(req, res) => {
    try{
        res.cookie("jwt", "", {
            httpOnly: true,
            expires: new Date(0)
        });
        res.status(200).json({
            message:'user logged out successfully'
        })

    }catch(error){
        console.log(`{error.message}`)
        throw new Error('internal server errir')
    }
})

const deleteUserById = asyncHandler(async(req, res) => {
    try{
        const user = await Auth.findById(req.params.id);
        console.log(user)
        if(user){
            if(user.isAdmin == true){
                res.status(400)
                console.log('cannot delete admin')
                throw new Error('cannot delete admin user')
            }
        }
        await Auth.deleteOne({_id:user._id})
        res.json({message:'user deleted successfully'})

    }catch(error){
        console.log(error.message)
        throw new Error('internal server error')
    }
})

export {
    createUser,
    loginUser,
    getAllUsers,
    getAUser,
    updateProfile,
    logoutUser,
    deleteUserById
}