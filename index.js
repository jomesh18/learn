const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const Product = require('./models/product.model.js');


const app = express();
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World');
});

mongoose.connect(process.env.MONGO_URI)
.then(() => {
    console.log("Connected to db");
    app.listen(3000, () => console.log('App listening on port 3000'));
})
.catch(()=> console.log("Connection failed"));

app.post('/api/product', async (req, res) => {
    try {
        let product = await Product.create(req.body);
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

app.get('/api/products', async (req, res) => {
    try {
        let products = await Product.find({});
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

app.put('/api/product/:id', async (req, res) => {
    try {
        let { id } = req.params;
        let product = await Product.findByIdAndUpdate(id, req.body);
        if (!product){
            return res.json({ message: "Error"});
        }
        updatedProduct = await Product.findById(id);
        res.status(200).json(updatedProduct);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

app.delete('/api/product/:id', async (req, res) => {
    try {
        let { id } = req.params;
        let product = await Product.findByIdAndDelete(id);
        if (!product){
            return res.json({messsage: "Error"});
        }
        console.log('deleted product is', product);
        res.status(200).json({message: "Deleted successfully"});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});