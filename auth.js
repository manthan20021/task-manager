const passport = require('passport');
const LocalStrategy = require("passport-local");
const person = require('./models/user.model')
//require('./models/user.model').comperPassword

passport.use(
    new LocalStrategy(async (username, password, done)=>{
        try {
            
    //finding user 
    const user = await person.findOne({username: username});
    //chacking user
    if (!user) {
        return done(null, false, { message: "Incorrect username" });
      } //done tacks a 3 param (error, user, info)

        // 3. Compare password
      const isPasswordMatched = await user.comperPassword(password);
        if (!isPasswordMatched) {
        return done(null, false, { message: "Incorrect password" });
      }
      return done(null, user);

        } catch (error) {
             return done(error);
        }
})
);

module.exports = passport