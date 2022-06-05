const express = require("express");
const router = express.Router();
const auth = require('../middlewares/authorize');


const user = require('../controllers/user.controller');

router.post('/signup', function (req, res) {

    user.add(req.body, function (err, user) {

        if (err) {
            res.status(404);
            res.json({
                error: 'User not created'
            });
        } else {
            res.json({ signup: true, username: user });
        }

    });

});

router.post('/login', function (req, res) {

    user.login(req.body, function (err, token) {

        if (err) {
            res.status(404);
            res.json({
                error: 'User not logged'
            });
        } else if (token) {
            res.json({ success: true, jwt: token });
        } else {
            res.json({ success: false, message: 'username or password do not match' });
        }

    });

});

router.put('/logout', auth, function (req, res) {

    user.logout(req,  function (err, token) {

        if (err) {
            res.status(404);
            res.json({
                error: 'Unauthenticated'
            });
        } else {
            res.json({ message: 'Succesfully Logged Out' 
            });
        }

    });

});


module.exports = router;