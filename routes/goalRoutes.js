const express = require('express');
const { createGoal, getGoal, getGoals, updateGoalById, deletePostById } = require('../controllers/goalController');
const router = express.Router();
const auth = require('../middleware/authMiddleware');

router.post('/', auth, createGoal);
router.get('/', auth, getGoals);
router.get('/:id', auth, getGoal);
router.put('/:id', auth, updateGoalById);
router.delete('/:id', auth, deletePostById);

module.exports = router;
