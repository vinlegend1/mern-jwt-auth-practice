const express = require('express');
const router = express.Router();
const passport = require('passport');
const passportConfig = require('../passport');
const User = require('../models/user');
const Todo = require('../models/todo');
const jwt = require('jsonwebtoken');

const signToken = userID => {
    return jwt.sign({
        iss: "keyboard cat",
        sub: userID
    }, "keyboard cat", { expiresIn: "1hr" });
}

router.post('/register', (req, res) => {
    const { username, password, role } = req.body;
    User.findOne({ username }, (err, user) => {
        if (err) {
            return res.status(500).json({ msgBody: "Error has occured", msgErr: true });
        }
        if (user) {
            return res.status(400).json({ msgBody: "username already taken", msgErr: true });
        } else {
            const user = new User({
                username,
                password,
                role
            });
            user.save((err) => {
                if (err) return res.status(500).json({ msgBody: "Error has occured", msgErr: true })
                else {
                    return res.status(201).json({ msgBody: "Account successfully created", msgErr: false })
                }
            })
        }
    })
});

router.post('/login', passport.authenticate('local', { session: false }), (req, res) => {
    if (req.isAuthenticated()) {
        const { _id, username, role } = req.user;
        const token = signToken(_id);
        res.cookie('acces_token', token, { httpOnly: true, sameSite: true });
        res.status(200).json({
            isAuthenticated: true,
            user: {
                username,
                role
            }
        });
    }
});

router.get('/logout', passport.authenticate('jwt', { session: false }), (req, res) => {
    res.clearCookie('access_token');
    console.log('clear')
    return res.json({
        user: {
            username: "",
            role: ""
        },
        success: true
    })
});

// userRouter.get('/logout',passport.authenticate('jwt',{session : false}),(req,res)=>{
    // res.clearCookie('access_token');
    // res.json({user:{username : "", role : ""},success : true});
// });

router.post('/todo', passport.authenticate('jwt', { session: false }), (req, res) => {
    const todo = new Todo(req.body);
    todo.save((err) => {
        if (err) return res.status(500).json({ msgBody: "Error has occured", msgErr: true });
        else {
            req.user.todos.push(todo);
            req.user.save(err => {
                if (err) return res.status(500).json({ msgBody: "Error has occured", msgErr: true });
                else {
                    res.status(200).json({ msgBody: "Successfully created todo", msgErr: false });
                }
            })
        }
    })
});

router.get('/todos', passport.authenticate('jwt', { session: false }), (req, res) => {
    User.findById({ _id: req.user._id }).populate('todos').exec((err, document) => {
        if (err) return res.status(500).json({ msgBody: "Error has occured", msgErr: true });
        else {
            res.status(200).json({ todos: document.todos, authenticated: true });
        }
    })
});

router.get('/admin', passport.authenticate('jwt', { session: false }), (req, res) => {
    if (req.user.role == "admin") {
        res.status(200).json({ msgBody: "You are an admin", msgErr: false });
    } else {
        res.status(403).json({ msgBody: "You're not admin... go away", msgErr: true });
    }
});

// persistence to help frontend
router.get('/authenticated', passport.authenticate('jwt', { session: false }), (req, res) => {
    const { username, role } = req.user;
    res.status(200).json({
        isAuthenticated: true,
        user: {
            username,
            role
        }
    });
});

module.exports = router;