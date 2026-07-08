const express = require('express'); //imported express
const cors = require('cors'); //allowes cross origin communication (b/w diff domains)

const app = express(); //initialized app
const PORT = process.env.PORT || 3000; 

const studentRoute = require('./routes/studentRoute')
const financeRoute = require('./routes/financeRoute')
require('dotenv').config();

app.use(express.json()); //Allows app to receive JSON in req.body
app.use(cors()); //Allows app to use cors
const db = require('./utils/mongoose-connection');

app.use('/students', studentRoute);
app.use('/finances', financeRoute);


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});