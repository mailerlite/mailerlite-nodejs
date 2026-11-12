import { describe, it, expect, vi } from "vitest";

const axiosMock = vi.hoisted(() => vi.fn(() => Promise.resolve({ data: {} })));
vi.mock("axios", () => ({ default: axiosMock }));

import { mockClient, lastRequest } from "../../utils/request-mock";
import type { ListCartsResponse } from "./carts.types";

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

describe("E-commerce carts responses", () => {
    // Documented response sample, typed so tsc fails when ListCartsResponse drifts from the API
    it("returns a cart list", async () => {
        const sample: ListCartsResponse = {
            data: [
                {
                    id: "12564435675647",
                    resource_id: "cart-1",
                    ecommerce_order_id: "3456678978907",
                    checkout_url: "https://url-to-cart-checkout.com",
                    cart_total: 1234.99,
                    customer: {
                        id: "319868430643456756",
                        email: "customer@email.com",
                        accepts_marketing: true,
                        total_spent: 123.4,
                        orders_count: 1,
                        subscriber: {
                            id: "31986843064993537",
                            email: "customer@email.com",
                            status: "active",
                            source: "api",
                            sent: 0,
                            opens_count: 0,
                            clicks_count: 0,
                            open_rate: 0,
                            click_rate: 0,
                            ip_address: null,
                            subscribed_at: "2021-09-01 14:03:50",
                            unsubscribed_at: null,
                            created_at: "2021-09-01 14:03:50",
                            updated_at: "2021-09-01 14:03:50",
                            fields: {
                                city: null,
                                company: null,
                                country: null,
                                last_name: "Testerson",
                                name: "Dummy",
                                phone: null,
                                state: null,
                                z_i_p: null
                            },
                            groups: [],
                            opted_in_at: null,
                            optin_ip: null
                        }
                    },
                    items: [
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
                            variant: "product variant",
                            quantity: 1,
                            price: 123.4
                        }
                    ]
                }
            ],
            links: {
                first: "https://connect.mailerlite.com/api/ecommerce/shops/:shop_id/carts?page=1",
                last: "https://connect.mailerlite.com/api/ecommerce/shops/:shop_id/carts?page=1",
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
                        url: "https://connect.mailerlite.com/api/ecommerce/shops/:shop_id/carts?page=1",
                        label: "1",
                        active: true
                    },
                    {
                        url: null,
                        label: "Next &raquo;",
                        active: false
                    }
                ],
                path: "https://connect.mailerlite.com/api/ecommerce/shops/:shop_id/carts",
                per_page: 100,
                to: 1,
                total: 1
            }
        };
        axiosMock.mockResolvedValueOnce({ data: sample });

        const { data } = await mailerlite.ecommerce.carts.get("1", {});

        expect(data).toEqual(sample);
    });
});
