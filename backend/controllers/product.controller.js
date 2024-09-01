const productModel = require("../model/product.model.js");
const GenericMethods = require("../model/generic.js");

const productMethods = new GenericMethods(productModel.ProductModel);

const indexController = async (req, res) => {
  const products = await productMethods.getAll();
  res.status(200).render("products", { products });
};

const renderCreateView = async (req, res) => {
  res.status(200).render("products/create");
};

const createProduct = async (req, res) => {
  const data = req.body;
  console.log("data:" + data);
  
  const t=await productMethods.create(data);
  console.log("product:"+t);
  
  res.status(200).redirect("/products");
};
//res.render(view [, locals] [, callback])

// const renderEditView = async (req, res) => {
//   const product = await productMethods.getById(req.params.id);
//   res.status(200).render("products/create", { product });
// };
const productDetails = async (req, res) => {
  try {
    const product = await productMethods.getById(req.params.id);
    res.status(200).render("products/create", { product });
  } catch (err) {
    console.error("Error retrieving product detail:", err);
    res.status(500).send("An error occurred while retrieving product details.");
  }
};
//products/details
const updateProduct = async (req, res) => {
  const data = req.body;
  await productMethods.update(req.params.id, data);
  res.status(200).redirect("/products");
};

const deleteProduct = async (req, res) => {
  try {
    await productMethods.delete(req.params.id);
    res.status(200).redirect("/products");
  } catch (err) {
    console.error("Error deleting product:", err);
    res.status(500).send("An error occurred while deleting the product.");
  }
}
module.exports = {
  indexController,
  renderCreateView,
  createProduct,
  updateProduct,
  productDetails,
  deleteProduct,
};