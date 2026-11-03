import { describe, it, expect, vi } from "vitest";

const axiosMock = vi.hoisted(() => vi.fn(() => Promise.resolve({ data: {} })));
vi.mock("axios", () => ({ default: axiosMock }));

import { mockClient, lastRequest } from "../../utils/request-mock";

const mailerlite = mockClient();

describe("Automation reports", () => {
    it("Get automation step run counts", async () => {
        await mailerlite.automationReports.getStepRunCounts("1");

        expect(lastRequest(axiosMock)).toMatchObject({ method: "GET", path: "/api/automations/1/steps/run-counts" });
    });

    it("Get run counts for an automation step", async () => {
        await mailerlite.automationReports.findStepRunCounts("1", "2");

        expect(lastRequest(axiosMock)).toMatchObject({ method: "GET", path: "/api/automations/1/steps/run-counts/2" });
    });

    it("Get automation trigger run counts", async () => {
        await mailerlite.automationReports.getTriggerRunCounts("1");

        expect(lastRequest(axiosMock)).toMatchObject({ method: "GET", path: "/api/automations/1/triggers/run-counts" });
    });

    it("Get run counts for an automation trigger", async () => {
        await mailerlite.automationReports.findTriggerRunCounts("1", "2");

        expect(lastRequest(axiosMock)).toMatchObject({ method: "GET", path: "/api/automations/1/triggers/run-counts/2" });
    });

    it("List automation A/B test stats", async () => {
        await mailerlite.automationReports.getAbStepsStats("1");

        expect(lastRequest(axiosMock)).toMatchObject({ method: "GET", path: "/api/automations/1/ab-steps-stats" });
    });

    it("Get automation A/B test stats", async () => {
        await mailerlite.automationReports.findAbStepStats("1", "2");

        expect(lastRequest(axiosMock)).toMatchObject({ method: "GET", path: "/api/automations/1/ab-steps-stats/2" });
    });

    it("List subscribers on an automation step", async () => {
        await mailerlite.automationReports.getStepSubscribers("1", "2", { status: "completed", filter: { search: "a@b.c" }, sort: "-email", limit: 1, page: 2 });

        expect(lastRequest(axiosMock)).toEqual({
            method: "GET",
            path: "/api/automations/1/activity/steps/2/subscribers",
            query: "status=completed&filter[search]=a%40b.c&sort=-email&limit=1&page=2",
            body: undefined,
        });
    });

    it("List subscribers on an automation trigger", async () => {
        await mailerlite.automationReports.getTriggerSubscribers("1", "2", { status: "queued" });

        expect(lastRequest(axiosMock)).toEqual({ method: "GET", path: "/api/automations/1/activity/triggers/2/subscribers", query: "status=queued", body: undefined });
    });

    it("List automation orders", async () => {
        await mailerlite.automationReports.getOrderActivity("1", { time_frame: "custom", time_frame_start: "2026-01-01", time_frame_end: "2026-01-31", ecommerce_shop_id: "3" });

        expect(lastRequest(axiosMock)).toEqual({
            method: "GET",
            path: "/api/automations/1/order-activity",
            query: "time_frame=custom&time_frame_start=2026-01-01&time_frame_end=2026-01-31&ecommerce_shop_id=3",
            body: undefined,
        });
    });

    it("Get automation email totals", async () => {
        await mailerlite.automationReports.getMonthlyEmailTotals("1", { start_date: "2026-01-01", end_date: "2026-01-31" });

        expect(lastRequest(axiosMock)).toEqual({
            method: "GET",
            path: "/api/automations/1/monthly-totals/email",
            query: "start_date=2026-01-01&end_date=2026-01-31",
            body: undefined,
        });
    });

    it("Get automation e-commerce totals", async () => {
        await mailerlite.automationReports.getMonthlyEcommerceTotals("1", { shop_id: "3" });

        expect(lastRequest(axiosMock)).toEqual({ method: "GET", path: "/api/automations/1/monthly-totals/ecommerce", query: "shop_id=3", body: undefined });
    });
});
