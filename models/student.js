const mongoose=require('mongoose')
const validator=require('validators')

const studentSchema=new mongoose.Schema({
    username:{
        type:String,
        required:[true,'must be provided'],
        minlength:3
    },
    password:{
        type:String,
        required:[true,'must be provided'],
        minlength:3
    },
    name:{
        type:String,
        required:[true,'must be provided'],
        minlength:3
    },
    email:{
        type:String,
        required:[true,'must be provided'],
        unique:[true,'id already present'],
        // validate(value){
        //     if(!validator.isEmail(value)){
        //         throw new Error("invalid Email")
        //     }
        // }
        match:[/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,'must provide valid email']
    },
    phone:{
        type:Number,
        required:true,
        minlength:10,
        maxlength:12, 
    },
    address:{
        type:String,
        required:true,

    },
    isAdmin:{type:Boolean,default:false}
},{timestamps:true})
module.exports= mongoose.model('student',studentSchema)