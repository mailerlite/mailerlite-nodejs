import { describe, it, expect, vi } from "vitest";

const axiosMock = vi.hoisted(() => vi.fn(() => Promise.resolve({ data: {} })));
vi.mock("axios", () => ({ default: axiosMock }));

import { mockClient, lastRequest } from "../../utils/request-mock";

const mailerlite = mockClient();

describe("Subscribers requests", () => {
    it("List all subscribers sends every documented param in the caller's order", async () => {
        await mailerlite.subscribers.get({
            filter: { form: "9", status: "active", group: "2" },
            start_date: "2026-01-01",
            end_date: "2026-01-31",
            sort: "signup_date",
            include: "groups",
            with_fields: true,
            with_groups: false,
            limit: 1,
            cursor: "abc",
        });

        expect(lastRequest(axiosMock)).toEqual({
            method: "GET",
            path: "/api/subscribers",
            query: "filter[form]=9&filter[status]=active&filter[group]=2&start_date=2026-01-01&end_date=2026-01-31&sort=signup_date&include=groups&with_fields=1&with_groups=0&limit=1&cursor=abc",
            body: undefined,
        });
    });

    it("Create/update subscriber sends resubscribe and notes", async () => {
        await mailerlite.subscribers.createOrUpdate({ email: "a@b.c", resubscribe: true, notes: ["VIP"] });

        expect(lastRequest(axiosMock)).toEqual({
            method: "POST",
            path: "/api/subscribers",
            query: "",
            body: { email: "a@b.c", resubscribe: true, notes: ["VIP"] },
        });
    });

    it("Update a subscriber encodes the email in the path and sends a new email", async () => {
        await mailerlite.subscribers.update("a+b@c.d", { email: "new@c.d", fields: { company: "Acme" } });

        expect(lastRequest(axiosMock)).toEqual({
            method: "PUT",
            path: "/api/subscribers/a%2Bb%40c.d",
            query: "",
            body: { email: "new@c.d", fields: { company: "Acme" } },
        });
    });

    it.each([
        ["find", "GET", "/api/subscribers/a%2Bb%40c.d"],
        ["delete", "DELETE", "/api/subscribers/a%2Bb%40c.d"],
        ["forget", "POST", "/api/subscribers/a%2Bb%40c.d/forget"],
    ] as const)("%s encodes the email in the path", async (method, httpMethod, path) => {
        await mailerlite.subscribers[method]("a+b@c.d");

        expect(lastRequest(axiosMock)).toMatchObject({ method: httpMethod, path });
    });

    it("Fetch subscriber activity", async () => {
        await mailerlite.subscribers.getActivityLog("1", { filter: { log_name: "activated" }, limit: 5, page: 1 });

        expect(lastRequest(axiosMock)).toEqual({
            method: "GET",
            path: "/api/subscribers/1/activity-log",
            query: "filter[log_name]=activated&limit=5&page=1",
            body: undefined,
        });
    });

    it("Get single import", async () => {
        await mailerlite.subscribers.getImport("7");

        expect(lastRequest(axiosMock)).toMatchObject({ method: "GET", path: "/api/subscribers/import/7" });
    });
});
