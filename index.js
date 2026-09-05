const dotenv = require('dotenv');
dotenv.config({path: "./config.env"})

const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
// const ConnectDb = require('./database');

const router = require('./Routes/routes');

const user = require('./Routes/user');
const greet = require('./Routes');

const app = express();


app.use(express.json());
app.use(morgan('dev'));
app.use(cors()); 


app.use('/api/tasks/', router);
app.use('/api/auth/', user);
app.use('/api/greet/', greet);

const PORT = process.env.PORT || 5001; 


app.listen(PORT, () =>{
	console.log(`app listening on port ${PORT}`);
});