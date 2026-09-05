const healthCheck = async (req, res) =>{
	try {
		res.status(200).json({
            success: true,
            message:"Health check is working",
            data:[]
        })
	} catch(e) {
		console.log(e);
		res.status(404).json('No Task Found');
	}
};

module.exports = {healthCheck};