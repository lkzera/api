const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const almoxController = require('../controllers/almoxarifado-Controller');


router.get('/',auth, almoxController.get);
router.get('/filtro', auth, almoxController.getId);
router.put('/:id', auth, almoxController.put);
// router.post('/', auth, almoxController);
// router.delete('/:id', auth, almoxController);

module.exports = router;