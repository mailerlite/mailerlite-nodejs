# E-commerce cart items


### Get the items of a cart
[Official Documentation](https://developers.mailerlite.com/ecommerce/cart-items#get-the-items-of-a-cart)

---
```javascript
const params = {
  limit: 25,
  page: 1
};

mailerlite.ecommerce.cartItems.get("SHOP_ID", "CART_ID", params)
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    if (error.response) console.log(error.response.data);
  });
```

### Fetch a cart item
[Official Documentation](https://developers.mailerlite.com/ecommerce/cart-items#fetch-a-cart-item)

---
```javascript
mailerlite.ecommerce.cartItems.find("SHOP_ID", "CART_ID", "ITEM_ID")
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    if (error.response) console.log(error.response.data);
  });
```

### Add a cart item
[Official Documentation](https://developers.mailerlite.com/ecommerce/cart-items#addupdate-a-cart-item)

---
```javascript
const requestBody = {
  ecommerce_product_id: "PRODUCT_ID",
  quantity: 1
};

mailerlite.ecommerce.cartItems.create("SHOP_ID", "CART_ID", requestBody)
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    if (error.response) console.log(error.response.data);
  });
```

### Update a cart item
[Official Documentation](https://developers.mailerlite.com/ecommerce/cart-items#addupdate-a-cart-item)

---
```javascript
const requestBody = {
  quantity: 2
};

mailerlite.ecommerce.cartItems.update("SHOP_ID", "CART_ID", "ITEM_ID", requestBody)
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    if (error.response) console.log(error.response.data);
  });
```

### Delete a cart item
[Official Documentation](https://developers.mailerlite.com/ecommerce/cart-items#delete-a-cart-item)

---
```javascript
mailerlite.ecommerce.cartItems.delete("SHOP_ID", "CART_ID", "ITEM_ID")
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    if (error.response) console.log(error.response.data);
  });
```
