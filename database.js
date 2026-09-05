const mongoose = require('mongoose');


const ConnectDb = async () =>{
	try {
		mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false})
		console.log("mongo connected");
	} catch(e) {
		console.log(e);
	}

}


module.exports = ConnectDb;