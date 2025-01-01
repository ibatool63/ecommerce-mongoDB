const express = require('express');
const router = express.Router();
const upload = require("../config/multer-config");
const productModel = require('../models/product-model');
const productController = require('../controllers/productController');

router.post("/create", upload.single("image"), async function(req, res){
    try { 
        let { name, price, discount, bgcolor, panelcolor, textcolor } = req.body;

        let product = await productModel.create({
            image: req.file.buffer,
            name, 
            price, 
            discount, 
            bgcolor, 
            panelcolor, 
            textcolor,
        });
        req.flash("success", "Product created successfully");
        res.redirect("/owners/admin");
    } catch (err) {
        res.send(err.message);
    }
});

// Define route for aggregated discounted products
router.get('/aggregated-discounted', productController.getAggregatedDiscountedBags);

// Define any other routes for discounted products if necessary
router.get('/discounted', productController.getDiscountedProducts);

module.exports = router;