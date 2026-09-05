const app = require('express');

const routes = app.Router();

const {getTasks, storeTask, updateTask, deleteTask} = require('../Controllers/Task');


routes.get('/', getTasks);
routes.post('/store', storeTask);
routes.patch('/update/:id', updateTask);
routes.delete('/delete/:id', deleteTask);


module.exports = routes;