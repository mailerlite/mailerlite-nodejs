# E-commerce

Every method returns the axios response, so the payload is in `response.data`.

### Shops
[Official Documentation](https://developers.mailerlite.com/docs/ecommerce/shops)

---
```javascript
await mailerlite.ecommerce.shops.get({ limit: 25 });
await mailerlite.ecommerce.shops.find("SHOP_ID");
await mailerlite.ecommerce.shops.create({ name: "My shop", url: "https://shop.example.com", currency: "EUR" });
await mailerlite.ecommerce.shops.update("SHOP_ID", { name: "New name" });
await mailerlite.ecommerce.shops.delete("SHOP_ID");
```

### Products
[Official Documentation](https://developers.mailerlite.com/docs/ecommerce/products)

---
```javascript
await mailerlite.ecommerce.products.get("SHOP_ID", {
  filter: { enabled: true, category: "CATEGORY_ID" },
  sort: "-created_at",
});
await mailerlite.ecommerce.products.find("SHOP_ID", "PRODUCT_ID");
await mailerlite.ecommerce.products.create("SHOP_ID", { name: "Red T-shirt", price: 19.99 });
await mailerlite.ecommerce.products.update("SHOP_ID", "PRODUCT_ID", { price: 24.99 });
await mailerlite.ecommerce.products.delete("SHOP_ID", "PRODUCT_ID");
await mailerlite.ecommerce.products.changeStatus("SHOP_ID", "PRODUCT_ID", false);
await mailerlite.ecommerce.products.assignCategories("SHOP_ID", "PRODUCT_ID", ["CATEGORY_ID"], true);
```

### Product variants
[Official Documentation](https://developers.mailerlite.com/docs/ecommerce/product-variants)

---
```javascript
await mailerlite.ecommerce.variants.get("SHOP_ID", "PRODUCT_ID");
await mailerlite.ecommerce.variants.sync("SHOP_ID", "PRODUCT_ID", [
  { name: "Large", attributes: { size: "L" }, resource_id: "VARIANT-L" },
]);
await mailerlite.ecommerce.variants.update("SHOP_ID", "PRODUCT_ID", "VARIANT_ID", { name: "Extra large", attributes: { size: "XL" } });
await mailerlite.ecommerce.variants.delete("SHOP_ID", "PRODUCT_ID", "VARIANT_ID");
```

### Categories
[Official Documentation](https://developers.mailerlite.com/docs/ecommerce/categories)

---
```javascript
await mailerlite.ecommerce.categories.get("SHOP_ID");
await mailerlite.ecommerce.categories.find("SHOP_ID", "CATEGORY_ID");
await mailerlite.ecommerce.categories.create("SHOP_ID", { name: "Hats" });
await mailerlite.ecommerce.categories.update("SHOP_ID", "CATEGORY_ID", { name: "Caps" });
await mailerlite.ecommerce.categories.delete("SHOP_ID", "CATEGORY_ID");

await mailerlite.ecommerce.categories.getProducts("SHOP_ID", "CATEGORY_ID");
await mailerlite.ecommerce.categories.assignProduct("SHOP_ID", "CATEGORY_ID", "PRODUCT_ID");
await mailerlite.ecommerce.categories.unassignProduct("SHOP_ID", "CATEGORY_ID", "PRODUCT_ID");
```

### Customers
[Official Documentation](https://developers.mailerlite.com/docs/ecommerce/customers)

---
```javascript
await mailerlite.ecommerce.customers.get("SHOP_ID", { filter: { email: "customer@example.com" } });
await mailerlite.ecommerce.customers.find("SHOP_ID", "CUSTOMER_ID");
await mailerlite.ecommerce.customers.create("SHOP_ID", { email: "customer@example.com", create_subscriber: true });
await mailerlite.ecommerce.customers.update("SHOP_ID", "CUSTOMER_ID", { name: "Jane" });
await mailerlite.ecommerce.customers.delete("SHOP_ID", "CUSTOMER_ID");
```

### Orders
[Official Documentation](https://developers.mailerlite.com/docs/ecommerce/orders)

---
```javascript
await mailerlite.ecommerce.orders.get("SHOP_ID", { filter: { attributed: true, email_id: "EMAIL_ID" } });
await mailerlite.ecommerce.orders.find("SHOP_ID", "ORDER_ID");
await mailerlite.ecommerce.orders.create("SHOP_ID", {
  customer: { email: "customer@example.com" },
  cart: { items: [{ ecommerce_product_id: "PRODUCT_ID", quantity: 1, price: 19.99 }] },
  status: "complete",
});
await mailerlite.ecommerce.orders.update("SHOP_ID", "ORDER_ID", { status: "complete" });
await mailerlite.ecommerce.orders.delete("SHOP_ID", "ORDER_ID");
```

### Carts and cart items
[Official Documentation](https://developers.mailerlite.com/docs/ecommerce/cart)

---
```javascript
await mailerlite.ecommerce.carts.get("SHOP_ID");
await mailerlite.ecommerce.carts.find("SHOP_ID", "CART_ID");
await mailerlite.ecommerce.carts.update("SHOP_ID", "CART_ID", { checkout_url: "https://shop.example.com/cart" });

await mailerlite.ecommerce.cartItems.get("SHOP_ID", "CART_ID");
await mailerlite.ecommerce.cartItems.find("SHOP_ID", "CART_ID", "ITEM_ID");
await mailerlite.ecommerce.cartItems.create("SHOP_ID", "CART_ID", { ecommerce_product_id: "PRODUCT_ID", quantity: 1 });
await mailerlite.ecommerce.cartItems.update("SHOP_ID", "CART_ID", "ITEM_ID", { quantity: 2 });
await mailerlite.ecommerce.cartItems.delete("SHOP_ID", "CART_ID", "ITEM_ID");
```

### Imports
[Official Documentation](https://developers.mailerlite.com/docs/ecommerce/import)

---
```javascript
await mailerlite.ecommerce.imports.products("SHOP_ID", [{ name: "Red T-shirt", price: 19.99 }]);
await mailerlite.ecommerce.imports.categories("SHOP_ID", [{ name: "Hats" }]);
await mailerlite.ecommerce.imports.customers("SHOP_ID", [{ email: "customer@example.com" }]);
await mailerlite.ecommerce.imports.orders("SHOP_ID", [{ customer: { email: "customer@example.com" }, cart: { items: [{ ecommerce_product_id: "PRODUCT_ID" }] } }]);
```

### Revenue reports
[Official Documentation](https://developers.mailerlite.com/docs/ecommerce/shops)

---
```javascript
await mailerlite.ecommerce.shops.getStats("SHOP_ID", { start_date: "2026-10-01", end_date: "2026-10-31" });

await mailerlite.campaigns.getEcommerceStats("CAMPAIGN_ID", { shop_id: "SHOP_ID" });
await mailerlite.campaigns.getEcommerceOrders("CAMPAIGN_ID", { shop_id: "SHOP_ID" });

await mailerlite.subscribers.getEcommerceStats("SUBSCRIBER_ID", { shop_id: "SHOP_ID" });
await mailerlite.subscribers.getEcommerceOrders("SUBSCRIBER_ID", { shop_id: "SHOP_ID" });

await mailerlite.automations.getEcommerceStats("AUTOMATION_ID");
await mailerlite.automations.getEmailEcommerceStats("AUTOMATION_ID", "EMAIL_ID");
await mailerlite.automations.getEcommerceOrders("AUTOMATION_ID", { time_frame: "all_time" });
```

### Tracking settings
[Official Documentation](https://developers.mailerlite.com/docs/ecommerce/settings)

---
```javascript
await mailerlite.ecommerce.getSettings();
```
