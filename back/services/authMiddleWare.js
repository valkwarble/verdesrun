module.exports = {
	checkAuthenticated : function (req,res,next){
		
		try{
			var re = /\s*;\s*/;

			var auth = req.headers.cookie? req.headers.cookie.split(re).map(function(pair){		
				return pair.split(/\s*=\s*/);
			}).filter(function(pair){
				return pair[0] == "authtoken"
			}).map(function(authtoken){
				return {authtoken: authtoken[1]}
			}).pop() : false;
			req.user =  auth.authtoken? auth.authtoken : false;
			if (req.user == false){return res.status(200).send({message:'not Authenticated please log in'})}
		
		}catch(e){
		
		}
		next();
	}
}