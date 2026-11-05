import { describe, it, expect, vi } from "vitest";

const axiosMock = vi.hoisted(() => vi.fn(() => Promise.resolve({ data: {} })));
vi.mock("axios", () => ({ default: axiosMock }));

import { mockClient, lastRequest } from "../../utils/request-mock";

const mailerlite = mockClient();

describe("Automation triggers", () => {
    it("List automation triggers", async () => {
        await mailerlite.automationTriggers.get("1");

        expect(lastRequest(axiosMock)).toMatchObject({ method: "GET", path: "/api/automations/1/triggers" });
    });

    it("Get an automation trigger", async () => {
        await mailerlite.automationTriggers.find("1", "2");

        expect(lastRequest(axiosMock)).toMatchObject({ method: "GET", path: "/api/automations/1/triggers/2" });
    });

    it("Create an automation trigger", async () => {
        await mailerlite.automationTriggers.create("1", { type: "subscriber_joins_group", data: { group_ids: ["3"] } });

        expect(lastRequest(axiosMock)).toEqual({
            method: "POST",
            path: "/api/automations/1/triggers",
            query: "",
            body: { type: "subscriber_joins_group", data: { group_ids: ["3"] } },
        });
    });

    it("Update an automation trigger", async () => {
        await mailerlite.automationTriggers.update("1", "2", { data: { group_ids: ["3"], exclude_group_ids: ["4"] } });

        expect(lastRequest(axiosMock)).toEqual({
            method: "PUT",
            path: "/api/automations/1/triggers/2",
            query: "",
            body: { data: { group_ids: ["3"], exclude_group_ids: ["4"] } },
        });
    });

    it("Encodes ids in the path", async () => {
        await mailerlite.automationTriggers.find("1/x", "2?y");

        expect(lastRequest(axiosMock).path).toBe("/api/automations/1%2Fx/triggers/2%3Fy");
    });

    it("Rejects an empty id before sending", () => {
        axiosMock.mockClear();

        expect(() => mailerlite.automationTriggers.find("", "2")).toThrow("ID must be provided");
        expect(axiosMock).not.toHaveBeenCalled();
    });

    it("Delete an automation trigger", async () => {
        await mailerlite.automationTriggers.delete("1", "2");

        expect(lastRequest(axiosMock)).toMatchObject({ method: "DELETE", path: "/api/automations/1/triggers/2" });
    });
});
