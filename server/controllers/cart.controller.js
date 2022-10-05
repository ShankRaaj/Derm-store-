const express = require('express')
const cartmodel = require('../models/cart.model')
const cart = express.Router();


//to get cart data url 

cart.get('/', async (req, res) => {
try {
    const cartdata = await cartmodel.find();
    res.status(200).send(cartdata)
} catch (error) {
    res.status(404).send(error.message);
}
})

cart.post('/', async (req, res) => {
    try {
        const getdata = req.body;

        const cartdata =  cartmodel( getdata );
        await cartdata.save()
        res.status(200).send(cartdata)
    } catch (error) {
        res.status(404).send(error.message);
    }
})

cart.patch('/inc/:id', async (req, res) => {
    try {
        const {id} = req.params;

        const cartdata = await cartmodel.findOneAndUpdate({ id: id },  { $inc: { quantity: 1} },{new:true});
       await cartdata.save()
        res.status(200).send(cartdata)
    } catch (error) {
        res.status(404).send(error.message);
    }
})
cart.patch('/dec/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const cartdata = await cartmodel.findOneAndUpdate({ id: id }, { $inc: { quantity: -1 } }, { new: true });
        await cartdata.save()
        res.status(200).send(cartdata)
    } catch (error) {
        res.status(404).send(error.message);
    }
})



cart.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const cartdata = await cartmodel.findOneAndDelete({ _id: id });
        await cartdata.save();
        res.status(200).send(cartdata)
    } catch (error) {
        res.status(404).send(error.message);
    }
})
cart.get('/count', async (req, res) => {
    try {
        

        const cartdata = await cartmodel.countDocuments();
       console.log(cartdata);
        res.send( count = cartdata.toString() ).status(200)
    } catch (error) {
        res.status(404).send(error.message);
    }
})

module.exports = cart;