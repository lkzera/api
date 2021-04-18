const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const almoxController = require('../controllers/almoxarifado-Controller');


router.get('/',auth, almoxController.get);
router.get('/filtro', auth, almoxController.getId);
router.put('/:id', auth, almoxController.put);
router.delete('/:codigo',auth,almoxController.delete);
// router.post('/', auth, almoxController);
// router.delete('/:id', auth, almoxController);

module.exports = router;