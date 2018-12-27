/* eslint-disable no-underscore-dangle */
/* eslint-disable consistent-return */

const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');

const schemas = require('./schemas');
const auth = require('./auth.json');

const router = express.Router();


const {
    Note,
    User
} = schemas;

// this is our get method
// this method fetches all available data in our database
router.get('/note', (req, res) => {
    const token = req.headers.user;
    const user = jwt.verify(token, auth.secret);
    User.find(user, (error, users) => {
        let query = {};
        if (users.length) {
            query = { userId: users[0]._id };
        }
        Note.find(query, (err, docs) => {
            if (err) {
                return res.json({
                    success: false,
                    error: err
                });
            }
            return res.json({
                success: true,
                notes: docs
            });
        });
    });
});
// this is our update method
// this method overwrites existing data in our database
router.put('/note', (req, res) => {
    const note = req.body;
    Note.findOneAndUpdate(note.id, note, {
        new: true
    }, (err, doc) => {
        if (err) {
            return res.json({
                success: false,
                error: err
            });
        }
        return res.json({
            success: true,
            note: doc
        });
    });
});
// this is our delete method
// this method removes existing data in our database
router.delete('/note', (req, res) => {
    const {
        id
    } = req.body;
    Note.findOneAndDelete(id, (err) => {
        if (err) {
            return res.send(err);
        }
        return res.json({
            success: true
        });
    });
});
// this is our create methid
// this method adds new data in our database
router.post('/note', (req, res) => {
    const note = new Note();
    Object.assign(note, req.body);
    //   const { id, title, text } = req.body;
    if ((!note.id && note.id !== 0) || !note.title) {
        return res.json({
            success: false,
            error: 'INVALID INPUTS',
        });
    }
    //   note.title = title;
    //   note.id = id;
    note.save((err, doc) => {
        if (err) {
            return res.json({
                success: false,
                error: err
            });
        }
        return res.json({
            success: true,
            note: doc
        });
    });
});

router.post('/register', (req, res) => {
    try {
        User.register(new User({
            username: req.body.username
        }), req.body.password, (err) => {
            if (err) {
                return res.status(500).send(`An error occurred: ${err}`);
            }

            passport.authenticate(
                'local', {
                    session: false,
                }
            )(req, res, () => {
                res.status(200).send('Successfully created new account');
            });
        });
    } catch (err) {
        return res.status(500).send(`An error occurred: ${err}`);
    }
});

router.post('/login', (req, res) => {
    passport.authenticate('local', {
        failureRedirect: '/login',
        session: false
    }, (err, user) => {
        if (err || !user) {
            return res.status(400).json({
                message: 'Something is not right',
                user,
            });
        }
        req.login(user, {
            session: false
        }, (error) => {
            if (error) {
                res.send(error);
            }
            // generate a signed son web token with the contents of user object and
            // return it in the response
            const token = jwt.sign({
                id: user.id,
                email: user.username
            }, auth.secret);
            return res.json({
                user: user.username,
                token
            });
        });
    })(req, res);
});

router.get('/logout', (req, res) => {
    req.logout();
    res.status(200).send('successfully logged out');
});

module.exports = router;
