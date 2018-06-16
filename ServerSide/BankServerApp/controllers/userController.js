const User = require('../model/user');

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
            if(err) return next(err);
            
            if(user)
                res.json(user);
            else
            res.json({'message' : 'User not found'});
        });

}