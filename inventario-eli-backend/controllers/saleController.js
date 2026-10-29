const Sale = require("../models/saleModel");
const Product = require("../models/productModel");
const History = require("../models/historyModel");

// --- REGISTRAR VENTA ---
const registerSale = async (req, res) => {
  const { items } = req.body;
  let total = 0;
  const saleItems = [];  

  for (const item of items) {
    const product = await Product.findById(item.productId);
    if (!product) return res.status(404).json({ msg: "Producto no encontrado" });
    if (Number(product.quantity) < Number(item.quantity))
      return res.status(400).json({ msg: `Stock insuficiente para ${product.name}` });

    // Descontar del stock
    product.quantity = String(Number(product.quantity) - Number(item.quantity));
    await product.save();

    // Registrar en Historial de Movimientos
    await History.create({
      product: product._id,
      action: "venta",
      user: req.user.id,
      details: `Se vendieron ${item.quantity} unidades. Stock restante: ${product.quantity}`,
    });

    saleItems.push({
      product: product._id,
      name: product.name,
      category: product.category,
      quantity: item.quantity,
      price: product.price,
    });
    total += product.price * item.quantity;
  }

  const sale = await Sale.create({
    items: saleItems,
    total,
    user: req.user.id
  });

  res.status(201).json(sale);
};

// --- HISTORIAL DE VENTAS ---
const salesHistory = async (req, res) => {
  const { from, to } = req.query;
  let filter = { user: req.user.id };
  if (from && to) {
    const fromDate = new Date(from);
    const toDate = new Date(to);
    toDate.setHours(23, 59, 59, 999);
    filter.date = { $gte: fromDate, $lte: toDate };
  }

  const sales = await Sale.find(filter)
    .populate("items.product", "name category price")
    .sort("-date");
  res.status(200).json(sales);
};

// --- BORRAR HISTORIAL DE VENTAS ---
const clearSalesHistory = async (req, res) => {
  await Sale.deleteMany({ user: req.user.id });
  res.status(200).json({ ok: true });
};

module.exports = { registerSale, salesHistory, clearSalesHistory };
