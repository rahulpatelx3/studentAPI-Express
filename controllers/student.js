require('express-async-errors');
const Student=require('../models/student')
const NotFoundError=require('../errors/not-found')
const UnAuthenticatedError=require('../errors/unauthenticated')
const cryptoJS=require('crypto-js')
const jwt=require('jsonwebtoken')

const register=async(req,res)=>{
    const student={
        username:req.body.username,
        name:req.body.name,
        email:req.body.email,
        phone:req.body.phone,
        address:req.body.address,
        isAdmin:req.body.isAdmin,
        password:cryptoJS.AES.encrypt(req.body.password,process.env.PASS).toString()
    }
    const s=await Student.create(student);
    res.status(200).json(s);
}
const login=async(req,res)=>{
    const student=await Student.findOne({username:req.body.username})
    if(!student)
    throw new NotFoundError("Student not found");
    const pwd=cryptoJS.AES.decrypt(student.password,process.env.PASS).toString(cryptoJS.enc.Utf8);
    console.log(req.body.password)
    if(pwd!==req.body.password)
    throw new UnAuthenticatedError("password incorrect");

    const token=jwt.sign({id:student._id,username:student.username,isAdmin:student.isAdmin},process.env.JWT_SEC,{expiresIn:'3d'});

    res.status(200).json({student,token})

}
const getAllStudents=async(req,res)=>{
    const students=await Student.find();

    // try{
        if(!students){
            throw new NotFoundError("students not found");
        }

    res.status(200).json({students,count:students.length})
    // }
    // catch(err){
    //     console.log(err.message);
    //     res.status(err.statusCode).send(err.message);
    // }
   

}

const getSingleStudent=async(req,res)=>{
    const student=await Student.findById(req.params.id);

    try{
        if(!student){
            throw new NotFoundError("students with this id not present");
        }

    res.status(200).json({student,count:student.length})
    }
    catch(err){
        res.status(err.statusCode).send(err.message);
    }
   

}
const updateStudent=async(req,res)=>{
    const student=await Student.findByIdAndUpdate(req.params.id,req.body,{new:true,runValidators:true});

    try{
        if(!student){
            throw new NotFoundError("students with this id not present");
        }

    res.status(200).json({student})
    }
    catch(err){
        res.status(err.statusCode).send(err.message);
    }
   

}
const deleteStudent=async(req,res)=>{
    const student=await Student.findByIdAndDelete(req.params.id);

    try{
        if(!student){
            throw new NotFoundError("students with this id not present");
        }

    res.status(200).json({student})
    }
    catch(err){
        res.status(err.statusCode).send(err.message);
    }
   

}
module.exports={register,login,getAllStudents,getSingleStudent,updateStudent,deleteStudent}