const { Mapping, Patient, Doctor } = require('../models');

// Assign a doctor to a patient
exports.createMapping = async (req, res) => {
  try {
    const { patient_id, doctor_id } = req.body;
    const mapping = await Mapping.create({ patient_id, doctor_id });
    res.status(201).json(mapping);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Retrieve all patient-doctor mappings
exports.getMappings = async (req, res) => {
  try {
    const mappings = await Mapping.findAll({
      include: [
        { model: Patient, attributes: ['name'] },
        { model: Doctor, attributes: ['name', 'specialty'] }
      ]
    });
    res.json(mappings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all doctors assigned to a specific patient
exports.getDoctorsByPatient = async (req, res) => {
  const { patient_id } = req.params;
  try {
    const mappings = await Mapping.findAll({
      where: { patient_id },
      include: [
        { model: Doctor, attributes: ['id', 'name', 'specialty', 'contact_info'] }
      ]
    });

    if (mappings.length === 0) {
      return res.status(404).json({ message: 'No doctors found for this patient' });
    }

    res.json(mappings.map(m => m.Doctor));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Remove a doctor from a patient
exports.deleteMapping = async (req, res) => {
  const { id } = req.params;
  try {
    const mapping = await Mapping.findByPk(id);
    if (!mapping) {
      return res.status(404).json({ message: 'Mapping not found' });
    }
    await mapping.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
