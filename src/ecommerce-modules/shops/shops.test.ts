import { describe, it, expect, vi } from "vitest";

const axiosMock = vi.hoisted(() => vi.fn(() => Promise.resolve({ data: {} })));
vi.mock("axios", () => ({ default: axiosMock }));

import { mockClient, lastRequest } from "../../utils/request-mock";

const mailerlite = mockClient();

describe("E-commerce shops requests", () => {
    it.each([
        ["List shops", () => mailerlite.ecommerce.shops.get({ limit: 10 }), "GET", "/api/ecommerce/shops", "limit=10", undefined],
        ["Fetch a shop", () => mailerlite.ecommerce.shops.find("1"), "GET", "/api/ecommerce/shops/1", "", undefined],
        ["Create a shop", () => mailerlite.ecommerce.shops.create({ name: "Shop", url: "https://shop.example.com", currency: "EUR" }), "POST", "/api/ecommerce/shops", "", { name: "Shop", url: "https://shop.example.com", currency: "EUR" }],
        ["Update a shop", () => mailerlite.ecommerce.shops.update("1", { name: "New" }), "PUT", "/api/ecommerce/shops/1", "", { name: "New" }],
        ["Delete a shop", () => mailerlite.ecommerce.shops.delete("1"), "DELETE", "/api/ecommerce/shops/1", "", undefined],
        ["Fetch shop stats", () => mailerlite.ecommerce.shops.getStats("1", { start_date: "2026-10-01", end_date: "2026-10-31" }), "GET", "/api/ecommerce/shops/1/reports/stats", "start_date=2026-10-01&end_date=2026-10-31", undefined],
    ] as const)("%s", async (_, call, method, path, query, body) => {
        await call();

        expect(lastRequest(axiosMock)).toEqual({ method, path, query, body });
    });

    it("rejects a numeric shop id", () => {
        expect(() => mailerlite.ecommerce.shops.find(1 as never)).toThrow("ID must be of type string");
    });
});
