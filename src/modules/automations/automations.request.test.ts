import { describe, it, expect, vi } from "vitest";

const axiosMock = vi.hoisted(() => vi.fn(() => Promise.resolve({ data: {} })));
vi.mock("axios", () => ({ default: axiosMock }));

import { mockClient, lastRequest } from "../../utils/request-mock";

const mailerlite = mockClient();

describe("Automations requests", () => {
    it("List all automations sends booleans as 1/0 and can turn steps off", async () => {
        await mailerlite.automations.get({ filter: { enabled: true, automation_state: "workflows" }, sort: "-name", with_steps: false });

        expect(lastRequest(axiosMock)).toEqual({
            method: "GET",
            path: "/api/automations",
            query: "filter[enabled]=1&filter[automation_state]=workflows&sort=-name&with_steps=0",
            body: undefined,
        });
    });

    it("Get the subscriber activity formats dates and sends with_subscribers only when true", async () => {
        await mailerlite.automations.getAutomationSubscribers("1", {
            filter: { status: "completed", date_from: new Date(2026, 0, 5), date_to: "2026-01-31", search: "a@b.c" },
            sort: "-date",
            with_subscribers: true,
        });

        expect(lastRequest(axiosMock)).toEqual({
            method: "GET",
            path: "/api/automations/1/activity",
            query: "filter[status]=completed&filter[date_from]=2026-01-05&filter[date_to]=2026-01-31&filter[search]=a%40b.c&sort=-date&with_subscribers=1",
            body: undefined,
        });

        await mailerlite.automations.getAutomationSubscribers("1", { filter: { status: "active" }, with_subscribers: false });

        expect(lastRequest(axiosMock).query).toBe("filter[status]=active");
    });

    it("Get the subscriber activity without params sends the request instead of throwing", async () => {
        const call = mailerlite.automations.getAutomationSubscribers("1", undefined as never);

        await expect(call).resolves.toBeDefined();
        expect(lastRequest(axiosMock)).toMatchObject({ method: "GET", path: "/api/automations/1/activity" });
    });

    it("Create a draft automation", async () => {
        await mailerlite.automations.create({ name: "Welcome" });

        expect(lastRequest(axiosMock)).toEqual({ method: "POST", path: "/api/automations", query: "", body: { name: "Welcome" } });
    });

    it("Update an automation", async () => {
        await mailerlite.automations.update("1", { name: "Renamed", trigger_data: { repeatable: false } });

        expect(lastRequest(axiosMock)).toEqual({
            method: "PUT",
            path: "/api/automations/1",
            query: "",
            body: { name: "Renamed", trigger_data: { repeatable: false } },
        });
    });

    it("Delete an automation", async () => {
        await mailerlite.automations.delete("1");

        expect(lastRequest(axiosMock)).toMatchObject({ method: "DELETE", path: "/api/automations/1" });
    });

    it.each([
        ["copy", "/api/automations/1/copy"],
        ["enable", "/api/automations/1/enable"],
        ["disable", "/api/automations/1/disable"],
    ] as const)("%s an automation", async (method, path) => {
        await mailerlite.automations[method]("1");

        expect(lastRequest(axiosMock)).toMatchObject({ method: "POST", path });
    });

    it("Send an automation test email", async () => {
        await mailerlite.automations.test("1", { email: "a@b.c" });

        expect(lastRequest(axiosMock)).toEqual({ method: "POST", path: "/api/automations/1/test", query: "", body: { email: "a@b.c" } });
    });

    it("Add subscribers to an automation", async () => {
        await mailerlite.automations.addSubscribers("1", { emails: ["a@b.c"], groups: ["2"] });

        expect(lastRequest(axiosMock)).toEqual({
            method: "POST",
            path: "/api/automations/1/add-subscribers",
            query: "",
            body: { emails: ["a@b.c"], groups: ["2"] },
        });
    });

    it("Re-add subscribers to an automation", async () => {
        await mailerlite.automations.readd("1", { readd_subscribers_to: "last_completed_step", filter: { status: "completed", id: ["5"] } });

        expect(lastRequest(axiosMock)).toEqual({
            method: "POST",
            path: "/api/automations/1/readd",
            query: "",
            body: { readd_subscribers_to: "last_completed_step", filter: { status: "completed", id: ["5"] } },
        });
    });

    it("Copy automation subscribers to groups", async () => {
        await mailerlite.automations.addActivityToGroup("1", { destination_groups: ["2"], filter: { status: "completed" } });

        expect(lastRequest(axiosMock)).toEqual({
            method: "POST",
            path: "/api/automations/1/activity/add-to-group",
            query: "",
            body: { destination_groups: ["2"], filter: { status: "completed" } },
        });
    });

    it("Cancel automation runs", async () => {
        await mailerlite.automations.cancelActivity("1", { filter: { status: "active", id: ["5"] } });

        expect(lastRequest(axiosMock)).toEqual({
            method: "POST",
            path: "/api/automations/1/activity/cancel-automation",
            query: "",
            body: { filter: { status: "active", id: ["5"] } },
        });
    });

    it("Skip an automation delay", async () => {
        await mailerlite.automations.skipActivityDelay("1", { filter: { status: "active", id: ["5"] } });

        expect(lastRequest(axiosMock)).toEqual({
            method: "POST",
            path: "/api/automations/1/activity/skip-delay",
            query: "",
            body: { filter: { status: "active", id: ["5"] } },
        });
    });
});
