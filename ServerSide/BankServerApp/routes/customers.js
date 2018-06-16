var express = require('express');
var router = express.Router();

const customer_controller = require('../controllers/customerController');



router.get('/', customer_controller.customer_list);

router.post('/createCustomer', customer_controller.customer_createCustomer);


module.exports = router;
