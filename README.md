# Everest Book API

## Models
- review, order

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
```json
{
    "title":"Book 1",
    "author":"Author 1",
    "isbn": "1234657891",
    "synopsis":"Book about Biscuits",
    "price":240
}
```

### Store Model
Store Registration
```json
{
    "email": "store2@everest.com",
    "password": "12345",
    "location": "Patan",
    "manager": "Jenny Queen"
}
```
Store Login
```json
{
    "email": "store2@everest.com",
    "password": "12345"
}
```
