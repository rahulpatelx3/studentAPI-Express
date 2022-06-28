const jwt=require('jsonwebtoken')
const UnAuthenticatedError = require('../errors/unauthenticated')

const verifyToken=async(req,res,next)=>{
    const authHeader=req.headers.authorization
    if(authHeader){
        const token=authHeader.split(" ")[1];
        jwt.verify(token,process.env.JWT_SEC,(err,student)=>{
            if(err)
            res.status(401).send('invalid token');
            req.student=student
            next();
        })
    }
    else{
        res.status(403).send('token not present')
    }
}

const verifyTokenAndAdmin=async(req,res,next)=>{
    verifyToken(req,res,()=>{
        console.log(req.student.isAdmin)
        if(req.student.isAdmin)
        next();
        else
        res.status(403).send("student must be admin to process this request")
    })
}
const verifyTokenAndAuthorization=async(req,res,next)=>{
    verifyToken(req,res,()=>{

        if(req.student.isAdmin || req.student.id===req.params.id)
        next()
        else
        res.status(403).send("you can not check other students details, you are not admin")
    })
}

module.exports={verifyToken,verifyTokenAndAdmin,verifyTokenAndAuthorization}