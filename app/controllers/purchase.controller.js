const Purchases = require('../models/Purchases.js');
const Item = require('../models/Item.js');
var _ = require('lodash');


// Create purchase
exports.create = async (req, res) => {
    try {
        if (req.file) {
            req.body.logoOfBrand = req.file.filename
        }

        const newPurchase = new Purchases(req.body)
        await newPurchase.save((err, data) => {
            if (err) {
                res.status(400).send({
                    message: err.message || "Some error occurred while creating purchase."
                });
            } else res.send(newPurchase)
        })
    } catch (err) {
        res.status(400).send({
            message: err.message || "Some error occurred while creating purchase."
        });
    }
}

// Update purchase
exports.update = async (req, res) => {
    try {
        let id = req.params.id
        if (!id) {
            id = req.body._id
        }
        if (req.body._id) {
            delete req.body._id
        }
        const things = await Purchases.findOne({ _id: id })

        if (!things) {
            res.status(404).send({
                message: "Data not found"
            });
        }

        if (req.file) {
            req.body.logoOfBrand = req.file.filename
        }

        let updated = _.assign(things, req.body)

        if (!updated) {
            res.status(404).send({
                message: "Data not found"
            });
        }
        updated.save()
        res.send(updated)

    } catch (error) {
        res.status(400).send({
            message: err.message || "Some error occurred while updating purchase."
        });
    }
}

// List of purchase based on filter and sort
exports.purchaseList = async (req, res) => {
    try {
        let mongoQuery = { "isDeleted": false };
        let query = req.query;
        let skip = 0;
        let limit = 10;
        for (var key in query) {
            if (key == "brand") {
                mongoQuery['brand'] = query[key];
            } else if (key == "type") {
                mongoQuery['type'] = query[key];
            } else if (key == "location") {
                mongoQuery['location'] = query[key];
            } else if (key == "start") {
                skip = parseInt(query[key]);
            } else if (key == "end") {
                limit = parseInt(query[key]) - skip + 1;
            }
        }

        let purchaseData = await Purchases.find(mongoQuery).populate('items').sort({ brand: -1 }).skip(skip).limit(limit);

        if (purchaseData.length > 0) {
            res.send(purchaseData)
        } else {
            res.send({ message: 'Data not found' })
        }
    } catch (err) {
        res.status(400).send({
            message: err.message || "Some error occurred while fething purchase list."
        });
    }
}


// List of items
exports.itemList = async (req, res) => {
    try {
        let itemData = await Item.find({});
        if (itemData.length > 0) {
            res.send(itemData)
        } else {
            res.send({ message: 'Data not found' })
        }
    } catch (err) {
        res.status(400).send({
            message: err.message || "Some error occurred while fething item list."
        });
    }
}