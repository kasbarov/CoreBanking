var express = require('express');
var router = express.Router();

const customer_controller = require('../controllers/customerController');



router.get('/', customer_controller.customer_list);

router.post('/createCustomer', customer_controller.customer_createCustomer);

router.get('/:id', customer_controller.customer_detail);

router.post('/createAccount', customer_controller.customer_createAccount);

module.exports = router;
