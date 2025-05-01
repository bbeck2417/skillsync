const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB Connected');
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
// This code connects to a MongoDB database using Mongoose. It exports a function that attempts to connect to the database and logs the result. If the connection fails, it logs the error and exits the process with a failure code.
// The connection string is stored in an environment variable (MONGO_URI) for security reasons. The function is typically called in the main server file to establish the database connection when the server starts.
// The code uses async/await syntax for better readability and error handling. If the connection is successful, it logs "MongoDB Connected" to the console. If an error occurs, it logs the error message and exits the process with a failure code (1).
// This is a common pattern in Node.js applications to ensure that the application does not continue running if the database connection fails, as it would likely lead to further errors down the line.