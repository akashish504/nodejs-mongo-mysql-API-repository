const { ProductModel } = require('./model');

const listAllProducts = async (req,res) => {
    try {
        const result = await ProductModel.find();
        return res.status(200).send({status:"ok", data: [...result]} );
    } catch (error) {
        console.log(error)
        return res.status(500).send({error: "Something went wrong."});
    }
}


const getProductInfo = async (req,res) => {
    try {
        const result = await ProductModel.find({...req.query});
        return res.status(200).send({status:"ok", data: [...result]} );
    } catch (error) {
        console.log(error)
        return res.status(500).send({error: "Something went wrong."});
    }
}

const addNewProduct = async (req,res) => {

    const product = new ProductModel(req.body);

    try {
        await product.save();
        return res.status(200).send({status:"ok", message: "Data saved successfully."});
    } catch (error) {
        console.log(error)
        return res.status(500).send({error: "Something went wrong."});
    }
}

module.exports = {
    listAllProducts,
    addNewProduct,
    getProductInfo
}
