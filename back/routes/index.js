var express = require('express');
var router = express.Router();

var register = require ('../controllers/register');
var login = require ('../controllers/login');
var message = require ('../controllers/message');
var follow = require ('../controllers/follow');
var retweet = require ('../controllers/retweet');
var followermessages = require ('../controllers/followermessages');

//sets req.user to  UserID if logged in otherwise false;
var authMiddleWare = require('../services/authMiddleWare');

//message route API
router.post('/message', authMiddleWare.checkAuthenticated , message.post);
router.get('/message', authMiddleWare.checkAuthenticated , message.get);
router.delete('/message', authMiddleWare.checkAuthenticated , message.delete);

//register route API
router.post('/register', register.post);
//login route API
router.post('/login', login.post);
//follow route API
router.post('/follow', authMiddleWare.checkAuthenticated ,follow.post);
//follow route API
router.post('/retweet', authMiddleWare.checkAuthenticated ,retweet.post);
//followermessages route API
router.get('/followermessages', authMiddleWare.checkAuthenticated ,followermessages.get);

module.exports = router;
