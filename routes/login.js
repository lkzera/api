const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const loginController = require('../controllers/login-controller');


//router.get('/',auth,loginController.get);
router.get('/:id',auth,loginController.getId);
router.post('/',loginController.post);
//router.delete('/:id',auth,loginController.delete);


module.exports = router;