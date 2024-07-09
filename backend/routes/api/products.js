const express = require('express');
const router = express.Router();
const Products = require('../../models/Product');

router.get('/',  async (req, res) =>{
    res.send(await Products.find({}));
});

router.get('/:id', async (req, res) => {
    res.send(await Products.findOne({_id: req.params.id}));
});

module.exports = router;