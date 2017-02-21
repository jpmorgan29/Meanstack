var mongoose = require('mongoose'); 
var Schema = mongoose.Schema; //use schema
var bcrypt = require('bcrypt-nodejs'); //internet
var UserSchema = new Schema({
	username: { type: String, lowercase: true, required: true, unique: true},
	password: { type: String, required: true},
	email: {type: String, required: true, lowercase: true, unique: true},
	school: {type: String, required: true, lowercase: true},
	//permission: {type: String, required: true, default: 'user'}
});
UserSchema.pre('save', function(next){
	var user = this;
	bcrypt.hash(user.password, null, null, function(err, hash){
		if (err) return next(err);
		user.password = hash;
		next();
	});	
});
//ik hou van het internet haha (had hier echt nooit zelf op gekomen)
UserSchema.methods.comparePassword = function(password){
	return bcrypt.compareSync(password, this.password);
}

module.exports = mongoose.model('User', UserSchema);