import { describe, it, expect, vi } from "vitest";

const axiosMock = vi.hoisted(() => vi.fn(() => Promise.resolve({ data: {} })));
vi.mock("axios", () => ({ default: axiosMock }));

import { mockClient, lastRequest } from "../../utils/request-mock";

const mailerlite = mockClient();

describe("E-commerce settings requests", () => {
    it("Get e-commerce tracking settings", async () => {
        await mailerlite.ecommerce.settings.get();

        expect(lastRequest(axiosMock)).toEqual({ method: "GET", path: "/api/ecommerce/settings", query: "", body: undefined });
    });
});
