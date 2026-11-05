# E-commerce import


### Categories import
[Official Documentation](https://developers.mailerlite.com/ecommerce/import#categories-import)

---
```javascript
const requestBody = [
  { name: "Hats" }
];

mailerlite.ecommerce.import.importCategories("SHOP_ID", requestBody)
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    if (error.response) console.log(error.response.data);
  });
```

### Customers import
[Official Documentation](https://developers.mailerlite.com/ecommerce/import#customers-import)

---
```javascript
const requestBody = [
  { email: "customer@example.com" }
];

mailerlite.ecommerce.import.importCustomers("SHOP_ID", requestBody)
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    if (error.response) console.log(error.response.data);
  });
```

### Products import
[Official Documentation](https://developers.mailerlite.com/ecommerce/import#products-import)

---
```javascript
const requestBody = [
  { name: "Red T-shirt", price: 19.99 }
];

mailerlite.ecommerce.import.importProducts("SHOP_ID", requestBody)
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    if (error.response) console.log(error.response.data);
  });
```

### Orders import
[Official Documentation](https://developers.mailerlite.com/ecommerce/import#orders-import)

---
```javascript
const requestBody = {
  orders: [
    {
      customer: { email: "customer@example.com" },
      cart: { items: [{ ecommerce_product_id: "PRODUCT_ID", quantity: 1 }] }
    }
  ]
};

mailerlite.ecommerce.import.importOrders("SHOP_ID", requestBody)
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    if (error.response) console.log(error.response.data);
  });
```
