const express = require('express')
const joi = require('joi');
const mongoose = require('mongoose');
const router = express.Router();

const categorySchema = new mongoose.Schema({
    name : { type : String, required: true, minLength: 3, maxLength: 30 }
})

const Category = mongoose.model('category', categorySchema);

router.get('/categories', async (req, res)=> {
    let categories = await Category.find();
    res.send(categories);
})

router.post('/category', async( req, res )=> {
    const { error } = validateData(req.body);
    if( error ) res.status(400).send(error.details[0].message)
    const category = new Category({
       name: req.body.name 
    })
    await category.save();
    res.send(category);
})

router.put('/category/:id', async( req, res )=> {
    const { error } = validateData(req.body);
    if( error ) res.status(400).send(error.details[0].message)
    const category = await Category.findById(req.params.id, { name: req.body.name });
    if (!category) return res.status(404).send('The Category with the given Id invalid !!');
    await category.save();
    res.send(category);
})

router.delete('/category/:id', async( req, res )=> {
    const category = Category.findByIdAndDelete(req.params.id);
    if (!category) return res.status(404).send('The Category with the given Id invalid !!');
    res.send(category);
})

function validateData(category) {
    const schema = joi.object({
        name: joi.string().min(3).max(30).required()
    });
    return schema.validate(category);
}

module.exports = router;