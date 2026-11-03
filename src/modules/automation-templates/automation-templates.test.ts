import { describe, it, expect, vi } from "vitest";

const axiosMock = vi.hoisted(() => vi.fn(() => Promise.resolve({ data: {} })));
vi.mock("axios", () => ({ default: axiosMock }));

import { mockClient, lastRequest } from "../../utils/request-mock";

const mailerlite = mockClient();

describe("Automation templates", () => {
    it("List automation templates", async () => {
        await mailerlite.automationTemplates.get({ filter: { type: "welcome", category: "2" }, limit: 5, page: 2 });

        expect(lastRequest(axiosMock)).toEqual({
            method: "GET",
            path: "/api/automation-templates",
            query: "filter[type]=welcome&filter[category]=2&limit=5&page=2",
            body: undefined,
        });
    });

    it("Create an automation from a template", async () => {
        await mailerlite.automationTemplates.select("1");

        expect(lastRequest(axiosMock)).toMatchObject({ method: "POST", path: "/api/automations/select-template/1" });
    });
});
