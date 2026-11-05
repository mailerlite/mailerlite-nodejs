import { describe, it, expect, vi } from "vitest";

const axiosMock = vi.hoisted(() => vi.fn(() => Promise.resolve({ data: {} })));
vi.mock("axios", () => ({ default: axiosMock }));

import { mockClient, lastRequest } from "../../utils/request-mock";

const mailerlite = mockClient();
const variants = "/api/ecommerce/shops/1/products/7/variants";
const variant = { name: "Large", attributes: { size: "L" }, resource_id: "variant-1" };

describe("E-commerce product variants requests", () => {
    it.each([
        ["Get product variants", () => mailerlite.ecommerce.productVariants.get("1", "7"), "GET", variants, "", undefined],
        ["Create product variants", () => mailerlite.ecommerce.productVariants.create("1", "7", [variant]), "POST", variants, "", [variant]],
        ["Update a product variant", () => mailerlite.ecommerce.productVariants.update("1", "7", "3", { name: "Extra large", attributes: { size: "XL" } }), "PUT", `${variants}/3`, "", { name: "Extra large", attributes: { size: "XL" } }],
        ["Delete a product variant", () => mailerlite.ecommerce.productVariants.delete("1", "7", "3"), "DELETE", `${variants}/3`, "", undefined],
    ] as const)("%s", async (_, call, method, path, query, body) => {
        await call();

        expect(lastRequest(axiosMock)).toEqual({ method, path, query, body });
    });

    it("rejects a numeric variant id", () => {
        expect(() => mailerlite.ecommerce.productVariants.delete("1", "7", 3 as never)).toThrow("ID must be of type string");
    });
});
