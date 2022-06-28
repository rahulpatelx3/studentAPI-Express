require('express-async-errors')
const express=require('express');
const app=express();
const dotenv=require('dotenv')
dotenv.config();

const connectDB=require('./db/connect')
const studentRouter=require('./routes/student');
const notFoundMiddleware=require('./middleware/not-found')
const errorHandlerMiddleware=require('./middleware/error-handler')

app.use(express.json())

//routes
app.get('/api/v1',(req,res)=>{
    res.send('connected to app version 1')
})



app.use('/api/v1/students',studentRouter);

//middleware
app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)





const start=async(req,res)=>{
    try {
        await connectDB(process.env.MONGO_URL)
        app.listen(process.env.PORT,()=>{
            console.log(`connected to server at port ${process.env.PORT}`)
        })
    } catch (error) {
        console.log(error)
    }
}
start();
