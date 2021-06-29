# Everest Book API
## env file (optional)
Create env file with
```python
# Use your atlas URI
DB_URI=<URI_STRING>
```
### Run without env
change value of URI in **utils/dbCollection.js**


## Models
### Book Model
```javascript
{
    "title":"Book 1",
    "author":"Author 1",
    "isbn": "1234657891",
    "synopsis":"Book about Biscuits",
    "price":240
}
```

### Store Model
```javascript
{
    "username": "store2",
    "email": "store2@everest.com",
    "password": "12345",
    "location": "Patan",
    "inStore": "Book1, Book2, Book3",
    "manager": "Jenny Queen",
    "phone": "98XXXXXXX2"
}
```

### User Model
User Registration
```javascript
{
    "email": "user@mail.com",
    "password": "123456789"
}
```

