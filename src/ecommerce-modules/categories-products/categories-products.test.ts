import { describe, it, expect, vi } from "vitest";

const axiosMock = vi.hoisted(() => vi.fn(() => Promise.resolve({ data: {} })));
vi.mock("axios", () => ({ default: axiosMock }));

import { mockClient, lastRequest } from "../../utils/request-mock";
import type { ListCategoryProductsResponse } from "./categories-products.types";

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

describe("E-commerce category products responses", () => {
    // Documented response sample, typed so tsc fails when ListCategoryProductsResponse drifts from the API
    it("returns a category's product list", async () => {
        const sample: ListCategoryProductsResponse = {
            data: [
                {
                    id: "31986843543567834",
                    name: "Product name",
                    price: 123.4,
                    url: "https://shop-url.com/product-name",
                    image: "https://shop-url.com/product-image.jpg",
                    exclude_from_automations: false,
                    enabled: true,
                    categories: [
                        {
                            id: "1234566457534276",
                            name: "Category 1",
                            exclude_from_automations: false,
                            created_at: "2021-09-01 14:03:50",
                            updated_at: "2021-09-01 14:03:50"
                        }
                    ]
                }
            ],
            links: {
                first: "https://connect.mailerlite.com/api/ecommerce/shops/:shop_id/categories/:category_id/products?page=1",
                last: "https://connect.mailerlite.com/api/ecommerce/shops/:shop_id/categories/:category_id/products?page=1",
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
                        url: "https://connect.mailerlite.com/api/ecommerce/shops/:shop_id/categories/:category_id/products?page=1",
                        label: "1",
                        active: true
                    },
                    {
                        url: null,
                        label: "Next &raquo;",
                        active: false
                    }
                ],
                path: "https://connect.mailerlite.com/api/ecommerce/shops/:shop_id/categories/:category_id/products",
                per_page: 100,
                to: 1,
                total: 1
            }
        };
        axiosMock.mockResolvedValueOnce({ data: sample });

        const { data } = await mailerlite.ecommerce.categoriesProducts.getProducts("1", "3", {});

        expect(data).toEqual(sample);
    });
});
