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

### Store Model
Store Registration
```json
{
    "email": "store2@everest.com",
    "password": "12345",

}
```
Store Login
```json
{
    "email": "store2@everest.com",
    "password": "12345"
}
```
