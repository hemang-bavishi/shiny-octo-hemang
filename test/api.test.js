const request = require("supertest")("http://localhost:3000");
const expect = require("chai").expect;

describe("GET /purchase/List", function() {
    it("returns all purchases", async function() {
        const response = await request.get("/purchase/List");
        expect(response.status).to.eql(200);
    });
});

describe("POST /purchase/create", function() {
    it("create purchase", async function() {
        const response = await request
            .post("/purchase/create")
            .send({
                "brand": "Article TWo",
                "amount": "200",
                "type": "Grocery",
                "location": "Dubai"
            });
        expect(response.status).to.eql(200);
    });
});

describe("POST /purchase/create", function() {
    it("update purchase", async function() {
        const response = await request
            .post("/purchase/create")
            .send({
                "brand": "Article TWo",
                "amount": "200",
                "type": "Grocery",
                "location": "Dubai",
                "_id": "5fc9edb30a73d41bb43dadca" // purchase id
            });
        expect(response.status).to.eql(200);
    });
});

describe("GET /Item/List", function() {
    it("returns all purchases", async function() {
        const response = await request.get("/Item/List");
        expect(response.status).to.eql(200);
    });
});