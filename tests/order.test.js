const Order = require('../models/Order.js');
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
describe('Schema test for Order', () => {
    // Test for insert
    it('Test for insert order', () => {
        const order = {
            'user': '614fffd9cf75cf4068512b10',
            'status': 'pending',
            'orderOrder': [{bookId:"61508fc0a121a14cb76e2dfb", qty:10, price:100}]
        };
        return Order.create(order)
            .then((order) => {
                expect(order.status).toEqual('pending');
            });
    });
    // Test for update
    it('Test for update order', async () => {
        return Order.findOneAndUpdate({ _id: Object('61509377faf8715de6d33915') },
            { $set: { status: 'completed' } })
            .then((order) => {
                expect(order.status).toEqual('completed') 
            })
    });
    // Test for delete
    // it('Test for delete order', async () => {
    //     const status = await Order.deleteOne({ _id: Object('6150946dc914ea617a74cf23') });
    //     expect(status.ok).toBe(1);
    // });
})