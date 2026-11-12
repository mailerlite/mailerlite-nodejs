import { describe, it, expect, vi } from "vitest";

const axiosMock = vi.hoisted(() => vi.fn(() => Promise.resolve({ data: {} })));
vi.mock("axios", () => ({ default: axiosMock }));

import { mockClient, lastRequest } from "../../utils/request-mock";
import type { ListCustomersResponse } from "./customers.types";

const mailerlite = mockClient();
const customers = "/api/ecommerce/shops/1/customers";

describe("E-commerce customers requests", () => {
    it.each([
        ["Get customers", () => mailerlite.ecommerce.customers.get("1", { filter: { email: "a@b.test" } }), "GET", customers, "filter[email]=a%40b.test", undefined],
        ["Fetch a customer", () => mailerlite.ecommerce.customers.find("1", "3"), "GET", `${customers}/3`, "", undefined],
        ["Create a customer", () => mailerlite.ecommerce.customers.create("1", { email: "a@b.test", create_subscriber: false }), "POST", customers, "", { email: "a@b.test", create_subscriber: false }],
        ["Update a customer", () => mailerlite.ecommerce.customers.update("1", "3", { accepts_marketing: true }), "PUT", `${customers}/3`, "", { accepts_marketing: true }],
        ["Delete a customer", () => mailerlite.ecommerce.customers.delete("1", "3"), "DELETE", `${customers}/3`, "", undefined],
    ] as const)("%s", async (_, call, method, path, query, body) => {
        await call();

        expect(lastRequest(axiosMock)).toEqual({ method, path, query, body });
    });

    it("rejects a numeric customer id", () => {
        expect(() => mailerlite.ecommerce.customers.find("1", 3 as never)).toThrow("ID must be of type string");
    });
});

describe("E-commerce customers responses", () => {
    // Documented response sample, typed so tsc fails when ListCustomersResponse drifts from the API
    it("returns a customer list", async () => {
        const sample: ListCustomersResponse = {
            data: [
                {
                    id: "319868430643456756",
                    email: "customer@email.com",
                    accepts_marketing: true,
                    total_spent: 1234.99,
                    orders_count: 3,
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
                    },
                    created_at: "2021-09-01 14:03:50",
                    updated_at: "2021-09-01 14:03:50"
                }
            ],
            links: {
                first: "https://connect.mailerlite.com/api/ecommerce/shops/:shop_id/customers?page=1",
                last: "https://connect.mailerlite.com/api/ecommerce/shops/:shop_id/customers?page=1",
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
                        url: "https://connect.mailerlite.com/api/ecommerce/shops/:shop_id/customers?page=1",
                        label: "1",
                        active: true
                    },
                    {
                        url: null,
                        label: "Next &raquo;",
                        active: false
                    }
                ],
                path: "https://connect.mailerlite.com/api/ecommerce/shops/:shop_id/customers",
                per_page: 100,
                to: 1,
                total: 1
            }
        };
        axiosMock.mockResolvedValueOnce({ data: sample });

        const { data } = await mailerlite.ecommerce.customers.get("1", {});

        expect(data).toEqual(sample);
    });
});
