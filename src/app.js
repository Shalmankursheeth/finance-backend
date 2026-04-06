const express = require("express");
const app = express();
app.use(express.json());
const userRoutes = require("./routes/user.routes");
const transactionRoutes = require("./routes/transaction.routes");

app.use("/api/transactions", transactionRoutes);


app.use("/api/users", userRoutes);

app.get("/", (req, res) => {
  res.json({
    message: "Finance Backend API is running 🚀",
    endpoints: {
      auth: "/api/users",
      transactions: "/api/transactions",
      dashboard: "/api/dashboard"
    }
  });
});
const dashboardRoutes = require("./routes/dashboard.routes");

app.use("/api/dashboard", dashboardRoutes);

module.exports = app;
