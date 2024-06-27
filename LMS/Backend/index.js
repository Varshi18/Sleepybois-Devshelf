import express from "express"
import dotenv from "dotenv"
import mongoose from "mongoose"
import bookRoute from "./route/book.route.js"
import cors from "cors"

const app = express()
app.use(cors());

dotenv.config();

const PORT = process.env.PORT || 4000
const URI = process.env.MongoDBURI;
//connect to MongoDB
try{
    mongoose.connect(URI,{
        useNewUrlParser: true,
        useUnifiedTopology:true
    });
    console.log("Connected to MongoDB")
}
catch(error){
    console.log("error:", error)
}

//defining routes

app.use("/book", bookRoute)

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`)
})


//for new frontend start from 2:50:00 and install axios in that frontend
//at 3:00:00 user login implementation where it take to all the books page only after login
