const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/reviewController');
const protect = require('../middleware/auth');

router.get('/', protect, ctrl.getAll);
router.post('/', protect, ctrl.create);
router.delete('/:id', protect, ctrl.remove);

module.exports = router;
