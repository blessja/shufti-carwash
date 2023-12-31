const path = require('path');
const express = require('express');
const colors = require('colors');
const dotenv = require('dotenv').config();
const { errorHandler } = require('./middleware/errorMiddleware');
const connectDB = require('./config/db');
const cors = require('cors'); 

const carWashRoutes = require('./routes/carwashRoute');
const userRoutes = require('./routes/userRoutes');
const freewashRoutes = require('./routes/freewashRoutes');

const port = process.env.PORT || 5000;

connectDB();

const app = express();
const corsOptions = {
  origin: ['https://shufti-carwash.vercel.app', 'http://localhost:3000', 'https://www.shufti.co.za'],
};

app.use(cors(corsOptions));

// Increase the limit for request body size
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/carwashes', carWashRoutes);
app.use('/api/users', userRoutes);
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/carwash', require('./routes/carwashRoute'));
app.use('/api/staff', require('./routes/staffRoutes'));
app.use('/api/freewash', freewashRoutes);




// Serve frontend
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/build')));

  app.get('*', (req, res) =>
    res.sendFile(
      path.resolve(__dirname, '../', 'frontend', 'build', 'index.html')
    )
  );
} else {
  app.get('/', (req, res) => res.send('Please set to production'));
}

app.use(errorHandler);

app.listen(port, () => console.log(`Server started on port ${port}`));
