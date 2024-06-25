const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config();
const cors = require('cors');
const connectToMongoDB = require('./utils/db');
const projectRoute = require('./routes/project-route');
const taskRoute = require('./routes/task-route');
const userRoute = require('./routes/user-route');
const authRoute = require('./routes/auth-route');

// Call every variables for .env file
const HOST = process.env.HOST;
const PORT = process.env.PORT;
const FRONTEND_URL = process.env.FRONTEND_URL;

// Handle the JSON file
app.use(express.json());

// Implements cors policy
const corsOptions = {
    origin : ['http://192.168.100.37:3001',FRONTEND_URL] ,
    methods : 'GET, POST, PUT, DELETE, HEAD',
    allowedHeaders : ['Content-Type','Authorization'],
    optionSuccessStatus : 200
}
app.use(cors(corsOptions));

// Setup the routes for the project
app.use('/api/project',projectRoute);
app.use('/api/task',taskRoute);
app.use('/api/user',userRoute);
app.use('/api/auth',authRoute);

// Start the server upon connecting to db
connectToMongoDB().then((data)=>{
    console.log(data);
    app.listen(PORT,()=>{
        console.log(`Server listening at host : ${HOST} and port : ${PORT}`)
    })
}).catch((err)=>{
    console.log(err.message) 
}) 
