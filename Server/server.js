const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./Config/config');
const app = express();
const path = require('path');
//Routes
const userRoutes = require('./Routes/Auth');
const cartRoutes = require('./Routes/cart');
const proRoutes = require('./Routes/Products');
const orderRoutes = require("./Routes/Orders");
const sellerRoutes = require("./Routes/Seller");


require('dotenv').config();

//Midlle Wares
const cookieParser = require('cookie-parser');
app.use(cookieParser({}));
app.use(cors({
    origin:["https://caraadvance.onrender.com","http://localhost:3000"],
    credentials:true,
    methods:["GET","POST"]
}));        
app.use(bodyParser.json());


const dir = path.dirname("");

app.use(express.static(path.join(dir,"../cart/build")));



//Database Configartionz

db;
//Api
app.use('/api', userRoutes);
app.use('/api',cartRoutes);
app.use('/api',proRoutes);
app.use('/api/',orderRoutes);
app.use('/api',sellerRoutes);

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../cart/build', 'index.html'));
});
app.listen(process.env.PORT, () => {
    console.log(`Server is Running on Port ${process.env.PORT}`);
});
