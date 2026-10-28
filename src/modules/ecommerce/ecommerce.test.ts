import { describe, it, expect, vi, beforeEach } from "vitest";

const axiosMock = vi.hoisted(() => vi.fn(() => Promise.resolve({ data: {} })));
vi.mock("axios", () => ({ default: axiosMock }));

import MailerLite from "../../index";

const mailerlite = new MailerLite({ api_key: "test-key", base_path: "https://connect.mailerlite.com" });

const shop = "https://connect.mailerlite.com/api/ecommerce/shops/1";
const variant = { name: "Large", attributes: { size: "L" } };

const cases: Array<[string, () => Promise<unknown>, string, string, unknown?]> = [
    ["shops.get", () => mailerlite.ecommerce.shops.get({ limit: 10 }), "GET", "https://connect.mailerlite.com/api/ecommerce/shops?limit=10"],
    ["shops.find", () => mailerlite.ecommerce.shops.find("1"), "GET", shop],
    ["shops.create", () => mailerlite.ecommerce.shops.create({ name: "Shop", url: "https://shop.test", currency: "EUR" }), "POST", "https://connect.mailerlite.com/api/ecommerce/shops", { name: "Shop", url: "https://shop.test", currency: "EUR" }],
    ["shops.update", () => mailerlite.ecommerce.shops.update("1", { name: "New" }), "PUT", shop, { name: "New" }],
    ["shops.delete", () => mailerlite.ecommerce.shops.delete("1"), "DELETE", shop],
    ["shops.getStats", () => mailerlite.ecommerce.shops.getStats("1", { start_date: "2026-10-01", end_date: "2026-10-31" }), "GET", `${shop}/reports/stats?start_date=2026-10-01&end_date=2026-10-31`],
    ["getSettings", () => mailerlite.ecommerce.getSettings(), "GET", "https://connect.mailerlite.com/api/ecommerce/settings"],

    ["products.get", () => mailerlite.ecommerce.products.get("1", { filter: { enabled: true }, sort: "-name" }), "GET", `${shop}/products?filter[enabled]=true&sort=-name`],
    ["products.find", () => mailerlite.ecommerce.products.find("1", "7"), "GET", `${shop}/products/7`],
    ["products.create", () => mailerlite.ecommerce.products.create("1", { name: "Hat" }), "POST", `${shop}/products`, { name: "Hat" }],
    ["products.update", () => mailerlite.ecommerce.products.update("1", "7", { price: 10 }), "PUT", `${shop}/products/7`, { price: 10 }],
    ["products.delete", () => mailerlite.ecommerce.products.delete("1", "7"), "DELETE", `${shop}/products/7`],
    ["products.changeStatus", () => mailerlite.ecommerce.products.changeStatus("1", "7", false), "PUT", `${shop}/products/7/change-status`, { status: false }],
    ["products.assignCategories", () => mailerlite.ecommerce.products.assignCategories("1", "7", ["5"], true), "PUT", `${shop}/products/7/categories/multiple`, { categories: ["5"], replace: true }],

    ["variants.get", () => mailerlite.ecommerce.variants.get("1", "7"), "GET", `${shop}/products/7/variants`],
    ["variants.sync", () => mailerlite.ecommerce.variants.sync("1", "7", [variant]), "POST", `${shop}/products/7/variants`, [variant]],
    ["variants.update", () => mailerlite.ecommerce.variants.update("1", "7", "3", variant), "PUT", `${shop}/products/7/variants/3`, variant],
    ["variants.delete", () => mailerlite.ecommerce.variants.delete("1", "7", "3"), "DELETE", `${shop}/products/7/variants/3`],

    ["categories.get", () => mailerlite.ecommerce.categories.get("1"), "GET", `${shop}/categories`],
    ["categories.find", () => mailerlite.ecommerce.categories.find("1", "5"), "GET", `${shop}/categories/5`],
    ["categories.create", () => mailerlite.ecommerce.categories.create("1", { name: "Hats" }), "POST", `${shop}/categories`, { name: "Hats" }],
    ["categories.update", () => mailerlite.ecommerce.categories.update("1", "5", { name: "Caps" }), "PUT", `${shop}/categories/5`, { name: "Caps" }],
    ["categories.delete", () => mailerlite.ecommerce.categories.delete("1", "5"), "DELETE", `${shop}/categories/5`],
    ["categories.getProducts", () => mailerlite.ecommerce.categories.getProducts("1", "5"), "GET", `${shop}/categories/5/products`],
    ["categories.assignProduct", () => mailerlite.ecommerce.categories.assignProduct("1", "5", "7"), "PUT", `${shop}/categories/5/products/7`],
    ["categories.unassignProduct", () => mailerlite.ecommerce.categories.unassignProduct("1", "5", "7"), "DELETE", `${shop}/categories/5/products/7`],

    ["customers.get", () => mailerlite.ecommerce.customers.get("1", { filter: { email: "a@b.test" } }), "GET", `${shop}/customers?filter[email]=a%40b.test`],
    ["customers.find", () => mailerlite.ecommerce.customers.find("1", "3"), "GET", `${shop}/customers/3`],
    ["customers.create", () => mailerlite.ecommerce.customers.create("1", { email: "a@b.test" }), "POST", `${shop}/customers`, { email: "a@b.test" }],
    ["customers.update", () => mailerlite.ecommerce.customers.update("1", "3", { name: "Jane" }), "PUT", `${shop}/customers/3`, { name: "Jane" }],
    ["customers.delete", () => mailerlite.ecommerce.customers.delete("1", "3"), "DELETE", `${shop}/customers/3`],

    ["orders.get", () => mailerlite.ecommerce.orders.get("1", { filter: { attributed: true, email_id: "55" } }), "GET", `${shop}/orders?filter[attributed]=true&filter[email_id]=55`],
    ["orders.find", () => mailerlite.ecommerce.orders.find("1", "9"), "GET", `${shop}/orders/9`],
    ["orders.update", () => mailerlite.ecommerce.orders.update("1", "9", { status: "complete" }), "PUT", `${shop}/orders/9`, { status: "complete" }],
    ["orders.delete", () => mailerlite.ecommerce.orders.delete("1", "9"), "DELETE", `${shop}/orders/9`],

    ["carts.get", () => mailerlite.ecommerce.carts.get("1"), "GET", `${shop}/carts`],
    ["carts.find", () => mailerlite.ecommerce.carts.find("1", "4"), "GET", `${shop}/carts/4`],
    ["carts.update", () => mailerlite.ecommerce.carts.update("1", "4", { cart_total: 10 }), "PUT", `${shop}/carts/4`, { cart_total: 10 }],
    ["cartItems.get", () => mailerlite.ecommerce.cartItems.get("1", "4"), "GET", `${shop}/carts/4/items`],
    ["cartItems.find", () => mailerlite.ecommerce.cartItems.find("1", "4", "8"), "GET", `${shop}/carts/4/items/8`],
    ["cartItems.create", () => mailerlite.ecommerce.cartItems.create("1", "4", { ecommerce_product_id: "7" }), "POST", `${shop}/carts/4/items`, { ecommerce_product_id: "7" }],
    ["cartItems.update", () => mailerlite.ecommerce.cartItems.update("1", "4", "8", { quantity: 2 }), "PUT", `${shop}/carts/4/items/8`, { quantity: 2 }],
    ["cartItems.delete", () => mailerlite.ecommerce.cartItems.delete("1", "4", "8"), "DELETE", `${shop}/carts/4/items/8`],

    ["imports.products", () => mailerlite.ecommerce.imports.products("1", [{ name: "Hat" }]), "POST", `${shop}/products/import`, [{ name: "Hat" }]],
    ["imports.categories", () => mailerlite.ecommerce.imports.categories("1", [{ name: "Hats" }]), "POST", `${shop}/categories/import`, [{ name: "Hats" }]],
    ["imports.customers", () => mailerlite.ecommerce.imports.customers("1", [{ email: "a@b.test" }]), "POST", `${shop}/customers/import`, [{ email: "a@b.test" }]],

    ["campaigns.getEcommerceStats", () => mailerlite.campaigns.getEcommerceStats("2", { shop_id: "1" }), "GET", "https://connect.mailerlite.com/api/campaigns/2/reports/ecommerce?shop_id=1"],
    ["campaigns.getEcommerceOrders", () => mailerlite.campaigns.getEcommerceOrders("2", { shop_id: "1", page: 2 }), "GET", "https://connect.mailerlite.com/api/campaigns/2/reports/ecommerce/orders?shop_id=1&page=2"],
    ["subscribers.getEcommerceStats", () => mailerlite.subscribers.getEcommerceStats("6", { shop_id: "1" }), "GET", "https://connect.mailerlite.com/api/subscribers/6/reports/ecommerce?shop_id=1"],
    ["subscribers.getEcommerceOrders", () => mailerlite.subscribers.getEcommerceOrders("6", { shop_id: "1" }), "GET", "https://connect.mailerlite.com/api/subscribers/6/reports/ecommerce/orders?shop_id=1"],
    ["automations.getEcommerceStats", () => mailerlite.automations.getEcommerceStats("8"), "GET", "https://connect.mailerlite.com/api/automations/8/monthly-totals/ecommerce"],
    ["automations.getEmailEcommerceStats", () => mailerlite.automations.getEmailEcommerceStats("8", "9", { shop_id: "1" }), "GET", "https://connect.mailerlite.com/api/automations/8/emails/9/ecommerce-overview-stats?shop_id=1"],
    ["automations.getEcommerceOrders", () => mailerlite.automations.getEcommerceOrders("8", { time_frame: "all_time" }), "GET", "https://connect.mailerlite.com/api/automations/8/order-activity?time_frame=all_time"],
];

describe("E-commerce", () => {
    beforeEach(() => {
        axiosMock.mockClear();
    });

    it.each(cases)("%s", async (_name, call, method, url, body) => {
        await call();

        const passedConfig = axiosMock.mock.calls[0][0] as { method: string; url: string; data?: string };
        expect(passedConfig.method).toBe(method);
        expect(passedConfig.url).toBe(url);
        expect(passedConfig.data).toBe(body === undefined ? undefined : JSON.stringify(body));
    });
});
