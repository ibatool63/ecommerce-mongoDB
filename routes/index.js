const express = require('express');
const router = express.Router();
const isLoggedIn = require("../middlewares/isLoggedIn");
const productModel = require("../models/product-model");
const userModel = require("../models/user-model");

router.get("/", function (req, res) {
    let error = req.flash("error");
    res.render("index", { error, isLoggedIn: false }); 
});

router.get('/shop', isLoggedIn, async (req, res) => {
    try {
        const product = await productModel.find(); 
        let success = req.flash("success");
        res.render("shop", { products: product, success });
    } catch (error) {
        res.status(500).send("Error fetching products: " + error.message);
    }
});

router.get("/cart", isLoggedIn, async (req, res) => {
    let user = await userModel.findOne({email: req.user.email}).populate("cart");  
    const bill = Number(user.cart[0].price) + 20 - Number(user.cart[0].discount);
    res.render("cart", { user, bill });
});

router.get("/addtocart/:productid", isLoggedIn, async (req, res) => {
    let user = await userModel.findOne({email: req.user.email});
    user.cart.push(req.params.productid);
    await user.save();
    req.flash("success", "Added to cart successfully");
    res.redirect("/shop");
});

router.get("/logout", isLoggedIn, function (req, res){
    res.render("shop");
});


module.exports = router;
