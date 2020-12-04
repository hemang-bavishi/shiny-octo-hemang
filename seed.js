/**
 * Populate DB with sample data on server start
 */
// Insert seed models below
var Item = require('./app/models/Item');

var itemData = [
    { name: 'Bread', price: '$30' },
    { name: 'Meat', price: '$50' },
    { name: 'Pasta', price: '$10' },
    { name: 'Rice', price: '$14' },
    { name: 'Apricots', price: '$90' },
    { name: 'Prunes', price: '$70' },
    { name: 'Seafood', price: '$40' },
];

Item.find({}, function(error, docs) {
    if (docs.length == 0) {
        Item.insertMany(itemData, function(error, docs) {
            if (error) {
                console.log("Error creating Item : " + err);
            }
        })
    }
});