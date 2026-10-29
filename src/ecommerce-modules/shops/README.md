# E-commerce shops


### List e-commerce shops
[Official Documentation](https://developers.mailerlite.com/ecommerce/shops#list-e-commerce-shops)

---
```javascript
const params = {
  limit: 25,
  page: 1
};

mailerlite.ecommerce.shops.get(params)
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    if (error.response) console.log(error.response.data);
  });
```

### Fetch a shop
[Official Documentation](https://developers.mailerlite.com/ecommerce/shops#fetch-a-shop)

---
```javascript
mailerlite.ecommerce.shops.find("SHOP_ID")
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    if (error.response) console.log(error.response.data);
  });
```

### Create a shop
[Official Documentation](https://developers.mailerlite.com/ecommerce/shops#createupdate-shop)

---
```javascript
const requestBody = {
  name: "My shop",
  url: "https://shop.example.com",
  currency: "EUR"
};

mailerlite.ecommerce.shops.create(requestBody)
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    if (error.response) console.log(error.response.data);
  });
```

### Update a shop
[Official Documentation](https://developers.mailerlite.com/ecommerce/shops#createupdate-shop)

---
```javascript
const requestBody = {
  name: "New name"
};

mailerlite.ecommerce.shops.update("SHOP_ID", requestBody)
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    if (error.response) console.log(error.response.data);
  });
```

### Delete a shop
[Official Documentation](https://developers.mailerlite.com/ecommerce/shops#delete-a-shop)

---
```javascript
mailerlite.ecommerce.shops.delete("SHOP_ID")
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    if (error.response) console.log(error.response.data);
  });
```

### Fetch shop e-commerce stats
[Official Documentation](https://developers.mailerlite.com/ecommerce/shops#fetch-shop-e-commerce-stats)

---
```javascript
const params = {
  start_date: "2026-10-01",
  end_date: "2026-10-31"
};

mailerlite.ecommerce.shops.getStats("SHOP_ID", params)
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    if (error.response) console.log(error.response.data);
  });
```
