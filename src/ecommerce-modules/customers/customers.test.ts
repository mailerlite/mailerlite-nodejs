import { describe, it, expect, vi } from "vitest";

const axiosMock = vi.hoisted(() => vi.fn(() => Promise.resolve({ data: {} })));
vi.mock("axios", () => ({ default: axiosMock }));

import { mockClient, lastRequest } from "../../utils/request-mock";

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
