const { initializeDb } = require("./db/db.connect");

const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

initializeDb();

const authRoutes = require("./routes/auth.routes");
const orderRoutes = require("./routes/order.routes");
const productRoutes = require("./routes/product.routes");
const userRoutes = require("./routes/user.routes");
const addressRoutes = require("./routes/address.routes");

app.use("/auth", authRoutes);
app.use("/orders", orderRoutes);
app.use("/products", productRoutes);
app.use("/users", userRoutes);
app.use("/address", addressRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
