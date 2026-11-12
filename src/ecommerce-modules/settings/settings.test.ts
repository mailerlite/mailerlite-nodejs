import { describe, it, expect, vi } from "vitest";

const axiosMock = vi.hoisted(() => vi.fn(() => Promise.resolve({ data: {} })));
vi.mock("axios", () => ({ default: axiosMock }));

import { mockClient, lastRequest } from "../../utils/request-mock";
import type { EcommerceSettingsResponse } from "./settings.types";

const mailerlite = mockClient();

describe("E-commerce settings requests", () => {
    it("Get e-commerce tracking settings", async () => {
        await mailerlite.ecommerce.settings.get();

        expect(lastRequest(axiosMock)).toEqual({ method: "GET", path: "/api/ecommerce/settings", query: "", body: undefined });
    });
});

describe("E-commerce settings responses", () => {
    // Documented response sample, typed so tsc fails when EcommerceSettingsResponse drifts from the API
    it("returns the tracking settings", async () => {
        const sample: EcommerceSettingsResponse = {
            data: {
                ecommerce_tracking_in_campaigns: false,
                ecommerce_tracking_in_automations: true,
                ecommerce_attribution_window: 30
            }
        };
        axiosMock.mockResolvedValueOnce({ data: sample });

        const { data } = await mailerlite.ecommerce.settings.get();

        expect(data).toEqual(sample);
    });
});
