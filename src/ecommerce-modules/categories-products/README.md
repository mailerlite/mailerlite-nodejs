# E-commerce categories products


### Get the products of a category
[Official Documentation](https://developers.mailerlite.com/ecommerce/categories-products#get-the-products-of-a-category)

---
```javascript
const params = {
  limit: 25,
  page: 1
};

mailerlite.ecommerce.categoriesProducts.getProducts("SHOP_ID", "CATEGORY_ID", params)
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    if (error.response) console.log(error.response.data);
  });
```

### Assign a product to a category
[Official Documentation](https://developers.mailerlite.com/ecommerce/categories-products#assign-a-product-to-a-category)

---
```javascript
mailerlite.ecommerce.categoriesProducts.assignProduct("SHOP_ID", "CATEGORY_ID", "PRODUCT_ID")
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    if (error.response) console.log(error.response.data);
  });
```

### Assign multiple categories to a product
[Official Documentation](https://developers.mailerlite.com/ecommerce/categories-products#assign-multiple-categories-to-a-product)

---
```javascript
const requestBody = {
  categories: ["CATEGORY_ID"],
  replace: true
};

mailerlite.ecommerce.categoriesProducts.assignCategories("SHOP_ID", "PRODUCT_ID", requestBody)
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    if (error.response) console.log(error.response.data);
  });
```

### Unassign a product from a category
[Official Documentation](https://developers.mailerlite.com/ecommerce/categories-products#unassign-a-product-from-a-category)

---
```javascript
mailerlite.ecommerce.categoriesProducts.unassignProduct("SHOP_ID", "CATEGORY_ID", "PRODUCT_ID")
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    if (error.response) console.log(error.response.data);
  });
```
