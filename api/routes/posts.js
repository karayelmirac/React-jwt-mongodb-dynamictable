const router = require("express").Router();
const {productPosts, companyPosts } = require("../mockdata");
const authToken = require("../middleware/authenticateToken");

//posts/public
router.get("/public", (req, res) => {
  res.json(companyPosts);
});

router.get("/products", authToken, (req, res) => {
  res.json(productPosts);
});

router.get("/companies", authToken, (req, res) => {
  res.json(companyPosts);
});

module.exports = router;
