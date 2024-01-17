const mongoose = require("mongoose");
const { Number, String, Decimal128 } = mongoose.Schema.Types;
const ProductSchema = new mongoose.Schema({
    productId: {
        type: String
    },
    name: {
        type: String
    },
    brand: {
        type: String
    },
    listDate: {
        type: Date
    },
    categories: {
        type: Array
    },
    inventory: {
        type: Number
    },
    ratings: {
        type: Decimal128
    },
    info: {
        type: String
    },
    price: {
        type: Decimal128
    },
});

const ProductModel = mongoose.model("ProductModel", ProductSchema);

module.exports = {
    ProductModel
}