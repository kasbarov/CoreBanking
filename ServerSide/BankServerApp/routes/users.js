var express = require('express');
var router = express.Router();

const user_controller = require('../controllers/userController');


/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

router.get('/', user_controller.user_list);

router.get('/detail/:id', user_controller.user_detail);

router.post('/authenticate', user_controller.user_authenticate);

module.exports = router;
