const mongoose = require('mongoose');


const TaskSchema = mongoose.Schema({
	text:String,
	day: String,
	reminder:{
		type: Boolean,
		default: false
	},
	user_id: String
})


const Task = mongoose.model('task', TaskSchema);
module.exports = Task;