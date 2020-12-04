module.exports = app => {
    const purchase = require("../controllers/purchase.controller.js");
    var multer = require('multer');

    // define storage and name of image for brand logo
    var storage = multer.diskStorage({
        destination: function(req, file, callback) {
            callback(null, 'uploads/');
        },
        filename: function(req, file, callback) {
            var re = /(?:\.([^.]+))?$/;
            callback(null, Math.floor((Math.random() * 10000) + 1).toString() + Date.now() + '.' + re.exec(file.originalname)[1]);
        }
    });

    // upload images in storage
    var upload = multer({
        storage: storage
    }).single('logoOfBrand');

    // create purchase
    app.post("/purchase/create", upload, purchase.create);
    // update purchase
    app.post("/purchase/update", upload, purchase.update);
    // get item list
    app.get("/Item/List", upload, purchase.itemList);
    // get purchase list
    app.get("/purchase/List", upload, purchase.purchaseList);
};