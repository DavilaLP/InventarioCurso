const dotenv = require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const userRoute = require("./routes/userRoute");
const productRoute = require("./routes/productRoute");
const historyRoutes = require('./routes/historyRoutes');
const contactRoute = require("./routes/contactRoute");
const errorHandler = require("./middleWare/errorMiddleware");
const cookieParser = require("cookie-parser");
const path = require("path");
const saleRoutes = require("./routes/saleRoutes");
const reportRoutes = require("./routes/reportRoutes");
const app = express();

// MIDDLEWARES
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());

// CONFIGURACIÓN DINÁMICA DE CORS
const allowedOrigins = [
  'http://localhost:3000',
  'https://inventarioeli-app.vercel.app',
  process.env.FRONTEND_URL
].filter(Boolean);

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    if (
      allowedOrigins.includes(origin) ||
      origin.endsWith('.vercel.app') ||
      origin.includes('localhost')
    ) {
      return callback(null, true);
    }
    return callback(new Error('Bloqueado por CORS'));
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions));

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// RUTAS MIDDLEWARES 
app.use("/api/users", userRoute);
app.use("/api/products", productRoute);
app.use('/api/history', historyRoutes);
app.use("/api/sales", saleRoutes);
app.use("/api/reports", reportRoutes);
app.use("/api/contactus", contactRoute);

// RUTAS 
app.get("/", (req, res) => {
    res.send("Home Page");
});

// ERROR MIDDLEWARE
app.use(errorHandler);

// Conectando a base de datos e iniciar servidor
const PORT = process.env.PORT || 5001;

mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(PORT, () => {
            console.log(`server Corriendo en el puerto ${PORT}`);
        });
    })
    .catch((err) => console.log(err));
