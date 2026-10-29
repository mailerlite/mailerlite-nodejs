# E-commerce carts


### Get carts
[Official Documentation](https://developers.mailerlite.com/ecommerce/cart#get-carts)

---
```javascript
const params = {
  limit: 25,
  page: 1
};

mailerlite.ecommerce.carts.get("SHOP_ID", params)
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    if (error.response) console.log(error.response.data);
  });
```

### Fetch a cart
[Official Documentation](https://developers.mailerlite.com/ecommerce/cart#fetch-a-cart)

---
```javascript
mailerlite.ecommerce.carts.find("SHOP_ID", "CART_ID")
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    if (error.response) console.log(error.response.data);
  });
```

### Update a cart
[Official Documentation](https://developers.mailerlite.com/ecommerce/cart#update-a-cart)

---
```javascript
const requestBody = {
  checkout_url: "https://shop.example.com/cart"
};

mailerlite.ecommerce.carts.update("SHOP_ID", "CART_ID", requestBody)
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    if (error.response) console.log(error.response.data);
  });
```
