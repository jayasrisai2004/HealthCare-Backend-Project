const express = require('express');
const {
  createMapping,
  getMappings,
  getDoctorsByPatient,
  deleteMapping
} = require('../controllers/MappingController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', protect, createMapping);
router.get('/', protect, getMappings);
router.get('/:patient_id', protect, getDoctorsByPatient);
router.delete('/:id', protect, deleteMapping);

module.exports = router;
