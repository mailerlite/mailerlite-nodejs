# E-commerce products


### Get products
[Official Documentation](https://developers.mailerlite.com/ecommerce/products#get-products)

---
```javascript
const params = {
  filter: {
    enabled: true
  },
  sort: "-created_at"
};

mailerlite.ecommerce.products.get("SHOP_ID", params)
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    if (error.response) console.log(error.response.data);
  });
```

### Fetch a product
[Official Documentation](https://developers.mailerlite.com/ecommerce/products#fetch-a-product)

---
```javascript
mailerlite.ecommerce.products.find("SHOP_ID", "PRODUCT_ID")
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    if (error.response) console.log(error.response.data);
  });
```

### Create a product
[Official Documentation](https://developers.mailerlite.com/ecommerce/products#createupdate-product)

---
```javascript
const requestBody = {
  name: "Red T-shirt",
  price: 19.99
};

mailerlite.ecommerce.products.create("SHOP_ID", requestBody)
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    if (error.response) console.log(error.response.data);
  });
```

### Update a product
[Official Documentation](https://developers.mailerlite.com/ecommerce/products#createupdate-product)

---
```javascript
const requestBody = {
  price: 24.99
};

mailerlite.ecommerce.products.update("SHOP_ID", "PRODUCT_ID", requestBody)
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    if (error.response) console.log(error.response.data);
  });
```

### Delete a product
[Official Documentation](https://developers.mailerlite.com/ecommerce/products#delete-a-product)

---
```javascript
mailerlite.ecommerce.products.delete("SHOP_ID", "PRODUCT_ID")
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    if (error.response) console.log(error.response.data);
  });
```

### Enable or disable a product
[Official Documentation](https://developers.mailerlite.com/ecommerce/products#enable-or-disable-a-product)

---
```javascript
const requestBody = {
  status: false
};

mailerlite.ecommerce.products.changeStatus("SHOP_ID", "PRODUCT_ID", requestBody)
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    if (error.response) console.log(error.response.data);
  });
```
