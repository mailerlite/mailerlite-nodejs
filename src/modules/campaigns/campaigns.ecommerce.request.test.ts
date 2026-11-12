import { describe, it, expect, vi } from "vitest";

const axiosMock = vi.hoisted(() => vi.fn(() => Promise.resolve({ data: {} })));
vi.mock("axios", () => ({ default: axiosMock }));

import { mockClient, lastRequest } from "../../utils/request-mock";

const mailerlite = mockClient();

describe("Campaign e-commerce report requests", () => {
    it.each([
        ["Get campaign e-commerce stats", () => mailerlite.campaigns.getEcommerceStats("5", { shop_id: "1" }), "/api/campaigns/5/reports/ecommerce", "shop_id=1"],
        ["Get campaign e-commerce orders", () => mailerlite.campaigns.getEcommerceOrders("5", { shop_id: "1", limit: 10 }), "/api/campaigns/5/reports/ecommerce/orders", "shop_id=1&limit=10"],
    ] as const)("%s", async (_, call, path, query) => {
        await call();

        expect(lastRequest(axiosMock)).toEqual({ method: "GET", path, query, body: undefined });
    });

    it("rejects a numeric campaign id", () => {
        expect(() => mailerlite.campaigns.getEcommerceStats(5 as never, { shop_id: "1" })).toThrow("ID must be of type string");
    });
});
