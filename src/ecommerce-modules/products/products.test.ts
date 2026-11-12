import { describe, it, expect, vi } from "vitest";

const axiosMock = vi.hoisted(() => vi.fn(() => Promise.resolve({ data: {} })));
vi.mock("axios", () => ({ default: axiosMock }));

import { mockClient, lastRequest } from "../../utils/request-mock";
import type { ListProductsResponse } from "./products.types";

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

describe("E-commerce products responses", () => {
    // Documented response sample, typed so tsc fails when ListProductsResponse drifts from the API
    it("returns a product list", async () => {
        const sample: ListProductsResponse = {
            data: [
                {
                    id: "31986843543567834",
                    name: "Product name",
                    price: 123.4,
                    url: "https://shop-url.com/product-name",
                    image: "https://shop-url.com/product-image.jpg",
                    exclude_from_automations: false,
                    enabled: true,
                    short_description: "Product's short description.",
                    description: "Product's longer description.",
                    categories: [
                        {
                            id: "1234566457534276",
                            name: "Category 1",
                            exclude_from_automations: false,
                            created_at: "2021-09-01 14:03:50",
                            updated_at: "2021-09-01 14:03:50"
                        }
                    ],
                    variants: []
                }
            ],
            links: {
                first: "https://connect.mailerlite.com/api/ecommerce/shops/:shop_id/products?page=1",
                last: "https://connect.mailerlite.com/api/ecommerce/shops/:shop_id/products?page=1",
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
                        url: "https://connect.mailerlite.com/api/ecommerce/shops/:shop_id/products?page=1",
                        label: "1",
                        active: true
                    },
                    {
                        url: null,
                        label: "Next &raquo;",
                        active: false
                    }
                ],
                path: "https://connect.mailerlite.com/api/ecommerce/shops/:shop_id/products",
                per_page: 100,
                to: 1,
                total: 1
            }
        };
        axiosMock.mockResolvedValueOnce({ data: sample });

        const { data } = await mailerlite.ecommerce.products.get("1", {});

        expect(data).toEqual(sample);
    });
});
