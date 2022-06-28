const errorHandlerMiddleware=(err,req,res,next)=>{
    let customError={
        statusCode:500,
        message:err.message
    }

    res.status(customError.statusCode).json(customError.message);
}

module.exports=errorHandlerMiddleware;