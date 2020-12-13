const express = require('express');
const router = express.Router();

const loginController = require('../controllers/login-controller');


router.get('/',loginController.get);
router.get('/:id',loginController.getId);
router.post('/',loginController.post);
router.delete('/:id',loginController.delete);


module.exports = router;