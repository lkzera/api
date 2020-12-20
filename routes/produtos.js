const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const produtosControllers = require('../controllers/produtos-controllers');

router.get('/',auth, produtosControllers.get);
router.get('/:codigo',auth, produtosControllers.getId);
router.put('/:codigo',auth, produtosControllers.putId);
router.delete('/:codigo',auth, produtosControllers.delete);
router.post('/',auth, produtosControllers.post);

module.exports = router;