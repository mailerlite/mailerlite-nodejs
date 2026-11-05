import { describe, it, expect, vi } from "vitest";

const axiosMock = vi.hoisted(() => vi.fn(() => Promise.resolve({ data: {} })));
vi.mock("axios", () => ({ default: axiosMock }));

import { mockClient, lastRequest } from "../../utils/request-mock";

const mailerlite = mockClient();
const items = "/api/ecommerce/shops/1/carts/4/items";

describe("E-commerce cart items requests", () => {
    it.each([
        ["Get the items of a cart", () => mailerlite.ecommerce.cartItems.get("1", "4", { limit: 10 }), "GET", items, "limit=10", undefined],
        ["Fetch a cart item", () => mailerlite.ecommerce.cartItems.find("1", "4", "8"), "GET", `${items}/8`, "", undefined],
        ["Add a cart item", () => mailerlite.ecommerce.cartItems.create("1", "4", { ecommerce_product_id: "7", quantity: 1 }), "POST", items, "", { ecommerce_product_id: "7", quantity: 1 }],
        ["Update a cart item", () => mailerlite.ecommerce.cartItems.update("1", "4", "8", { quantity: 2 }), "PUT", `${items}/8`, "", { quantity: 2 }],
        ["Delete a cart item", () => mailerlite.ecommerce.cartItems.delete("1", "4", "8"), "DELETE", `${items}/8`, "", undefined],
    ] as const)("%s", async (_, call, method, path, query, body) => {
        await call();

        expect(lastRequest(axiosMock)).toEqual({ method, path, query, body });
    });

    it("rejects a numeric cart item id", () => {
        expect(() => mailerlite.ecommerce.cartItems.find("1", "4", 8 as never)).toThrow("ID must be of type string");
    });
});
