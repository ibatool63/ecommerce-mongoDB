const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    fullname: {
        type: String,
        minLength: 3,
        trim: true,
    },
    email: String,
    password: String,
    cart: [
        {
        type: mongoose.Schema.Types.ObjectId,
        ref: "product",
        },
    ],
    orders: {
        type: Array,
        default: [],
    },
    picture: String,
    contact: Number,
});

module.exports = mongoose.model("user", userSchema);