import { describe, it, expect, vi } from "vitest";

const axiosMock = vi.hoisted(() => vi.fn(() => Promise.resolve({ data: {} })));
vi.mock("axios", () => ({ default: axiosMock }));

import { mockClient, lastRequest } from "../../utils/request-mock";

const mailerlite = mockClient();
const carts = "/api/ecommerce/shops/1/carts";

describe("E-commerce carts requests", () => {
    it.each([
        ["Get carts", () => mailerlite.ecommerce.carts.get("1", { limit: 10 }), "GET", carts, "limit=10", undefined],
        ["Fetch a cart", () => mailerlite.ecommerce.carts.find("1", "4"), "GET", `${carts}/4`, "", undefined],
        ["Update a cart", () => mailerlite.ecommerce.carts.update("1", "4", { checkout_url: "https://shop.example.com/cart" }), "PUT", `${carts}/4`, "", { checkout_url: "https://shop.example.com/cart" }],
    ] as const)("%s", async (_, call, method, path, query, body) => {
        await call();

        expect(lastRequest(axiosMock)).toEqual({ method, path, query, body });
    });

    it("rejects a numeric cart id", () => {
        expect(() => mailerlite.ecommerce.carts.find("1", 4 as never)).toThrow("ID must be of type string");
    });
});
