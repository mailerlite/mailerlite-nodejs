# E-commerce categories


### Get categories
[Official Documentation](https://developers.mailerlite.com/ecommerce/categories#get-categories)

---
```javascript
const params = {
  limit: 25,
  page: 1
};

mailerlite.ecommerce.categories.get("SHOP_ID", params)
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    if (error.response) console.log(error.response.data);
  });
```

### Fetch a category
[Official Documentation](https://developers.mailerlite.com/ecommerce/categories#fetch-a-category)

---
```javascript
mailerlite.ecommerce.categories.find("SHOP_ID", "CATEGORY_ID")
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    if (error.response) console.log(error.response.data);
  });
```

### Create a category
[Official Documentation](https://developers.mailerlite.com/ecommerce/categories#createupdate-category)

---
```javascript
const requestBody = {
  name: "Hats"
};

mailerlite.ecommerce.categories.create("SHOP_ID", requestBody)
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    if (error.response) console.log(error.response.data);
  });
```

### Update a category
[Official Documentation](https://developers.mailerlite.com/ecommerce/categories#createupdate-category)

---
```javascript
const requestBody = {
  name: "Caps"
};

mailerlite.ecommerce.categories.update("SHOP_ID", "CATEGORY_ID", requestBody)
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    if (error.response) console.log(error.response.data);
  });
```

### Delete a category
[Official Documentation](https://developers.mailerlite.com/ecommerce/categories#delete-a-category)

---
```javascript
mailerlite.ecommerce.categories.delete("SHOP_ID", "CATEGORY_ID")
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    if (error.response) console.log(error.response.data);
  });
```
