var express = require('express');
var router = express.Router();

const customer_controller = require('../controllers/customerController');



router.get('/', customer_controller.customer_list);

router.post('/createCustomer', customer_controller.customer_createCustomer);

router.get('/accountList/:id', customer_controller.customer_account_list);

router.post('/addaccount/:id', customer_controller.customer_account_addAccount);


module.exports = router;
