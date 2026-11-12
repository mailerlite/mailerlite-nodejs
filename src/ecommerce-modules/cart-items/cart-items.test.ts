import { describe, it, expect, vi } from "vitest";

const axiosMock = vi.hoisted(() => vi.fn(() => Promise.resolve({ data: {} })));
vi.mock("axios", () => ({ default: axiosMock }));

import { mockClient, lastRequest } from "../../utils/request-mock";
import type { ListCartItemsResponse } from "./cart-items.types";

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

describe("E-commerce cart items responses", () => {
    // Documented response sample, typed so tsc fails when ListCartItemsResponse drifts from the API
    it("returns a cart item list", async () => {
        const sample: ListCartItemsResponse = {
            data: [
                {
                    id: "45676855678345",
                    product: {
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
                    },
                    ecommerce_product_variant_id: null,
                    variant: "product variant",
                    quantity: 1,
                    price: 123.4
                }
            ],
            links: {
                first: "https://connect.mailerlite.com/api/ecommerce/shops/:shop_id/carts/:cart_id/items?page=1",
                last: "https://connect.mailerlite.com/api/ecommerce/shops/:shop_id/carts/:cart_id/items?page=1",
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
                        url: "https://connect.mailerlite.com/api/ecommerce/shops/:shop_id/carts/:cart_id/items?page=1",
                        label: "1",
                        active: true
                    },
                    {
                        url: null,
                        label: "Next &raquo;",
                        active: false
                    }
                ],
                path: "https://connect.mailerlite.com/api/ecommerce/shops/:shop_id/carts/:cart_id/items",
                per_page: 100,
                to: 1,
                total: 1
            }
        };
        axiosMock.mockResolvedValueOnce({ data: sample });

        const { data } = await mailerlite.ecommerce.cartItems.get("1", "2", {});

        expect(data).toEqual(sample);
    });
});
