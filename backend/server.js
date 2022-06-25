const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const ProductRoute = require("./routes/productRoute");
const OrderRoute = require("./routes/orderRoute");
const cors = require('cors')


//Conexion con la base de datos

let url = "mongodb://localhost/reactPos";
//let url = `mongodb+srv://jairo:${asd}@cluster0.9famd5y.mongodb.net/?retryWrites=true&w=majority`;
mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
})
let db = mongoose.connection;
db.on('open', (res) => console.log("CONECTADO"));
db.on('error', (e) => console.log(e));

//Middleware
app.use(cors());
app.use(bodyParser.json());
app.use("/product", ProductRoute);
app.use("/order", OrderRoute);
app.use("/", (req, res) => {
    res.send("Funciona")
})

//Puerto
let port = 8000;
app.listen(process.env.PORT || port, () => {
    console.log(`Escuchando al puerto ${port}`);
});
