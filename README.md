# express-rest-api-lowdb

This is a boilerplate for building a RESTful API using Express.js and LowDB as a database.

## Getting Started

1. Clone the repository:

```bash
git clone https://github.com/TheGod7/Product-rest-api.git
```

2. Install all dependencies:

```bash
npm install
```

The server will be running at `http://localhost:3000`.

## Usage

This boilerplate includes CRUD endpoints for a simple `products` resource:

- `GET /products`: Get all products.
- `GET /products/id/:id`: Get a single product by ID.
- `GET /products/name/:id`: Get a single product by name.
- `POST /products/add`: Create a new product.
- `PUT /products/edit/:id`: Update a product by ID.
- `DELETE /products/delete/:id`: Delete a product by ID.

## Example

To create a new product, send a POST request to `http://localhost:3000/products/add` with the following JSON payload:

```json
{
  "name": "iPhone 13",
  "category": "Electronics",
  "price": 999,
  "description": "The latest iPhone with A15 Bionic chip and 5G support."
}
```

You should receive a response with the newly created product:

```json
{
  "id": "d9bf9e8f-b36d-4b7d-98d8-4398fa122c95",
  "name": "iPhone 13",
  "category": "Electronics",
  "price": 999,
  "description": "The latest iPhone with A15 Bionic chip and 5G support."
}
```
