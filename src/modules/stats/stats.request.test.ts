import { describe, it, expect, vi } from "vitest";

const axiosMock = vi.hoisted(() => vi.fn(() => Promise.resolve({ data: {} })));
vi.mock("axios", () => ({ default: axiosMock }));

import { mockClient, lastRequest } from "../../utils/request-mock";

const mailerlite = mockClient();

describe("Stats requests", () => {
    it("Get the subscriber activity for an automation omits with_subscribers when false", async () => {
        await mailerlite.stats.getAutomationSubscribers("1", { filter: { status: "completed", date_from: new Date(2026, 0, 5) }, with_subscribers: false });

        expect(lastRequest(axiosMock)).toEqual({
            method: "GET",
            path: "/api/automations/1/activity",
            query: "filter[status]=completed&filter[date_from]=2026-01-05",
            body: undefined,
        });
    });

    it("Get the subscriber activity for an automation without params sends the request instead of throwing", async () => {
        await expect(mailerlite.stats.getAutomationSubscribers("1", undefined as never)).resolves.toBeDefined();

        expect(lastRequest(axiosMock).query).toBe("");
    });
});
