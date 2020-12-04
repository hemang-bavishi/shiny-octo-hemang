const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Purchaseschema = new Schema({
    brand: { type: String, required: true },
    logoOfBrand: { type: String, required: true },
    amount: { type: String, required: true },
    type: { type: String, required: true },
    location: { type: String, required: true },
    isDeleted: { type: Boolean, default: false },
    items: [{ type: Schema.Types.ObjectId, ref: 'Item' }]

}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } })

module.exports = mongoose.model('Purchases', Purchaseschema)