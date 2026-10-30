<div align="center">
  <h1>
    <br/>
    <a href="https://www.mailerlite.com"><img src="/src/assets/mailerlite_logo.png" alt="MailerLite logo" width="200px"/></a>
    <br />
  </h1>
  <sup>
    <br />
    MailerLite Node.js SDK
    <br />
    <br />

[![MIT licensed](https://img.shields.io/badge/license-MIT-blue.svg)](./LICENSE.md)
![NPM Version](https://img.shields.io/npm/v/@mailerlite/mailerlite-nodejs)

  </sup>
  <br />
</div>

### Edge & serverless runtimes

The SDK works in edge/serverless runtimes that don't ship Node's `http`
module — such as Vercel Edge Functions, Cloudflare Workers, Next.js edge
routes and Deno. Requests automatically fall back to the `fetch` adapter
in those environments, while Node and browsers keep using their existing
adapters unchanged.

# Installation

```bash
npm install @mailerlite/mailerlite-nodejs
```

# Usage

```javascript
// For ECMAScript (ESM)
import MailerLite from '@mailerlite/mailerlite-nodejs';

const mailerlite = new MailerLite({
  api_key: "API_KEY"
});
```

```javascript
// For CommonJS (CJS)
const MailerLite = require('@mailerlite/mailerlite-nodejs').default;

const mailerlite = new MailerLite({
  api_key: "API_KEY"
});
```

- [Subscribers](src/modules/subscribers/README.md)
    * [List all subscribers](src/modules/subscribers/README.md#list-all-subscribers)
    * [Create/update subscriber](src/modules/subscribers/README.md#createupdate-subscriber)
    * [Update a subscriber](src/modules/subscribers/README.md#update-a-subscriber)
    * [Fetch a subscriber](src/modules/subscribers/README.md#fetch-a-subscriber)
    * [Fetch total subscribers count](src/modules/subscribers/README.md#fetch-total-subscribers-count)
    * [Delete a subscriber](src/modules/subscribers/README.md#delete-a-subscriber)
    * [Forget a subscriber](src/modules/subscribers/README.md#forget-a-subscriber)
    * [Fetch subscriber e-commerce stats](src/modules/subscribers/README.md#fetch-subscriber-e-commerce-stats)
    * [Fetch subscriber e-commerce orders](src/modules/subscribers/README.md#fetch-subscriber-e-commerce-orders)
- [Groups](src/modules/groups/README.md)
    * [List all groups](src/modules/groups/README.md#list-all-groups)
    * [Create a group](src/modules/groups/README.md#create-a-group)
    * [Update a group](src/modules/groups/README.md#update-a-group)
    * [Delete group](src/modules/groups/README.md#delete-group)
    * [Get subscribers belonging to a group](src/modules/groups/README.md#get-subscribers-belonging-to-a-group)
    * [Assign subscriber to a group](src/modules/groups/README.md#assign-subscriber-to-a-group)
    * [Unassign subscriber from a group](src/modules/groups/README.md#unassign-subscriber-from-a-group)
- [Segments](src/modules/segments/README.md)
    * [List all segments](src/modules/segments/README.md#list-all-segments)
    * [Get subscribers belonging to a segment](src/modules/segments/README.md#get-subscribers-belonging-to-a-segment)
    * [Update segment](src/modules/segments/README.md#update-segment)
    * [Delete segment](src/modules/segments/README.md#delete-segment)
- [Fields](src/modules/fields/README.md)
    * [List all fields](src/modules/fields/README.md#list-all-fields)
    * [Create a field](src/modules/fields/README.md#create-a-field)
    * [Update a field](src/modules/fields/README.md#update-a-field)
    * [Delete a field](src/modules/fields/README.md#delete-a-field)
- [Automations](src/modules/automations/README.md)
    * [List all automations](src/modules/automations/README.md#list-all-automations)
    * [Get an automation](src/modules/automations/README.md#get-an-automation)
    * [Get the subscriber activity for an automation](src/modules/automations/README.md#get-the-subscriber-activity-for-an-automation)
    * [Get automation e-commerce stats](src/modules/automations/README.md#get-automation-e-commerce-stats)
    * [Get automation email e-commerce stats](src/modules/automations/README.md#get-automation-email-e-commerce-stats)
    * [Get automation e-commerce orders](src/modules/automations/README.md#get-automation-e-commerce-orders)
- [Campaigns](src/modules/campaigns/README.md)
    * [Campaign list](src/modules/campaigns/README.md#campaign-list)
    * [Get a campaign](src/modules/campaigns/README.md#get-a-campaign)
    * [Create a campaign](src/modules/campaigns/README.md#create-a-campaign)
    * [Update campaign](src/modules/campaigns/README.md#update-campaign)
    * [Schedule a campaign](src/modules/campaigns/README.md#schedule-a-campaign)
    * [Cancel a ready campaign](src/modules/campaigns/README.md#cancel-a-ready-campaign)
    * [Delete a campaign](src/modules/campaigns/README.md#delete-a-campaign)
    * [Get campaign e-commerce stats](src/modules/campaigns/README.md#get-campaign-e-commerce-stats)
    * [Get campaign e-commerce orders](src/modules/campaigns/README.md#get-campaign-e-commerce-orders)
- [Forms](src/modules/forms/README.md)
    * [List all forms](src/modules/forms/README.md#list-all-forms)
    * [Update a form](src/modules/forms/README.md#update-a-form)
    * [Delete a form](src/modules/forms/README.md#delete-a-form)
- [Batching](src/modules/batches/README.md)
    * [Send batch request](src/modules/batches/README.md#send-batch-request)
- [Webhooks](src/modules/webhooks/README.md)
    * [List all webhooks](src/modules/webhooks/README.md#list-all-webhooks)
    * [Get a webhook](src/modules/webhooks/README.md#get-a-webhook)
    * [Create a webhook](src/modules/webhooks/README.md#create-a-webhook)
    * [Update a webhook](src/modules/webhooks/README.md#update-a-webhook)
    * [Delete a webhook](src/modules/webhooks/README.md#delete-a-webhook)
- [Timezones](src/modules/timezones/README.md)
    * [List all timezones](src/modules/timezones/README.md#list-all-timezones)
- [Campaign languages](src/modules/languages/README.md)
    * [List all languages](src/modules/languages/README.md#list-all-languages)
- [Stats](src/modules/stats/README.md)
    * [Get a list of sent campaigns](src/modules/stats/README.md#get-a-list-of-sent-campaigns)
    * [Get stats for a sent campaign](src/modules/stats/README.md#get-stats-for-a-sent-campaign)
    * [Get a subscribers of sent campaign](src/modules/stats/README.md#get-a-subscribers-of-sent-campaign)
    * [Get a list of forms by type](src/modules/stats/README.md#get-a-list-of-forms-by-type)
    * [Get forms count by type](src/modules/stats/README.md#get-forms-count-by-type)
    * [Get subscribers of a form](src/modules/stats/README.md#get-subscribers-of-a-form)
    * [List all automations](src/modules/stats/README.md#list-all-automations)
    * [Get stats for a specific automation](src/modules/stats/README.md#get-stats-for-a-specific-automation)
    * [Get the subscriber activity for an automation](src/modules/stats/README.md#get-the-subscriber-activity-for-an-automation)
- [Brand styles](src/modules/brand-styles/README.md)
    * [Get brand styles](src/modules/brand-styles/README.md#get-brand-styles)
- [Files](src/modules/files/README.md)
    * [List all files](src/modules/files/README.md#list-all-files)
- [E-commerce shops](src/ecommerce-modules/shops/README.md)
    * [List e-commerce shops](src/ecommerce-modules/shops/README.md#list-e-commerce-shops)
    * [Fetch a shop](src/ecommerce-modules/shops/README.md#fetch-a-shop)
    * [Create a shop](src/ecommerce-modules/shops/README.md#create-a-shop)
    * [Update a shop](src/ecommerce-modules/shops/README.md#update-a-shop)
    * [Delete a shop](src/ecommerce-modules/shops/README.md#delete-a-shop)
    * [Fetch shop e-commerce stats](src/ecommerce-modules/shops/README.md#fetch-shop-e-commerce-stats)
- [E-commerce products](src/ecommerce-modules/products/README.md)
    * [Get products](src/ecommerce-modules/products/README.md#get-products)
    * [Fetch a product](src/ecommerce-modules/products/README.md#fetch-a-product)
    * [Create a product](src/ecommerce-modules/products/README.md#create-a-product)
    * [Update a product](src/ecommerce-modules/products/README.md#update-a-product)
    * [Delete a product](src/ecommerce-modules/products/README.md#delete-a-product)
    * [Enable or disable a product](src/ecommerce-modules/products/README.md#enable-or-disable-a-product)
- [E-commerce product variants](src/ecommerce-modules/product-variants/README.md)
    * [Get product variants](src/ecommerce-modules/product-variants/README.md#get-product-variants)
    * [Create product variants](src/ecommerce-modules/product-variants/README.md#create-product-variants)
    * [Update a product variant](src/ecommerce-modules/product-variants/README.md#update-a-product-variant)
    * [Delete a product variant](src/ecommerce-modules/product-variants/README.md#delete-a-product-variant)
- [E-commerce categories](src/ecommerce-modules/categories/README.md)
    * [Get categories](src/ecommerce-modules/categories/README.md#get-categories)
    * [Fetch a category](src/ecommerce-modules/categories/README.md#fetch-a-category)
    * [Create a category](src/ecommerce-modules/categories/README.md#create-a-category)
    * [Update a category](src/ecommerce-modules/categories/README.md#update-a-category)
    * [Delete a category](src/ecommerce-modules/categories/README.md#delete-a-category)
- [E-commerce categories products](src/ecommerce-modules/categories-products/README.md)
    * [Get the products of a category](src/ecommerce-modules/categories-products/README.md#get-the-products-of-a-category)
    * [Assign a product to a category](src/ecommerce-modules/categories-products/README.md#assign-a-product-to-a-category)
    * [Assign multiple categories to a product](src/ecommerce-modules/categories-products/README.md#assign-multiple-categories-to-a-product)
    * [Unassign a product from a category](src/ecommerce-modules/categories-products/README.md#unassign-a-product-from-a-category)
- [E-commerce customers](src/ecommerce-modules/customers/README.md)
    * [Get customers](src/ecommerce-modules/customers/README.md#get-customers)
    * [Fetch a customer](src/ecommerce-modules/customers/README.md#fetch-a-customer)
    * [Create a customer](src/ecommerce-modules/customers/README.md#create-a-customer)
    * [Update a customer](src/ecommerce-modules/customers/README.md#update-a-customer)
    * [Delete a customer](src/ecommerce-modules/customers/README.md#delete-a-customer)
- [E-commerce orders](src/ecommerce-modules/orders/README.md)
    * [Get orders](src/ecommerce-modules/orders/README.md#get-orders)
    * [Fetch an order](src/ecommerce-modules/orders/README.md#fetch-an-order)
    * [Create an order](src/ecommerce-modules/orders/README.md#create-an-order)
    * [Update an order](src/ecommerce-modules/orders/README.md#update-an-order)
    * [Delete an order](src/ecommerce-modules/orders/README.md#delete-an-order)
- [E-commerce carts](src/ecommerce-modules/carts/README.md)
    * [Get carts](src/ecommerce-modules/carts/README.md#get-carts)
    * [Fetch a cart](src/ecommerce-modules/carts/README.md#fetch-a-cart)
    * [Update a cart](src/ecommerce-modules/carts/README.md#update-a-cart)
- [E-commerce cart items](src/ecommerce-modules/cart-items/README.md)
    * [Get the items of a cart](src/ecommerce-modules/cart-items/README.md#get-the-items-of-a-cart)
    * [Fetch a cart item](src/ecommerce-modules/cart-items/README.md#fetch-a-cart-item)
    * [Add a cart item](src/ecommerce-modules/cart-items/README.md#add-a-cart-item)
    * [Update a cart item](src/ecommerce-modules/cart-items/README.md#update-a-cart-item)
    * [Delete a cart item](src/ecommerce-modules/cart-items/README.md#delete-a-cart-item)
- [E-commerce import](src/ecommerce-modules/import/README.md)
    * [Categories import](src/ecommerce-modules/import/README.md#categories-import)
    * [Customers import](src/ecommerce-modules/import/README.md#customers-import)
    * [Products import](src/ecommerce-modules/import/README.md#products-import)
    * [Orders import](src/ecommerce-modules/import/README.md#orders-import)
- [E-commerce settings](src/ecommerce-modules/settings/README.md)
    * [Get e-commerce tracking settings](src/ecommerce-modules/settings/README.md#get-e-commerce-tracking-settings)
