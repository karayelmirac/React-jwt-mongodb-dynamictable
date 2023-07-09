const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  product_name: String,
  product_category: String,
  product_amount: String,
  amount_unit: String,
  Company: String,
});

let ProductMongo = mongoose.model("products", ProductSchema);

module.exports = ProductMongo;
