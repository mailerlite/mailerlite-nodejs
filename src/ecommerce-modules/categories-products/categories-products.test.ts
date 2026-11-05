import { describe, it, expect, vi } from "vitest";

const axiosMock = vi.hoisted(() => vi.fn(() => Promise.resolve({ data: {} })));
vi.mock("axios", () => ({ default: axiosMock }));

import { mockClient, lastRequest } from "../../utils/request-mock";

const mailerlite = mockClient();
const shop = "/api/ecommerce/shops/1";

describe("E-commerce category products requests", () => {
    it.each([
        ["Get the products of a category", () => mailerlite.ecommerce.categoriesProducts.getProducts("1", "5", { limit: 10 }), "GET", `${shop}/categories/5/products`, "limit=10", undefined],
        ["Assign a product to a category", () => mailerlite.ecommerce.categoriesProducts.assignProduct("1", "5", "7"), "PUT", `${shop}/categories/5/products/7`, "", undefined],
        ["Assign multiple categories to a product", () => mailerlite.ecommerce.categoriesProducts.assignCategories("1", "7", { categories: ["5"], replace: true }), "PUT", `${shop}/products/7/categories/multiple`, "", { categories: ["5"], replace: true }],
        ["Unassign a product from a category", () => mailerlite.ecommerce.categoriesProducts.unassignProduct("1", "5", "7"), "DELETE", `${shop}/categories/5/products/7`, "", undefined],
    ] as const)("%s", async (_, call, method, path, query, body) => {
        await call();

        expect(lastRequest(axiosMock)).toEqual({ method, path, query, body });
    });

    it("rejects a numeric product id", () => {
        expect(() => mailerlite.ecommerce.categoriesProducts.assignProduct("1", "5", 7 as never)).toThrow("ID must be of type string");
    });
});
