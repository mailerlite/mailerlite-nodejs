import { describe, it, expect, vi } from "vitest";

const axiosMock = vi.hoisted(() => vi.fn(() => Promise.resolve({ data: {} })));
vi.mock("axios", () => ({ default: axiosMock }));

import { mockClient, lastRequest } from "../../utils/request-mock";

const mailerlite = mockClient();

describe("Automation steps", () => {
    it("List automation steps", async () => {
        await mailerlite.automationSteps.get("1");

        expect(lastRequest(axiosMock)).toMatchObject({ method: "GET", path: "/api/automations/1/steps/index" });
    });

    it("Get an automation step", async () => {
        await mailerlite.automationSteps.find("1", "2");

        expect(lastRequest(axiosMock)).toMatchObject({ method: "GET", path: "/api/automations/1/steps/2" });
    });

    it("Create an automation step", async () => {
        await mailerlite.automationSteps.create("1", { type: "delay", parent_id: "2", data: { unit: "days", value: 2 } });

        expect(lastRequest(axiosMock)).toEqual({
            method: "POST",
            path: "/api/automations/1/steps",
            query: "",
            body: { type: "delay", parent_id: "2", data: { unit: "days", value: 2 } },
        });
    });

    it("Update an automation step", async () => {
        await mailerlite.automationSteps.update("1", "2", { data: { unit: "days", value: 3 }, reschedule_waiting_subscribers: false });

        expect(lastRequest(axiosMock)).toEqual({
            method: "PUT",
            path: "/api/automations/1/steps/2",
            query: "",
            body: { data: { unit: "days", value: 3 }, reschedule_waiting_subscribers: false },
        });
    });

    it("Delete an automation step", async () => {
        await mailerlite.automationSteps.delete("1", "2", { branch_to_delete: "all" });

        expect(lastRequest(axiosMock)).toEqual({ method: "DELETE", path: "/api/automations/1/steps/2", query: "branch_to_delete=all", body: undefined });
    });

    it("Delete an A/B test step sends a path as branch_to_delete", async () => {
        await mailerlite.automationSteps.delete("1", "2", { branch_to_delete: "a_path" });

        expect(lastRequest(axiosMock).query).toBe("branch_to_delete=a_path");
    });

    it("Duplicate an automation step", async () => {
        await mailerlite.automationSteps.copy("1", "2", { parent_id: "3" });

        expect(lastRequest(axiosMock)).toEqual({ method: "POST", path: "/api/automations/1/steps/2/copy", query: "", body: { parent_id: "3" } });
    });

    it("Move an automation step", async () => {
        await mailerlite.automationSteps.reorder("1", { dragged_step_id: "2", new_parent_step_id: "3" });

        expect(lastRequest(axiosMock)).toEqual({
            method: "POST",
            path: "/api/automations/1/steps/reorder",
            query: "",
            body: { dragged_step_id: "2", new_parent_step_id: "3" },
        });
    });

    it("Select the winner of an A/B test step", async () => {
        await mailerlite.automationSteps.selectAbTestWinner("1", "2", { ab_test_winner: "a_path" });

        expect(lastRequest(axiosMock)).toEqual({
            method: "PUT",
            path: "/api/automations/1/steps/2/select-ab-test-winner",
            query: "",
            body: { ab_test_winner: "a_path" },
        });
    });
});
