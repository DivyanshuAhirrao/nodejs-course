const express = require('express');
const categoryRoute = require('./Routes/categories');
const app = express();

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/crudOperations')
.then(()=> console.log("Database connected successfully !!"))
.catch(err => console.error("Database connection failed !!"))

app.use(categoryRoute);
app.use(express.json());

const port = process.env.PORT || 5000;
app.listen(port, ()=> console.log(`database connected successfully at port ${port}!!`));