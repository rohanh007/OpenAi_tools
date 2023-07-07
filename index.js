const express=require("express")
const morgan =require("morgan")
const cors=require("cors")
const bodyParser=require("body-parser")
const colors=require("colors") 
const dotenv=require("dotenv")
const connectDB = require("./config/db")
const authroutes=require('./routes/authroutes')
const errorHandler=require("./middlewares/errormiddleware");

const app=express();
const PORT=process.env.PORT || 8080


//rest object

//secure env
dotenv.config()
// mongo connect 

connectDB();
//middleware 

app.use(cors())
app.use(express.json())
app.use(bodyParser.urlencoded({extended:false}))
app.use(morgan('dev')) 
app.use(errorHandler) 
app.use('api/v1/auth',authroutes);
app.use('api/v1/openai',require("./routes/openaiRoutes"))

app.listen(PORT,()=>{
    console.log(`server run in ${process.env.DEV_MODE} on ${PORT}`)
})

