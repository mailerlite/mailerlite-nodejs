import { describe, it, expect, vi } from "vitest";

const axiosMock = vi.hoisted(() => vi.fn(() => Promise.resolve({ data: {} })));
vi.mock("axios", () => ({ default: axiosMock }));

import { mockClient, lastRequest } from "../../utils/request-mock";

const mailerlite = mockClient();

describe("Automation emails", () => {
    it("Get automation email content", async () => {
        await mailerlite.automationEmails.getContent("1", "2");

        expect(lastRequest(axiosMock)).toMatchObject({ method: "GET", path: "/api/automations/1/emails/2/content" });
    });

    it("Set automation email content", async () => {
        await mailerlite.automationEmails.updateContent("1", "2", { html: "<p>Hi</p>" });

        expect(lastRequest(axiosMock)).toEqual({ method: "PUT", path: "/api/automations/1/emails/2/content", query: "", body: { html: "<p>Hi</p>" } });
    });

    it("Get automation email stats", async () => {
        await mailerlite.automationEmails.getReportStats("1", "2", { start_date: "2026-01-01", end_date: "2026-01-31" });

        expect(lastRequest(axiosMock)).toEqual({
            method: "GET",
            path: "/api/automations/1/emails/2/report-stats",
            query: "start_date=2026-01-01&end_date=2026-01-31",
            body: undefined,
        });
    });

    it("Get automation email e-commerce stats", async () => {
        await mailerlite.automationEmails.getEcommerceOverviewStats("1", "2", { start_date: "2026-01-01", end_date: "2026-01-31", shop_id: "3" });

        expect(lastRequest(axiosMock)).toEqual({
            method: "GET",
            path: "/api/automations/1/emails/2/ecommerce-overview-stats",
            query: "start_date=2026-01-01&end_date=2026-01-31&shop_id=3",
            body: undefined,
        });
    });

    it("List automation email unsubscribe reasons", async () => {
        await mailerlite.automationEmails.getUnsubscribeReasons("1", "2");

        expect(lastRequest(axiosMock)).toMatchObject({ method: "GET", path: "/api/automations/1/emails/2/unsubscribe-reasons" });
    });
});
