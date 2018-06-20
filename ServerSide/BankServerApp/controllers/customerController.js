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


exports.customer_detail = function(req, res, next){

    console.log('Inside customer_detail');
    // Original
    Customer.findOne({'ssn': req.params.id}).exec(function(err, user){
        console.log(user);
        res.json(user);
    });

}



exports.customer_createAccount = function(req, res, next){

    console.log('Inside customer_createAccount');
    console.log(req.body);

    Customer.findOneAndUpdate({'ssn': req.body.ssn},{$push: {'accounts': {'accountNumber': req.body.accountNumber, 'nickName': req.body.nickName, 'balance': req.body.balance, 'accountType': req.body.accountType} }}).exec(function(err, user){
        console.log(user);
        if(user){
            res.json({status:'SUCCESS'});
        }else{
            res.json({status:'1'});
        }
        // res.json(user);
    });

}


// deposit money in the customer account
exports.deposit_amount = function(req, res, next){

    console.log('Inside deposit_amount');
    console.log(req.body);

    let amount2Deposit = req.body.amount;
    Customer
    .findOneAndUpdate(
        {'ssn': req.body.ssn, 'accounts.accountNumber': req.body.accountNumber},
        {$inc : {"accounts.$.balance" : amount2Deposit} })
        .exec(function(err, customer){
     
            console.log(customer);
      
            if(customer){
            res.json({status:'SUCCESS'});
        }else{
            res.json({status:'FAIL'});
        }
        // res.json(user);
    });

}

// withdraw money in the customer account
exports.withdraw_amount = function(req, res, next){
    console.log('Inside withdraw_amount');
    console.log(req.body);

    let amount_to_withdraw = req.body.amount;
    console.log("amount_to_withdraw: "+amount_to_withdraw);
    /* let current_balance = Customer
                           .findOne(
                            {'ssn': req.body.ssn,
                             'accounts.accountNumber': req.body.accountNumber},
                             {"accounts.$.balance":1});
    console.log("current_balance: "+JSON.stringify(current_balance));
     */


    Customer
    .findOneAndUpdate(
        {'ssn': req.body.ssn, 'accounts.accountNumber': req.body.accountNumber},
        {$inc : {"accounts.$.balance" : -amount_to_withdraw} })
        .exec(function(err, customer){
         
            console.log(customer);

           /*  if({"customer.accounts.$.balance": {$lt :  0}}){
                res.json({status:'FAIL'});
            }else  {}  */
                if(customer){
                    res.json({status:'SUCCESS'});
                }else{
                    res.json({status:'FAIL'});
                }
                  
        // res.json(user);
    });
}

// transfer money 
exports.Transfer_amount = function(req, res, next){
    console.log('Inside Transfer_amount');
    console.log(req.body);

    let amount_to_transfer = req.body.amount;
    console.log("amount_to_transfer: "+amount_to_transfer);
// deducting money from the owner account
    Customer
    .findOneAndUpdate(
        {'ssn': req.body.ssn, 'accounts.accountNumber': req.body.accountNumber},
        {$inc : {"accounts.$.balance" : -amount_to_transfer} })
        .exec(function(err, customer){
         
            console.log(customer);

           /*  if({"customer.accounts.$.balance": {$lt :  0}}){
                res.json({status:'FAIL'});
            }else  {}  */
                if(customer){
                    res.json({status:'SUCCESS'});
                }else{
                    res.json({status:'FAIL'});
                }
                  
        // res.json(user);
    });
//depositing money to the account no provided
    Customer
    .findOneAndUpdate(
        {'accounts.accountNumber': req.body.accountNumber2},
        {$inc : {"accounts.$.balance" : amount_to_transfer} })
        .exec(function(err, customer){
         
            console.log(customer);
    });

}