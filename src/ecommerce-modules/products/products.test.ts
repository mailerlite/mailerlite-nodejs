import { describe, it, expect, vi } from "vitest";

const axiosMock = vi.hoisted(() => vi.fn(() => Promise.resolve({ data: {} })));
vi.mock("axios", () => ({ default: axiosMock }));

import { mockClient, lastRequest } from "../../utils/request-mock";

const mailerlite = mockClient();
const products = "/api/ecommerce/shops/1/products";

describe("E-commerce products requests", () => {
    it.each([
        ["Get products", () => mailerlite.ecommerce.products.get("1", { filter: { enabled: true }, sort: "-created_at" }), "GET", products, "filter[enabled]=1&sort=-created_at", undefined],
        ["Fetch a product", () => mailerlite.ecommerce.products.find("1", "7"), "GET", `${products}/7`, "", undefined],
        ["Create a product", () => mailerlite.ecommerce.products.create("1", { name: "Hat", price: 19.99 }), "POST", products, "", { name: "Hat", price: 19.99 }],
        ["Update a product", () => mailerlite.ecommerce.products.update("1", "7", { price: 24.99 }), "PUT", `${products}/7`, "", { price: 24.99 }],
        ["Delete a product", () => mailerlite.ecommerce.products.delete("1", "7"), "DELETE", `${products}/7`, "", undefined],
        ["Enable or disable a product", () => mailerlite.ecommerce.products.changeStatus("1", "7", { status: false }), "PUT", `${products}/7/change-status`, "", { status: false }],
    ] as const)("%s", async (_, call, method, path, query, body) => {
        await call();

        expect(lastRequest(axiosMock)).toEqual({ method, path, query, body });
    });

    it("rejects a numeric product id", () => {
        expect(() => mailerlite.ecommerce.products.find("1", 7 as never)).toThrow("ID must be of type string");
    });
});
