const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");
const { productPosts, companyPosts } = require("./mockdata");
const CompanyMongo = require('./mongoSchema/CompanySchema')
const ProductMongo = require('./mongoSchema/ProductSchema')

app.use(express.json());
app.use(cors());
app.use("/auth", require("./routes/auth"));
app.use("/posts", require("./routes/posts")); // posts/public

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("database connected"))
  .catch((err) => console.log("error" + err));



CompanyMongo.createIndexes();
ProductMongo.createIndexes();

// take company and push mockdata.
app.post("/newcompanies", async (req, resp) => {
  try {
    const company = new CompanyMongo(req.body);
    let result = await company.save();
    result = result.toObject();
    companyPosts.push(result);
    if (result) {
      resp.send(req.body);
    } else {
    }
  } catch (e) {
    resp.send("Something Went Wrong");
  }
});

// take product and push mockdata.
app.post("/newproduct", async (req, resp) => {
  try {
    const product = new ProductMongo(req.body);
    let result = await product.save();
    result = result.toObject();
    productPosts.push(result);
    if (result) {
      resp.send(req.body);
    } else {
    }
  } catch (e) {
    resp.send("Something Went Wrong");
  }
});

// delete product
app.post("/deleteproduct", async (req, resp) => {
  try {
    const product = new ProductMongo(req.body);
    let result = await product.save();
    result = result.toObject();

    if (result) {
      resp.send(req.body);
    } else {
    }
  } catch (e) {
    resp.send("Something Went Wrong");
  }
});

app.listen(5000, () => {
  console.log("Listening on port 5000");
});
