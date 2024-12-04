const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const path = require("path");
const ownersRouter = require("./routes/ownersRouter");
const productsRouter = require("./routes/productsRouter");
const usersRouter = require("./routes/usersRouter");
//const bcrypt = require('bcrypt');
//const jwt = require("jsonwebtoken");

const db = require("./config/mongoose-connection");

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");

app.use("/owners", ownersRouter);
app.use("/products", productsRouter);
app.use("/users", usersRouter);

app.get('/', (req, res) => {
    res.render("index");
});

app.listen(3000);