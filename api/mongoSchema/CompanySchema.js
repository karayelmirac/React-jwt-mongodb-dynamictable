const mongoose = require("mongoose");

const CompanySchema = new mongoose.Schema({
  company_name: String,
  company_legal_number: String,
  incorporation_country: String,
  Website: String,
});

let CompanyMongo = mongoose.model("companies", CompanySchema);

module.exports = CompanyMongo;
