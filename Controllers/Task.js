const mongoose = require('mongoose');
const Task = require('../Models/TaskModel');

const getTasks = async (req, res) =>{
	try {
		const data = await Task.find();
		res.status(200).json(data)
	} catch(e) {
		console.log(e);
		res.status(404).json('No Task Found');
	}
};


const storeTask = async(req, res) => {
	const bodytask = req.body;
	const newTask = new Task(bodytask); 
	try {
		await newTask.save();
		res.status(200).json(newTask);
	} catch(e) {
		console.log(e);
		res.status(500).json(e.message);
	}
}



const updateTask = async (req, res) =>{
	const id = req.params.id;
	const data = await Task.findById(id)
	if (data) {
		try {
			const update = await Task.findOneAndUpdate({_id: id}, {reminder : !data.reminder}, {new: true})
			res.status(201).json(update);
		} catch(e) {
			console.log(e);
			res.status(500).json(e.message);
		}
	}
	else{
		res.status(404).json('no task found');
	}
}

const deleteTask = async (req, res) =>{
	const {id} = req.params;
	try {
		await Task.findByIdAndDelete(id);
		res.status(200).json('deleted');
	} catch(e) {
		console.log(e);
		res.status(404).json('task not found');
	}
}

module.exports = {getTasks, storeTask, updateTask, deleteTask};