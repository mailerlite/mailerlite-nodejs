import { describe, it, expect, vi } from "vitest";

const axiosMock = vi.hoisted(() => vi.fn(() => Promise.resolve({ data: {} })));
vi.mock("axios", () => ({ default: axiosMock }));

import { mockClient, lastRequest } from "../../utils/request-mock";
import type { ListCategoriesResponse } from "./categories.types";

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

describe("E-commerce categories responses", () => {
    // Documented response sample, typed so tsc fails when ListCategoriesResponse drifts from the API
    it("returns a category list", async () => {
        const sample: ListCategoriesResponse = {
            data: [
                {
                    id: "1234566457534276",
                    name: "Category 1",
                    exclude_from_automations: false,
                    created_at: "2021-09-01 14:03:50",
                    updated_at: "2021-09-01 14:03:50"
                }
            ],
            links: {
                first: "https://connect.mailerlite.com/api/ecommerce/shops/:shop_id/categories?page=1",
                last: "https://connect.mailerlite.com/api/ecommerce/shops/:shop_id/categories?page=1",
                prev: null,
                next: null
            },
            meta: {
                current_page: 1,
                from: 1,
                last_page: 1,
                links: [
                    {
                        url: null,
                        label: "&laquo; Previous",
                        active: false
                    },
                    {
                        url: "https://connect.mailerlite.com/api/ecommerce/shops/:shop_id/categories?page=1",
                        label: "1",
                        active: true
                    },
                    {
                        url: null,
                        label: "Next &raquo;",
                        active: false
                    }
                ],
                path: "https://connect.mailerlite.com/api/ecommerce/shops/:shop_id/categories",
                per_page: 100,
                to: 1,
                total: 1
            }
        };
        axiosMock.mockResolvedValueOnce({ data: sample });

        const { data } = await mailerlite.ecommerce.categories.get("1", {});

        expect(data).toEqual(sample);
    });
});
