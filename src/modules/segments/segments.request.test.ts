import { describe, it, expect, vi } from "vitest";

const axiosMock = vi.hoisted(() => vi.fn(() => Promise.resolve({ data: {} })));
vi.mock("axios", () => ({ default: axiosMock }));

import { mockClient, lastRequest } from "../../utils/request-mock";

const mailerlite = mockClient();

describe("Segments requests", () => {
    it("List all segments sends sort and with_filter", async () => {
        await mailerlite.segments.get({ sort: "-name", with_filter: true, limit: 5, page: 2 });

        expect(lastRequest(axiosMock)).toEqual({ method: "GET", path: "/api/segments", query: "sort=-name&with_filter=1&limit=5&page=2", body: undefined });
    });

    it("Get subscribers belonging to a segment sends cursor and keeps after unchanged", async () => {
        await mailerlite.segments.getSubscribers("1", { filter: { status: "active" }, limit: 1, cursor: "abc", after: 5 });

        expect(lastRequest(axiosMock)).toEqual({
            method: "GET",
            path: "/api/segments/1/subscribers",
            query: "filter[status]=active&limit=1&cursor=abc&after=5",
            body: undefined,
        });
    });

    it("Update segment sends filter", async () => {
        const filter = [[{ operator: "in_any", args: ["groups", ["2"]] }]];

        await mailerlite.segments.update("1", { filter });

        expect(lastRequest(axiosMock)).toEqual({ method: "PUT", path: "/api/segments/1", query: "", body: { filter } });
    });
});
