const users = require('../Models/UserModel');
const emailService = require('../utils/emailService') 

const LoginForm = async (req, res) =>{
	const {email, password} = req.body;
	try {

		if (!email || !password) return res.status(406).json({success:false, message:'All fields are required'});

		const user = await users.findOne({email}).select('+password')
		if (!user) return res.status(401).json({success:false, message:"Incorrect Email"})

		const isMatch = user.CheckPassword(password);
		if(!isMatch) return res.status(401).json({success:false, message:"Invalid Credentials"});

		sendToken(user, 200, res);
	} catch(e) {
		console.log(e);
		res.status(500).json({success:false, message:'Something went wrong'});
	}
}

const RegisterForm = async (req,res, next)=>{
	const {username, email, password, confirmPassword} = req.body;
	if (password !== confirmPassword) return res.status(405).json({success:false, message:"Password doesn't match"})
	const user = await users.findOne({email});
	if(!user){
		try {
			const user = await users.create({username, email, password});
			sendToken(user, 200, res);
		} catch(e) {
			console.log(e);
			res.status(500).json({success:false, message:e.message});
		}
	}else{
		res.status(406).json({success:false, message:"Email already taken"});
	}
}

const forgotPassword = async (req, res) =>{
	const {email} = req.body;

	try {
		const user = await users.findOne({email})

		if (!user) return res.status(401).json({success:false, message:"email not found"});

		const verification = Math.random().toString(36).substring(2);
		user.resetPasswordToken = verification;
		await user.save();
		emailService(email, verification);
		res.status(200).json({success:true, message:"email sent"});

	} catch(e) {
		console.log(e);
		res.status(500).json({success:true, message:e.message});
	}
}


const resetPassword = async(req, res) =>{
	const {password} =  req.body;
	const {resetPasswordToken} = req.params;
	const user = await users.findOne({resetPasswordToken});
	if(!user){
		res.status(401).json({success:false, message:"Token Expired"})	
	}
	else{
		user.password = password;
		user.resetPasswordToken = '';
		await user.save();
		res.status(200).json({success:true, message:'Password changed'});
	}
}



const sendToken = (user, status, res) =>{
	const token = user.getSignedToken();
	res.status(200).json({success:true, token:token});
}

module.exports = {LoginForm, RegisterForm, forgotPassword, resetPassword};