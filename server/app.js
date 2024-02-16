// import modules
const express = require("express");
const { json, urlencoded } = express;
const mongoose = require("mongoose");
const morgan = require("morgan");
const cors = require("cors");
require("dotenv").config();
const cookieParser = require("cookie-parser");
const expressValidator = require("express-validator");

// app
const app = express();

// db
const dbConnection = mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on('error', (err) => {
  console.error('MongoDB connection error:', err.message);
});

dbConnection.then(() => console.log('DB CONNECTED')).catch((err) => console.error('DB CONNECTION ERROR', err));

// Global error handler for unhandled promise rejections
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
  // Handle the error, log it, or perform cleanup here
});

// Global error handler for uncaught exceptions
process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
  // Handle the error, log it, or perform cleanup here
  process.exit(1); // Exit the process due to uncaught exception
});

// ... (rest of the code)


// middleware
app.use(morgan("dev"));
app.use(cors({ origin: true, credentials: true }));
app.use(json());
app.use(urlencoded({ extended: false }));
app.use(cookieParser());
app.use(expressValidator());

// routes
const userRoutes = require("./routes/user");
app.use("/", userRoutes);

// port
const port = 3000;

// listener
const server = app.listen(port, () =>
	console.log(`Server is running on port ${port}`)
);
