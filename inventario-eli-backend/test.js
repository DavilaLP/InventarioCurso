const assert = require("assert");

console.log("Iniciando pruebas de integridad del Backend...");

try {
  // 1. Modelos
  console.log("Verificando modelos...");
  require("./models/userModel");
  require("./models/productModel");
  require("./models/saleModel");
  require("./models/historyModel");
  require("./models/reportModel");
  require("./models/tokenModel");
  console.log("✔ Modelos cargados correctamente");

  // 2. Controladores
  console.log("Verificando controladores...");
  require("./controllers/userController");
  require("./controllers/productController");
  require("./controllers/saleController");
  require("./controllers/historyController");
  require("./controllers/reportController");
  require("./controllers/contactController");
  console.log("✔ Controladores cargados correctamente");

  // 3. Middlewares
  console.log("Verificando middlewares...");
  require("./middleWare/authMiddleware");
  require("./middleWare/errorMiddleware");
  console.log("✔ Middlewares cargados correctamente");

  // 4. Rutas
  console.log("Verificando rutas...");
  require("./routes/userRoute");
  require("./routes/productRoute");
  require("./routes/saleRoutes");
  require("./routes/historyRoutes");
  require("./routes/reportRoutes");
  require("./routes/contactRoute");
  console.log("✔ Rutas cargadas correctamente");

  console.log("\n==========================================");
  console.log("✔ TODAS LAS PRUEBAS DEL BACKEND PASARON CON ÉXITO");
  console.log("==========================================");
  process.exit(0);
} catch (error) {
  console.error("❌ ERROR EN LAS PRUEBAS DEL BACKEND:", error.message);
  process.exit(1);
}

