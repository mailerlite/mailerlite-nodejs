import { describe, it, expect, vi } from "vitest";

const axiosMock = vi.hoisted(() => vi.fn(() => Promise.resolve({ data: {} })));
vi.mock("axios", () => ({ default: axiosMock }));

import { mockClient, lastRequest } from "../../utils/request-mock";
import type { ListShopsResponse, ShopStatsResponse } from "./shops.types";

const mailerlite = mockClient();

describe("E-commerce shops requests", () => {
    it.each([
        ["List shops", () => mailerlite.ecommerce.shops.get({ limit: 10 }), "GET", "/api/ecommerce/shops", "limit=10", undefined],
        ["Fetch a shop", () => mailerlite.ecommerce.shops.find("1"), "GET", "/api/ecommerce/shops/1", "", undefined],
        ["Create a shop", () => mailerlite.ecommerce.shops.create({ name: "Shop", url: "https://shop.example.com", currency: "EUR" }), "POST", "/api/ecommerce/shops", "", { name: "Shop", url: "https://shop.example.com", currency: "EUR" }],
        ["Update a shop", () => mailerlite.ecommerce.shops.update("1", { name: "New" }), "PUT", "/api/ecommerce/shops/1", "", { name: "New" }],
        ["Delete a shop", () => mailerlite.ecommerce.shops.delete("1"), "DELETE", "/api/ecommerce/shops/1", "", undefined],
        ["Fetch shop stats", () => mailerlite.ecommerce.shops.getStats("1", { start_date: "2026-10-01", end_date: "2026-10-31" }), "GET", "/api/ecommerce/shops/1/reports/stats", "start_date=2026-10-01&end_date=2026-10-31", undefined],
    ] as const)("%s", async (_, call, method, path, query, body) => {
        await call();

        expect(lastRequest(axiosMock)).toEqual({ method, path, query, body });
    });

    it("rejects a numeric shop id", () => {
        expect(() => mailerlite.ecommerce.shops.find(1 as never)).toThrow("ID must be of type string");
    });
});

describe("E-commerce shops responses", () => {
    // Documented response sample, typed so tsc fails when ListShopsResponse drifts from the API
    it("returns a shop list", async () => {
        const sample: ListShopsResponse = {
            data: [
                {
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
                    updated_at: "2021-09-01 14:03:50",
                    currency_sign: "$"
                }
            ],
            links: {
                first: "https://connect.mailerlite.com/api/ecommerce/shops?page=1",
                last: "https://connect.mailerlite.com/api/ecommerce/shops?page=1",
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
                        url: "https://connect.mailerlite.com/api/ecommerce/shops?page=1",
                        label: "1",
                        active: true
                    },
                    {
                        url: null,
                        label: "Next &raquo;",
                        active: false
                    }
                ],
                path: "https://connect.mailerlite.com/api/ecommerce/shops",
                per_page: 50,
                to: 1,
                total: 1
            }
        };
        axiosMock.mockResolvedValueOnce({ data: sample });

        const { data } = await mailerlite.ecommerce.shops.get({});

        expect(data).toEqual(sample);
    });

    // Documented response sample, typed so tsc fails when ShopStatsResponse drifts from the API
    it("returns shop stats", async () => {
        const sample: ShopStatsResponse = {
            data: {
                ecommerce: {
                    orders_count: 4,
                    revenue: 40,
                    average_order_value: 10,
                    conversion_rate: "0%"
                },
                series: [
                    {
                        date: "2026-01-01",
                        campaign_orders_count: 3,
                        automation_orders_count: 1,
                        automation_revenue: 10,
                        campaign_revenue: 30
                    }
                ]
            }
        };
        axiosMock.mockResolvedValueOnce({ data: sample });

        const { data } = await mailerlite.ecommerce.shops.getStats("1", { start_date: "2026-01-01", end_date: "2026-01-01" });

        expect(data).toEqual(sample);
    });
});
