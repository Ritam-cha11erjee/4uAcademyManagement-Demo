const express = require('express'); //imported express
const cors = require('cors'); //allowes cross origin communication (b/w diff domains)

const app = express(); //initialized app
const port = process.env.PORT || 3000; //initialized a gateway for the server to communicate through
const studentRoute = require('./routes/studentRoute')
const financeRoute = require('./routes/financeRoute')
require('dotenv').config();

app.use(express.json()); //Allows app to receive JSON in req.body
app.use(cors()); //Allows app to use cors
const db = require('./utils/mongoose-connection');

app.use('/students', studentRoute);
app.use('/finances', financeRoute);


app.listen(port, () => { //accept requests at this port
    console.log(`Server is live at http://localhost:${port}`);
})