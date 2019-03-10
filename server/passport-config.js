var configAuth = require('./config/auth');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
var User=require('./models/user');
passport.use('local', new LocalStrategy({
  usernameField:'email',
  passwordField:'password'
},
function(username, password, done) {
    User.findOne({ email: username }, function(err, user) {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      if (!user.isValid(password)) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
    });
  }
));
// Social Media SignUp Section
passport.use(new FacebookStrategy({
  clientID: configAuth.FacebookAuth.cliientID,
  clientSecret: configAuth.FacebookAuth.clientSecret,
  callbackURL: configAuth.FacebookAuth.callbackURL
},
function(accessToken, refreshToken, profile, done) {
  process.nextTick( req,res => {
       User.findOne({'facebook.id': profile.id}, function (err,user) {
         if (err)
         return done (err);
         if (user) 
         return done(null, user);
         else {
           const newUser = new User();
           newUser.facebook.id = profile.id;
           newUser.facebook.token = accessToken;
           newUser.facebook.name = profile.name.givenName + '' + profile.name.familyName;
           newUser.facebook.email = profile.emails[0].value;
           newUser.save(function (err) {
             if (err) throw err;
             return done (null, newUser);
             
           })
         }
       })
  })
}
));

passport.serializeUser(function(user, done) {
    done(null, user._id);
});  
passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
});