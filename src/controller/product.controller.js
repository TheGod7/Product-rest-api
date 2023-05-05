import { dirname, join } from "path";
import { fileURLToPath } from "url";

import { v4 } from "uuid";

import { Low } from "lowdb";
import { JSONFile } from "lowdb/node";

const __dirname = dirname(fileURLToPath(import.meta.url));
const file = join(__dirname, "..", "..", "Products.json");

const adapter = new JSONFile(file);

const db = new Low(adapter, { products: [] });

export const AllProducts = async (req, res) => {
  await db.read();

  const products = db.data.products;

  return res.status(202).json({ products });
};

export const productsFindById = async (req, res) => {
  const { id } = req.params;

  await db.read();

  const product = db.data.products.find((p) => p.id === id);

  return res.status(202).json({ product });
};

export const productsFindByName = async (req, res) => {
  const { name } = req.params;

  await db.read();

  const product = db.data.products.find((p) => p.name === name);

  return res.status(202).json({ product });
};

export const productsFilterByCategory = async (req, res) => {
  const { name } = req.params;

  await db.read();

  const products = db.data.products.filter((p) => p.category === name);

  return res.status(202).json({ products });
};

export const AddProduct = async (req, res) => {
  await db.read();

  const { name, price, description, category } = req.body;

  if (!name && !price && !description && !category) {
    return res.status(404).json({
      message: "Missing parameters name, price, description, category",
    });
  }

  if (isNaN(price)) {
    return res.status(404).json({
      message: "The price must be a number",
    });
  }

  let id = v4();

  db.data.products.push({
    id,
    name,
    price: parseFloat(price),
    description,
    category,
  });

  await db.write();

  res.status(202).json({
    message: "successfully added",
    product: {
      id: id,
      name: name,
      price: price,
      description: description,
      category: category,
    },
  });
};

export const DeleteProduct = async (req, res) => {
  await db.read();
  const { id } = req.params;

  if (!db.data.products.find((p) => p.id === id)) {
    res.status(404).json({ message: "Product doesn't exist" });
  }

  let productDelete = db.data.products.find((p) => p.id === id);

  db.data.products = db.data.products.filter((p) => p.id !== id);

  await db.write();

  res.status(202).json({ message: "Successfully deleted", productDelete });
};

export const EditProduct = async (req, res) => {
  await db.read();
  const { id } = req.params;
  const body = req.body;

  if (body.price && isNaN(body.price)) {
    return res.status(400).json({ message: "Invalid price" });
  }

  const ProductEdited = db.data.products.map((product) => {
    if (product.id === id) {
      return {
        ...product,
        name: body.name ? body.name : product.name,
        category: body.category ? body.category : product.category,
        price: body.price ? parseFloat(body.price) : product.price,
        description: body.description ? body.description : product.description,
      };
    } else {
      return product;
    }
  });

  db.data.products = ProductEdited;

  await db.write();

  res.status(202).json({
    message: "",
    product: db.data.products.find((p) => p.id === id),
  });
};
