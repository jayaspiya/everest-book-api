const User = require('../models/User.js');
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
describe('Schema test for User', () => {
    // Test for insert
    it('Test for insert user', () => {
        const user = {
            'email': 'user@everest.com',
            'password': '123456'
        };
        return User.create(user)
            .then((user) => {
                expect(user.email).toEqual('user@everest.com');
            });
    });
    // Test for update
    it('Test for update user', async () => {
        return User.findOneAndUpdate({ _id: Object('6150921af667975992822951') },
            { $set: { email: 'user2@everest.com' } })
            .then((user) => {
                expect(user.email).toEqual('user2@everest.com') 
            })
    });
    // Test for delete
    // it('Test for delete user', async () => {
    //     const status = await User.deleteOne({ _id: Object('615094215a2b756028e8bddd') });
    //     expect(status.ok).toBe(1);
    // });
})