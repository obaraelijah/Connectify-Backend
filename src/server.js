const app = require('./app');
const mongoose = require('mongoose');
const config = require('./config/index');

// Connect to MongoDB Atlas
mongoose
  .connect(config.MONGODB_URI)
  .then(() => console.log('✅ Database connceted successfully '))
  .catch(err => console.log(`❌ Unable to connect MongoDB ${err}`));

const server = app.listen(config.PORT, () =>
  console.log(`Server started on port http://127.0.0.1:${config.PORT}/`),
);

// Ensures that unhandled Promise rejections are caught
process.on('unhandledRejection', error => {
  console.log(`❌ Unhandled Reject is closing the server  ${error}`);

  if (server) {
    server.close(() => {
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
});