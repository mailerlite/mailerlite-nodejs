# E-commerce customers


### Get customers
[Official Documentation](https://developers.mailerlite.com/ecommerce/customers#get-customers)

---
```javascript
const params = {
  filter: {
    email: "customer@example.com"
  }
};

mailerlite.ecommerce.customers.get("SHOP_ID", params)
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    if (error.response) console.log(error.response.data);
  });
```

### Fetch a customer
[Official Documentation](https://developers.mailerlite.com/ecommerce/customers#fetch-a-customer)

---
```javascript
mailerlite.ecommerce.customers.find("SHOP_ID", "CUSTOMER_ID")
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    if (error.response) console.log(error.response.data);
  });
```

### Create a customer
[Official Documentation](https://developers.mailerlite.com/ecommerce/customers#createupdate-customer)

---
```javascript
const requestBody = {
  email: "customer@example.com",
  create_subscriber: true
};

mailerlite.ecommerce.customers.create("SHOP_ID", requestBody)
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    if (error.response) console.log(error.response.data);
  });
```

### Update a customer
[Official Documentation](https://developers.mailerlite.com/ecommerce/customers#createupdate-customer)

---
```javascript
const requestBody = {
  name: "Jane"
};

mailerlite.ecommerce.customers.update("SHOP_ID", "CUSTOMER_ID", requestBody)
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    if (error.response) console.log(error.response.data);
  });
```

### Delete a customer
[Official Documentation](https://developers.mailerlite.com/ecommerce/customers#delete-a-customer)

---
```javascript
mailerlite.ecommerce.customers.delete("SHOP_ID", "CUSTOMER_ID")
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    if (error.response) console.log(error.response.data);
  });
```
