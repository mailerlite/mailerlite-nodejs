import { describe, it, expect, vi } from "vitest";

const axiosMock = vi.hoisted(() => vi.fn(() => Promise.resolve({ data: {} })));
vi.mock("axios", () => ({ default: axiosMock }));

import { mockClient, lastRequest } from "../../utils/request-mock";

const mailerlite = mockClient();
const categories = "/api/ecommerce/shops/1/categories";

describe("E-commerce categories requests", () => {
    it.each([
        ["Get categories", () => mailerlite.ecommerce.categories.get("1", { limit: 10 }), "GET", categories, "limit=10", undefined],
        ["Fetch a category", () => mailerlite.ecommerce.categories.find("1", "5"), "GET", `${categories}/5`, "", undefined],
        ["Create a category", () => mailerlite.ecommerce.categories.create("1", { name: "Hats" }), "POST", categories, "", { name: "Hats" }],
        ["Update a category", () => mailerlite.ecommerce.categories.update("1", "5", { name: "Caps" }), "PUT", `${categories}/5`, "", { name: "Caps" }],
        ["Delete a category", () => mailerlite.ecommerce.categories.delete("1", "5"), "DELETE", `${categories}/5`, "", undefined],
    ] as const)("%s", async (_, call, method, path, query, body) => {
        await call();

        expect(lastRequest(axiosMock)).toEqual({ method, path, query, body });
    });

    it("rejects a numeric category id", () => {
        expect(() => mailerlite.ecommerce.categories.find("1", 5 as never)).toThrow("ID must be of type string");
    });
});
