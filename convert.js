const fs = require("fs");
const { Parser } = require("json2csv");
const PDFDocument = require("pdfkit");

// Sample JSON data
const jsonData = JSON.parse(fs.readFileSync("nameDatabase.json"));

// Step 1: Convert JSON to CSV
const jsonToCSV = (data) => {
  const parser = new Parser();
  return parser.parse(data);
};

// Step 2: Convert CSV to PDF
const csvToPDF = (csv, outputPath) => {
  const doc = new PDFDocument();
  doc.pipe(fs.createWriteStream(outputPath));

  doc.fontSize(12).text(csv, {
    width: 500,
    align: "left",
  });

  doc.end();
};

// Combine steps
const convertJsonToCsvToPdf = () => {
  const csv = jsonToCSV(jsonData);
  fs.writeFileSync("output.csv", csv); // optional: to save CSV
  csvToPDF(csv, "output.pdf");
};

convertJsonToCsvToPdf();
