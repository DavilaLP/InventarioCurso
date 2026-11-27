/**
 * Valida la lista de ítems de una venta antes de procesar el stock.
 * Rechaza listas vacías o cantidades menores o iguales a cero.
 */
const validateSaleItems = (items) => {
  if (!Array.isArray(items) || items.length === 0) {
    return { valid: false, msg: "La venta debe incluir al menos un producto" };
  }

  for (const item of items) {
    if (!item || !item.productId) {
      return { valid: false, msg: "Cada producto de la venta requiere un productId válido" };
    }
    const qty = Number(item.quantity);
    if (!Number.isFinite(qty) || qty <= 0) {
      return { valid: false, msg: "La cantidad vendida debe ser un número mayor a 0" };
    }
  }

  return { valid: true };
};

/**
 * Calcula el stock restante tras una venta validando disponibilidad.
 */
const calculateRemainingStock = (currentStock, soldQuantity) => {
  const stock = Number(currentStock);
  const qty = Number(soldQuantity);

  if (!Number.isFinite(stock) || stock < qty) {
    return { ok: false, remaining: null };
  }

  return { ok: true, remaining: String(stock - qty) };
};

/**
 * Calcula el subtotal de un ítem vendido.
 */
const calculateItemSubtotal = (price, quantity) => {
  return Number(price) * Number(quantity);
};

module.exports = {
  validateSaleItems,
  calculateRemainingStock,
  calculateItemSubtotal,
};
