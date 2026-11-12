# E-commerce orders


### Get orders
[Official Documentation](https://developers.mailerlite.com/ecommerce/orders#get-orders)

---
```javascript
const params = {
  filter: {
    attributed: true
  }
};

mailerlite.ecommerce.orders.get("SHOP_ID", params)
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    if (error.response) console.log(error.response.data);
  });
```

### Fetch an order
[Official Documentation](https://developers.mailerlite.com/ecommerce/orders#fetch-an-order)

---
```javascript
mailerlite.ecommerce.orders.find("SHOP_ID", "ORDER_ID")
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    if (error.response) console.log(error.response.data);
  });
```

### Create an order
[Official Documentation](https://developers.mailerlite.com/ecommerce/orders#createupdate-order)

---
```javascript
const requestBody = {
  customer: { email: "customer@example.com" },
  cart: { items: [{ ecommerce_product_id: "PRODUCT_ID", quantity: 1, price: 19.99 }] },
  status: "complete"
};

mailerlite.ecommerce.orders.create("SHOP_ID", requestBody)
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    if (error.response) console.log(error.response.data);
  });
```

### Update an order
[Official Documentation](https://developers.mailerlite.com/ecommerce/orders#createupdate-order)

---
```javascript
const requestBody = {
  status: "complete"
};

mailerlite.ecommerce.orders.update("SHOP_ID", "ORDER_ID", requestBody)
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    if (error.response) console.log(error.response.data);
  });
```

### Delete an order
[Official Documentation](https://developers.mailerlite.com/ecommerce/orders#delete-an-order)

---
```javascript
mailerlite.ecommerce.orders.delete("SHOP_ID", "ORDER_ID")
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    if (error.response) console.log(error.response.data);
  });
```
