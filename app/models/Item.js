const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Itemschema = new Schema({
    name: { type: String, default: '' },
    price: { type: String, default: '' },
    logo: { type: String, default: '' },
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } })


module.exports = mongoose.model('Item', Itemschema)