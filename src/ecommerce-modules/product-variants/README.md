# E-commerce product variants


### Get product variants
[Official Documentation](https://developers.mailerlite.com/ecommerce/product-variants#get-product-variants)

---
```javascript
mailerlite.ecommerce.productVariants.get("SHOP_ID", "PRODUCT_ID")
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    if (error.response) console.log(error.response.data);
  });
```

### Create product variants
[Official Documentation](https://developers.mailerlite.com/ecommerce/product-variants#create-product-variants)

---
```javascript
const requestBody = [
  {
    name: "Large",
    attributes: { size: "L" },
    resource_id: "variant-l"
  }
];

mailerlite.ecommerce.productVariants.create("SHOP_ID", "PRODUCT_ID", requestBody)
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    if (error.response) console.log(error.response.data);
  });
```

### Update a product variant
[Official Documentation](https://developers.mailerlite.com/ecommerce/product-variants#update-a-product-variant)

---
```javascript
const requestBody = {
  name: "Extra large",
  attributes: { size: "XL" }
};

mailerlite.ecommerce.productVariants.update("SHOP_ID", "PRODUCT_ID", "VARIANT_ID", requestBody)
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    if (error.response) console.log(error.response.data);
  });
```

### Delete a product variant
[Official Documentation](https://developers.mailerlite.com/ecommerce/product-variants#delete-a-product-variant)

---
```javascript
mailerlite.ecommerce.productVariants.delete("SHOP_ID", "PRODUCT_ID", "VARIANT_ID")
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    if (error.response) console.log(error.response.data);
  });
```
