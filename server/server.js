const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const app = express();
const cors = require('cors');
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/auth.routes');
const path =  require('path');
// Importing the database configuration file to connect to the database
const connectDB = require('./database/db.config');
connectDB();


const _dirname = path.resolve();

app.use(cors({
    origin: true,
    credentials: true
}));

// Using the express.json() middleware to parse the incoming requests with JSON payloads
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.get("/", (req, res) => {
//     res.send("Hello World!");
// });

app.use("/api/auth", authRoutes);


app.use(express.static(path.join(_dirname, '/client/dist')));
app.get('*', (req, res) => {
  res.sendFile(path.resolve(_dirname, 'client' , 'dist', 'index.html'));
});
// Start the server on port 3000
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
