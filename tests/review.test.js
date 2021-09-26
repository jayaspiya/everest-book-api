const Review = require('../models/Review.js');
const mongoose = require('mongoose');
// Establish a connection before test start
beforeAll(async () => {
    await mongoose.connect("mongodb+srv://student210276:student210276@softwarica.emril.mongodb.net/everest-testing", {
        useNewUrlParser: true,
        useCreateIndex: true
    });
});
// Close connection after test end
afterAll(async () => {
    await mongoose.connection.close();
});
describe('Schema test for Review', () => {
    // Test for insert
    it('Test for insert review', () => {
        const review = {
            'user': '6150921af667975992822951',
            'book': '61508fc0a121a14cb76e2dfb',
            "description": "Great",
            "rating": 3
        };
        return Review.create(review)
            .then((review) => {
                expect(review.rating).toEqual(3);
            });
    });
    // Test for update
    it('Test for update review', async () => {
        return Review.findOneAndUpdate({ _id: Object('61509376e7e8815dec11e1fe') },
            { $set: { rating: 4 } })
            .then((review) => {
                expect(review.rating).toEqual(4) 
            })
    });
    // Test for delete
    // it('Test for delete review', async () => {
    //     const status = await Review.deleteOne({ _id: Object('6150946da64081617ba0f90b') });
    //     expect(status.ok).toBe(1);
    // });
})