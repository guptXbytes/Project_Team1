const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const passwordRoutes = require('./routes/passwordRoutes');
const { errorHandler, notFoundHandler } = require('./middleware/errorMiddleware');

const app = express();
const PORT = process.env.PORT || 3000;
// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());
// Rate limiting - 100 requests per 15 minutes per IP
const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
     max: 100,
	message: {
    error: 'Too many requests from this IP, please try again later.'
  }
});
app.use('/api/', limiter);
// Routes
app.use('/api', passwordRoutes);
// Error handling middleware
app.use(errorHandler);
// 404 handler
app.use('*', notFoundHandler);
// Start server
app.listen(PORT, () => {
 console.log(Password Generator API running on port ${PORT});
  console.log(Health check: http://localhost:${PORT}/api/health);
	   console.log('\nAvailable endpoints:');
  console.log('  GET  /api/health');
	   console.log('  POST /api/generate');
  console.log('  POST /api/generate-batch');
	 console.log('  POST /api/check-strength');
  console.log('  GET  /api/character-sets');
	console.log('  POST /api/generate-passphrase');
});

module.exports = app;
