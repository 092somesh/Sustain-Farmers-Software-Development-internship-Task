const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const Transaction = require('../models/Transaction');
const fs = require("fs");
const XLSX = require("xlsx");
const path = require("path");
  /** Method to handle the form submit */


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

  // Optionally, write the JSON data to a file
   
router.get('/add', async (req, res) => {
    try {
      // Get JSON data from the request body
      const transactions =  convertExcelToJson(excelFilePath);
      console.log(transactions)
      // Save data into MongoDB
      const savedTransactions = await Transaction.insertMany(transactions);
  
      res.status(201).json({
        message: "Transactions saved successfully",
        data: savedTransactions,
      });
    } catch (error) {
      console.error("Error saving transactions:", error);
      res.status(500).json({ message: "Failed to save transactions", error });
    }
  });

// Get Transactions by Family
router.post('/family-transactions', async (req, res) => {
  const { familyId } = req.body;
  try {
    const transactions = await Transaction.find({ familyId });
    res.status(200).json({ success: true, transactions });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;
