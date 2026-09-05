const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const UserSchema = mongoose.Schema({
	username:{
		type: String,
		required: true
	},
	email:{
		type:String,
		required:true
	},
	password:{
		type:String,
		required:true
	},
	resetPasswordToken: String,
	resetPasswordExpire: Date
})



UserSchema.methods.getSignedToken = function() {
	return jwt.sign({id: this._id}, process.env.JWT_SECRET)
}

UserSchema.pre('save', async function(next){
	if(!this.isModified('password')){
		next();
	}
	const salt = await bcrypt.genSalt(10);
	this.password = await bcrypt.hash(this.password, salt);
	next();
})

UserSchema.methods.CheckPassword = async function(password){
	return await bcrypt.compare(password, this.password);
} 

const User = mongoose.model('user', UserSchema);


module.exports = User; 