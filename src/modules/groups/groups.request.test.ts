import { describe, it, expect, vi } from "vitest";

const axiosMock = vi.hoisted(() => vi.fn(() => Promise.resolve({ data: {} })));
vi.mock("axios", () => ({ default: axiosMock }));

import { mockClient, lastRequest } from "../../utils/request-mock";

const mailerlite = mockClient();

describe("Groups requests", () => {
    it("Get subscribers belonging to a group sends include", async () => {
        await mailerlite.groups.getSubscribers("1", { filter: { status: "active" }, include: "groups", limit: 1, cursor: "abc" });

        expect(lastRequest(axiosMock)).toEqual({
            method: "GET",
            path: "/api/groups/1/subscribers",
            query: "filter[status]=active&include=groups&limit=1&cursor=abc",
            body: undefined,
        });
    });

    it("Import bulk subscribers to group", async () => {
        await mailerlite.groups.importSubscribers("1", {
            subscribers: [{ email: "a@b.c", name: "A", fields: { company: "Acme" } }],
            resubscribe: false,
            trigger_automations: false,
        });

        expect(lastRequest(axiosMock)).toEqual({
            method: "POST",
            path: "/api/groups/1/import-subscribers",
            query: "",
            body: { subscribers: [{ email: "a@b.c", name: "A", fields: { company: "Acme" } }], resubscribe: false, trigger_automations: false },
        });
    });

    it.each([
        ["assignSubscriber", "POST"],
        ["unAssignSubscriber", "DELETE"],
    ] as const)("%s encodes the subscriber email in the path", async (method, httpMethod) => {
        await mailerlite.groups[method]("a+b@c.d", "2");

        expect(lastRequest(axiosMock)).toMatchObject({ method: httpMethod, path: "/api/subscribers/a%2Bb%40c.d/groups/2" });
    });
});
