const Product = require('../models/product-model.js');

// Get all discounted products with sorting based on price or discountPrice
const getDiscountedProducts = async (req, res) => {
  try {
    const { sortBy = 'price', sortOrder = 'asc' } = req.query; // Get sort criteria from query parameters

    const discountedProducts = await Product.findDiscountedProducts(sortBy, sortOrder);
    res.json(discountedProducts); 
  } catch (error) {
    console.error(error);
    res.status(500).send('Error fetching discounted products');
  }
};

// Aggregate discounted products by discount amount and calculate total discount value
const getAggregatedDiscountedBags = async (req, res) => {
  
  
  try {
    const { price } = req.body;
    if (!price) {
      return res.status(400).json({ message: "Price is required" });
    }
    const aggregatedBags = await Product.aggregate([
      // Match only discounted products (where discountPrice exists and is lower than price)
      { $match: { price: { $gt: price } } },

      // Project the necessary fields and calculate the discount amount
      {
        $project: {
          name: 1,
          originalPrice: "$price",
          discountPrice: 1,
          discountAmount: { $subtract: ["$price", "$discountPrice"] }, // Calculate discount amount
        },
      },

      // Group by discount amount, calculate sum of total discounts
      {
        $group: {
          _id: "$discountAmount",
          totalDiscountValue: { $sum: "$discountAmount" },
          productCount: { $sum: 1 },
        },
      },

      // Optionally, sort by total discount value (descending)
      { $sort: { totalDiscountValue: -1 } },
    ]);

    res.status(200).json(aggregatedBags);
  } catch (error) {
    res.status(500).json({ message: "Error fetching aggregated discounted bags" });
  }
};

// Export both functions
module.exports = {
  getDiscountedProducts,
  getAggregatedDiscountedBags, // Ensure this is properly exported
};
