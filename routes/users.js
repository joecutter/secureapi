var express = require('express');
var router = express.Router();
const jwt    = require('jsonwebtoken');

const UserRoll = require('../model/userModel')

var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://user:password1@ds237641.mlab.com:37641/secureapi',['UserRoll'],function(err) {
    if (err) {
        console.log('MongoDB connection error: ' + err);
        process.exit(1);
    }
});


const token = jwt.sign({
  data: 'foobar'
}, 'secret', { expiresIn: '1h' });


const verify = (req, res, next) => {
    try {
      jwt.verify(req.headers.authorization, "secret", function(err, verify) {
      if(err){
        res.status(400).json({
          "msg": "Error Occurred "+err
        })
      }else{
        console.log(verify)
        next();
      }
    });
    }catch(error){
      res.status(400).json({
        "msg":"Auth token failed or invalid"
      })
    } 
}

/* GET users listing. */
router.get('/users/:id',verify, function(req, res, next) {

  console.log(JSON.stringify(req.headers.authorization));
  var id = req.params.id

  UserRoll.findOne({'name':id }, function(error,data){
    if (error){
      res.send({
        'code': 400,
        'data': error
      })
    }else{
      res.send({
        'code': 200,
        'data': data.status
      })
    }
  })

});

/* POST users listing. */
router.post('/users', function(req, res, next) {

  var name = req.body.name
  var status = req.body.status

  const userRoll = new UserRoll()
  userRoll.name = name;
  userRoll.status = status

  userRoll.save({},function(error,data){
      if(!error){
        res.send({
          'code': 200,
          'token': token,
          'data': data
        })
      } 
      return res.send({
        'code': 400,
        'data': error
      })  
  });
});

module.exports = router;
