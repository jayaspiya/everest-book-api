const Book = require('../models/Book.js');
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
describe('Schema test for Book', () => {
    // Test for insert
    it('Test for insert book', () => {
        const book = {
            'title': 'Book 1',
            'author': 'Author 1',
            'isbn': "989123123",
            'synopsis': "Lorem Epsum",
            "price": 1000,
            "releasedYear": 2001
        };
        return Book.create(book)
            .then((book) => {
                expect(book.title).toEqual('Book 1');
            });
    });
    // Test for update
    it('Test for update book', async () => {
        return Book.findOneAndUpdate({ _id: Object('61508fc0a121a14cb76e2dfb') },
            { $set: { title: 'Book 2' } })
            .then((book) => {
                console.log(book)
                expect(book.title).toEqual('Book 2') 
            })
    });
    // Test for delete
    // it('Test for delete book', async () => {
    //     const status = await Book.deleteOne({ _id: Object('61508fe83881844f15a1bcd3') });
    //     expect(status.ok).toBe(1);
    // });
})