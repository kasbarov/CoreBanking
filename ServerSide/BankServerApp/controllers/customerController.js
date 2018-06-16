const Customer = require('../model/customer');

// http://localhost:3000/customers
exports.customer_list = function(req, res, next){

    console.log('inside customer_list');

    Customer.find()
        .exec(function(err, list_users){
            if(err) return next(err);
            

            res.json(list_users);
        });
}


exports.customer_createCustomer = function(req, res, next){

    console.log('Inside customer_createCustomer');


    var customer = new Customer({
        ssn: req.body.ssn,
        email: req.body.email,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        address: req.body.address
    });

    customer.save().then(function(){
        res.json({status:'SUCCESS'});
    }).catch(function(err){
        res.json({status:'1'});
    });

}
