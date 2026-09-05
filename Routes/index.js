const app = require('express');

const greet = app.Router();

const {healthCheck, storeTask, updateTask, deleteTask} = require('../Controllers/Greet');


greet.get('/', healthCheck);


module.exports = greet;