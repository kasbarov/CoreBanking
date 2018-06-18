const User = require('../model/user');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');


// http://localhost:3000/users/
exports.user_list = function(req, res, next){

    console.log('Inside user_list api');
    User.find()
        .sort([['username', 'ascending']])
        .exec(function(err, list_users){
            if(err) return next(err);
            

            res.json(list_users);
        });
}

exports.user_detail = function(req, res, next){

    console.log('Inside user_detail');

    User.findById(req.params.id).exec(function(err, user){
        console.log(user);
        if(err) return next(err);
        res.json(user);
    });

}

// http://localhost:3000/users/authenticate
exports.user_authenticate = function(req, res, next){

    console.log('Inside user_authenticate');


    User.findOne({'username' : req.body.username, 'password' : req.body.password})
        .exec(function(err, user){
            if(err) {
                console.log('authentication error');

                return next(err);
            }
         
            if(user){
                var token = jwt.sign({ id: req.body.username }, 'supersecret', {
                    expiresIn: 86400 // expires in 24 hours
                  });
                  res.status(200).send({ auth: true, token: token });
            }
               
            else{
                console.log('no user found');
           // res.json({'message' : 'User not found'});
            res.status(200).send({ auth: false });
            }
        });

}

exports.customer_account_list = function(req, res, next){

    console.log('Inside customer_account_list');

    Customer.findById(req.params.id)
            .exec(function(err, customer){
                
            });


    customer.save().then(function(){
        res.json({status:'0'});
    }).catch(function(err){
        res.json({status:'1'});
    });

}
