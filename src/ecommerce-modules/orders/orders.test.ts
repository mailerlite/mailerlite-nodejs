import { describe, it, expect, vi } from "vitest";

const axiosMock = vi.hoisted(() => vi.fn(() => Promise.resolve({ data: {} })));
vi.mock("axios", () => ({ default: axiosMock }));

import { mockClient, lastRequest } from "../../utils/request-mock";

const mailerlite = mockClient();
const orders = "/api/ecommerce/shops/1/orders";
const order = {
    customer: { email: "a@b.test", create_subscriber: false },
    cart: { items: [{ ecommerce_product_id: "7", quantity: 1, price: 19.99 }] },
};

describe("E-commerce orders requests", () => {
    it.each([
        ["Get orders", () => mailerlite.ecommerce.orders.get("1", { filter: { status: "pending" } }), "GET", orders, "filter[status]=pending", undefined],
        ["Fetch an order", () => mailerlite.ecommerce.orders.find("1", "9"), "GET", `${orders}/9`, "", undefined],
        ["Create an order", () => mailerlite.ecommerce.orders.create("1", order), "POST", orders, "", order],
        ["Update an order", () => mailerlite.ecommerce.orders.update("1", "9", { status: "complete" }), "PUT", `${orders}/9`, "", { status: "complete" }],
        ["Delete an order", () => mailerlite.ecommerce.orders.delete("1", "9"), "DELETE", `${orders}/9`, "", undefined],
    ] as const)("%s", async (_, call, method, path, query, body) => {
        await call();

        expect(lastRequest(axiosMock)).toEqual({ method, path, query, body });
    });

    it("rejects a numeric order id", () => {
        expect(() => mailerlite.ecommerce.orders.find("1", 9 as never)).toThrow("ID must be of type string");
    });
});
