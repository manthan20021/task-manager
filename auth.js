const passport = require('passport');
const LocalStrategy = require("passport-local");
const person = require('./models/user.model')

passport.use(
    new LocalStrategy(async (username, password, done)=>{

    //finding user 
    const user = await person.findOne({username: username});
    //chacking user
    if(!user) done(null, false, {message: "incorect username"}) //done tacks a 3 param (error, user, info)

        //compering password witch is given by user and withc is stored in DB
        const isPasswordMatchd = user.password === password ? true : false
        if(isPasswordMatchd){
            done(null, user);
        }
        else{
            done(null, false, {message: "incorect password"})
        }

})
);

module.exports = passport