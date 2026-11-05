import { describe, it, expect, vi } from "vitest";

const axiosMock = vi.hoisted(() => vi.fn(() => Promise.resolve({ data: {} })));
vi.mock("axios", () => ({ default: axiosMock }));

import { mockClient, lastRequest } from "../../utils/request-mock";

const mailerlite = mockClient();
const shop = "/api/ecommerce/shops/1";
const orders = {
    orders: [{
        customer: { email: "a@b.test", create_subscriber: false },
        cart: { items: [{ ecommerce_product_id: "7", quantity: 1 }] },
    }],
};

describe("E-commerce import requests", () => {
    it.each([
        ["Categories import", () => mailerlite.ecommerce.import.importCategories("1", [{ name: "Hats" }]), `${shop}/categories/import`, [{ name: "Hats" }]],
        ["Customers import", () => mailerlite.ecommerce.import.importCustomers("1", [{ email: "a@b.test" }]), `${shop}/customers/import`, [{ email: "a@b.test" }]],
        ["Products import", () => mailerlite.ecommerce.import.importProducts("1", [{ name: "Hat", price: 19.99 }]), `${shop}/products/import`, [{ name: "Hat", price: 19.99 }]],
        ["Orders import", () => mailerlite.ecommerce.import.importOrders("1", orders), `${shop}/orders/import`, orders],
    ] as const)("%s", async (_, call, path, body) => {
        await call();

        expect(lastRequest(axiosMock)).toEqual({ method: "POST", path, query: "", body });
    });

    it("rejects a numeric shop id", () => {
        expect(() => mailerlite.ecommerce.import.importCategories(1 as never, [])).toThrow("ID must be of type string");
    });
});
