const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const fs = require("fs");
const XLSX = require("xlsx");
const path = require("path");

// const { aggregate } = require('./models/user');
// const userRoutes = require('./routes/userRoutes');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

 const convertExcelToJson = (filePath) => {
    // Read the .xlsx file
    const workbook = XLSX.readFile(filePath);
  
    // Get the first sheet (or specify sheet name like workbook.Sheets['Sheet1'])
    const sheetName = workbook.SheetNames[0]; // Gets the first sheet name
    const sheet = workbook.Sheets[sheetName];  // Get the actual sheet object
  
    // Convert the sheet into JSON
    const jsonData = XLSX.utils.sheet_to_json(sheet);
  
    return jsonData;
  };
  
  // Example: Path to your Excel file
  const excelFilePath = "public/family_financial_and_transactions_data (1).xlsx";

  const jsonData = convertExcelToJson(excelFilePath);

  
  // Optionally, write the JSON data to a file
  fs.writeFileSync("output.json", JSON.stringify(jsonData, null, 2));
  
  
// Routes
const transactionRoutes = require('./routes/transactions');
const familyRoutes = require('./routes/family');

dotenv.config(); // Load environment variables from .env

const app = express();
mongoose.connect("mongodb+srv://205121092someshharsule:8eaTei0x28Hk0HZe@test-pro-db.vmckx.mongodb.net/?retryWrites=true&w=majority&appName=test-pro-db")
const UserSchema=new mongoose.Schema({ 
    name : String,
    age : Number
 })
const UserModel=mongoose.model("users",UserSchema)


app.use(express.json());
app.use(bodyParser.json());
app.use(cors());


// Connect to MongoDB

// Define a test route
app.get('/', (req, res) => {
  res.send('Welcome to the Express server connected to MongoDB!');
});

 // load index file to upload file on http://localhost:3000/

// API Routes
app.use('/api/transactions', transactionRoutes);
app.use('/api/family', familyRoutes);
// Start the server 


app.listen(3000, () => {
  console.log(`Server is running on http://localhost:3000`);
});
