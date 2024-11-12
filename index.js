const express = require('express');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const goalRoutes = require('./routes/goalRoutes');
const partnerRoutes = require('./routes/partnerRoutes');
const errorHandler = require('./middleware/errorMiddleware');

require('dotenv').config();
connectDB();

const app = express();
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/goals', goalRoutes);
app.use('/api/partners', partnerRoutes);

app.use(errorHandler)

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));