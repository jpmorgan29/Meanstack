
var User = require('../models/user');
module.exports = function(router){
	//app.post --> router.post
	
	router.post('/users', function(req, res) {	
	var user = new User();	

	user.username = req.body.username;
	user.password  = req.body.password;
	user.email = req.body.email;
	user.school = req.body.school;


	//user register route
	//
	if(req.body.username == null || req.body.username == '' || req.body.password == null || req.body.password == '' || req.body.email == null || req.body.email == '' || req.body.school == null || req.body.school == '')
		{
		//return false;
		res.json({ success: false, message: 'Gelieve geldige informatie in te vullen'});
		}
		else
		{
			if(req.body.school =='student' || req.body.school == 'leerkracht')
			{
				
				user.save(function(err){
					if(err)
					{
						res.json({success: false, message: 'Gebruikersnaam en/of Email is al in gebruik.'});
					}
					else
					{
						console.log(user.school + ' ' + user.username +' is aangemaakt');
						res.json({success: true, message: 'Dank u, ' + req.body.username + ',is aangemaakt' });
					}
				});
			}
			else
			{
				res.json({success: false, message: 'Gelieve "student" of "leerkracht" te typen'});
			}
		//user.save(function(err)
		//{
			//if(req.body.school == 'student' || req.body.school == 'leerkracht')
			//{
			//	if(err)
			//	{
			//		res.json({success: false, message: 'Gebruikersnaam en/of Email bestaat al.'});
			//	}
			//	else{
			//		res.json({success: true, message: 'Dank u, ' + req.body.username + ',is aangemaakt' });
			//	}
			//}
				
			//	res.json({success: false, message: 'Gelieve "student" of "leerkracht" in te vullen.'});
			//}	
			//if (err){
			//	console.log(err);
			//}
			//else{
			//	console.log("juist");
			//}
			//console.log("ggwp");
		
		};
		});
	//router.get('/retrieve', function(req,res){
	//	User.findOne({ school: req.body.school}).select('school').exec
	//});
	//user login route
	router.post('/authenticate', function(req,res){
		User.findOne({ username: req.body.username}).select('email username password school').exec(function(err,user){
			if(err) throw err;
			if(!user){
				res.json({ success: false, message: 'Ongeldige gebruiker' });
			}
			else if (user){
				if(req.body.password)
				{
					var validPassword = user.comparePassword(req.body.password);
					if(!validPassword){
						res.json({success: false, message: 'Wachtwoord niet herkenbaar' });
					}else{
						res.json({success: true, message: 'Wachtwoord gevonden'});
					}
				}
				else
				{
					res.json({success: false, message: 'Geen wachtwoord ingevoerd'});
				};
			};
		});
	});
return router; //return router object to server
};