const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const {
  getAllBikes,
  getBikeById,
  addBike,
  editBike,
  deleteBike,
  getBikesByUser
} = require('../controllers/bikeController');

router.get('/user', auth, getBikesByUser);
router.get('/', getAllBikes);
router.get('/:id', getBikeById);
router.post('/', auth, addBike);
router.put('/:id', auth, editBike);
router.delete('/:id', auth, deleteBike);


module.exports = router;
