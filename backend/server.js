const express = require("express");
const app = express();
const cors = require('cors');
require("dotenv").config();
let dbConnect = require("./dbConnect");
app.use(cors());
// parse requests of content-type - application / json
app.use(express.json());
app.get("/", (req, res) => {
    res.json({
        message: "Welcome to my MongoDB application."
    });
});
// set port, listen for requests
const PORT = process.env.PORT || 8080;

//different routes
let customerRoutes = require('./routes/customerRoutes');
app.use('/teashop/customers', customerRoutes);

let orderRoutes = require('./routes/orderRoutes');
app.use('/jasminedragon', orderRoutes);

let apiRoutes = require('./routes/apiRoutes');
app.use('/api/characters', apiRoutes);

let characterRoutes = require('./routes/characterRoutes');
app.use('/database/characters', characterRoutes);

let scoreRoutes = require('./routes/scoreRoutes');
app.use('/teashop/highscore', scoreRoutes);



app.listen(PORT, () => {
    console.log(`Server is running on port 
${PORT}.`);
});