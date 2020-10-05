const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const JWTStrategy = require('passport-jwt').Strategy;
const User = require('./models/user');

const cookieFromExtractor = req => {
    let token = null;
    if (req && req.cookies) {
        token = req.cookies["access_token"];
    }
    return token;
}

// if there is a bug, try putting it above the localstrategy
passport.use(new JWTStrategy({
    jwtFromRequest: cookieFromExtractor,
    secretOrKey: 'keyboard cat'
}, (payload, done) => {
    User.findById({ _id: payload.sub }, (err, user) => {
        if (err) return done(err);

        if (!user) {
            return done(null,false);
        } else {
            return done(null, user);
        }
    })
}))

passport.use(new LocalStrategy((username, password, done) => {
    User.findOne({ username: username }, (err, user) => {
        // something went wrong with database
        if (err) return done(err);

        // comment
        if (!user) {
            return done(null, false);
        }
        user.comparePassword(password, done)
        
    })
}));

