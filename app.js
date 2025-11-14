const express = require('express');
const cors = require('cors');
const { connectDB, sequelize } = require('./config/db');
require('dotenv').config();

const authRoutes = require('./routes/auth');
const patientRoutes = require('./routes/patients');
const doctorRoutes = require('./routes/doctors');
const mappingRoutes = require('./routes/Mappings'); // fix: use lowercase as per filename

const app = express();
app.use(cors());
app.use(express.json());

// Connect to database
connectDB();

// Route middleware
app.use('/api/auth', authRoutes);
app.use('/api/patients', patientRoutes);
app.use('/api/doctors', doctorRoutes);
app.use('/api/mappings', mappingRoutes);

// Root health check
app.get('/', (req, res) => res.send('API Running'));

// Sync database and start server
const PORT = process.env.PORT || 5000;
sequelize.sync()
  .then(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((error) => {
    console.error('Error syncing database:', error);
  });
