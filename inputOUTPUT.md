expected input
```json
{
  "initialQuantity": 5,
  "product": {
    "id": 9479120978218,
    "title": "Congratulations Treat Gift Hamper",
    "handle": "congratulations-treat-gift-hamper",
    "price": 6500
  },
  "variant": {
    "id": 49252246978858,
    "title": "Default Title",
    "price": 6500,
    "image": null
  }
}
```

expected output
```json
[
  {
    "sku": "SKU",
    "quantity": "2",
    "recipientsName": "Mike Martel",
    "companyName": "Keetrax",
    "streetName": "Test Street",
    "suburbName": "Burpengary",
    "state": "QLD",
    "postalCode": "4505",
    "country": "",
    "email": "mike@keetrax.com",
    "phone": "0123456789",
    "personalisedGiftCardMessage": "Personal gift message",
    "shipping": 14.95
  },
  {
    "sku": "SKU",
    "quantity": "1",
    "recipientsName": "Mika the Cat",
    "companyName": "Cat Co.",
    "streetName": "Cat Road",
    "suburbName": "North Sydney",
    "state": "NSW",
    "postalCode": "2060",
    "country": "",
    "email": "mika@keetrax.com",
    "phone": "987654321",
    "personalisedGiftCardMessage": "Cat message",
    "shipping": 19.95
  }
]
```