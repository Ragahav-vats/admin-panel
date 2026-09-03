require("dotenv").config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const adminRoutes = require("./src/routes/admin/adminRoutes");
const userRoutes = require("./src/routes/admin/userRoutes");
const courseRoutes = require("./src/routes/admin/courseRoutes");
const internshipRoutes = require("./src/routes/admin/internshipRoutes");
const dashboardRoutes = require("./src/routes/admin/dashboardRoutes");


const server = express();

server.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
server.use(express.urlencoded({ extended: true }));

server.use(bodyParser.json());

server.use(cors());

// Admin Routes
server.use("/api/admin", adminRoutes);
// User Routes
server.use("/api/admin/users", userRoutes);
// Course Routes
server.use("/api/admin/courses", courseRoutes);

server.use("/api/admin/internships", internshipRoutes);

server.use("/api/admin/dashboard", dashboardRoutes);

server.get('/', (request,response) => {
    response.send("<h1>Server is working !!</h1>");
})


server.listen(5000, () => {
    mongoose.connect('mongodb://127.0.0.1:27017/intern')
   .then(() => console.log('Connected!'))
   .catch((error) => {
     console.log(error);
   })
    console.log("Server is working fine !!");
})