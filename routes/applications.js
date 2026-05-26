const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/applicationController');
const protect = require('../middleware/auth');

router.use(protect);
router.get('/stats', ctrl.stats);
router.get('/', ctrl.getAll);
router.get('/:id', ctrl.getOne);
router.post('/', ctrl.create);
router.put('/:id', ctrl.update);
router.delete('/:id', ctrl.remove);

module.exports = router;
