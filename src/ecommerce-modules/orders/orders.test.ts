import { describe, it, expect, vi } from "vitest";

const axiosMock = vi.hoisted(() => vi.fn(() => Promise.resolve({ data: {} })));
vi.mock("axios", () => ({ default: axiosMock }));

import { mockClient, lastRequest } from "../../utils/request-mock";
import type { ListOrdersResponse } from "./orders.types";

const mailerlite = mockClient();
const orders = "/api/ecommerce/shops/1/orders";
const order = {
    customer: { email: "a@b.test", create_subscriber: false },
    cart: { items: [{ ecommerce_product_id: "7", quantity: 1, price: 19.99 }] },
};

describe("E-commerce orders requests", () => {
    it.each([
        ["Get orders", () => mailerlite.ecommerce.orders.get("1", { filter: { status: "pending" } }), "GET", orders, "filter[status]=pending", undefined],
        ["Fetch an order", () => mailerlite.ecommerce.orders.find("1", "9"), "GET", `${orders}/9`, "", undefined],
        ["Create an order", () => mailerlite.ecommerce.orders.create("1", order), "POST", orders, "", order],
        ["Update an order", () => mailerlite.ecommerce.orders.update("1", "9", { status: "complete" }), "PUT", `${orders}/9`, "", { status: "complete" }],
        ["Delete an order", () => mailerlite.ecommerce.orders.delete("1", "9"), "DELETE", `${orders}/9`, "", undefined],
    ] as const)("%s", async (_, call, method, path, query, body) => {
        await call();

        expect(lastRequest(axiosMock)).toEqual({ method, path, query, body });
    });

    it("rejects a numeric order id", () => {
        expect(() => mailerlite.ecommerce.orders.find("1", 9 as never)).toThrow("ID must be of type string");
    });
});

describe("E-commerce orders responses", () => {
    // Documented response sample, typed so tsc fails when ListOrdersResponse drifts from the API
    it("returns an order list", async () => {
        const sample: ListOrdersResponse = {
            data: [
                {
                    id: "31986843064993537",
                    shop: {
                        id: "31986843064993537",
                        name: "shop name",
                        url: "https://shop-url.com",
                        currency: "USD",
                        enabled: true,
                        enable_popups: false,
                        group: {
                            id: "1",
                            name: "dummy group",
                            total: 20,
                            open_rate: {
                                float: 0,
                                string: "0%"
                            },
                            click_rate: {
                                float: 0,
                                string: "0%"
                            },
                            created_at: "2021-08-06 10:17:45"
                        },
                        created_at: "2021-09-01 14:03:50",
                        updated_at: "2021-09-01 14:03:50"
                    },
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
                    cart: {
                        id: "12564435675647",
                        resource_id: null,
                        checkout_url: "https://url-to-cart-checkout.com",
                        cart_total: 1234.99,
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
                    },
                    total: 123.4,
                    status: "complete",
                    attribution: {
                        email_id: "31986843064993540",
                        type: "campaign"
                    },
                    created_at: "2021-09-01 14:03:50",
                    updated_at: "2021-09-01 14:03:50",
                    completed_at: "2021-09-01 14:03:50"
                }
            ],
            links: {
                first: "https://connect.mailerlite.com/api/ecommerce/shops/:shop_id/orders?page=1",
                last: "https://connect.mailerlite.com/api/ecommerce/shops/:shop_id/orders?page=1",
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
                        url: "https://connect.mailerlite.com/api/ecommerce/shops/:shop_id/orders?page=1",
                        label: "1",
                        active: true
                    },
                    {
                        url: null,
                        label: "Next &raquo;",
                        active: false
                    }
                ],
                path: "https://connect.mailerlite.com/api/ecommerce/shops/:shop_id/orders",
                per_page: 100,
                to: 1,
                total: 1
            }
        };
        axiosMock.mockResolvedValueOnce({ data: sample });

        const { data } = await mailerlite.ecommerce.orders.get("1", {});

        expect(data).toEqual(sample);
    });
});
