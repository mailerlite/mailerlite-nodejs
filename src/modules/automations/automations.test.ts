import { describe, it, expect, expectTypeOf } from "vitest";
import "dotenv/config";
import MailerLite from '../../index';
import {
    AutomationSubsParams, AutomationSubsResponse,
    GetAutomationsParams, ListAutomationsResponse, SingleAutomationResponse,
} from "./automations.types";
import {handleCatchedError} from "../../utils/helpers";

const MAILERLITE_API_KEY = process.env.API_KEY as string;

if (!MAILERLITE_API_KEY)
    throw "No MailerLite API key found in environment variables";

const mailerlite = new MailerLite({
    api_key: MAILERLITE_API_KEY,
    base_path: "http://localhost:9090",
});

describe("Automations", () => {

    let automationId: string;

    it.concurrent("List all automations", async () => {

        const params: GetAutomationsParams = {
            filter: {
                enabled: true,
                name: "nodejs"
            },
            limit: 10,
            page: 1
        };

        try {
            const response = await mailerlite.automations.get(params);

            expect(response).not.toBeNull();
            expect(response.data).toBeDefined();
            expect(Array.isArray(response.data.data)).toBeTruthy();
            expectTypeOf(response.data).toEqualTypeOf<ListAutomationsResponse>();

            if (response.data.data.length) automationId = response.data.data[0].id;
        } catch (error) {
            handleCatchedError(error);
        }
    });

    it("Get an automation", async () => {
        try {
            const response = await mailerlite.automations.find(automationId);

            expect(response).not.toBeNull();
            expect(response.data).toBeDefined();
            expect(response.data.data).toBeDefined();
            expect(response.data.data.id).not.toBeNull();
            expectTypeOf(response.data).toEqualTypeOf<SingleAutomationResponse>();
        } catch (error) {
            handleCatchedError(error);
        }
    });

    it("Get the subscriber activity for an automation", async () => {

        const params: AutomationSubsParams = {
            filter: {
                status: "active"
            },
            limit: 10,
            page: 1
        };

        try {
            const response = await mailerlite.automations.getAutomationSubscribers(automationId, params);

            expect(response).not.toBeNull();
            expect(response.data).toBeDefined();
            expect(response.data.data).toBeDefined();
            expect(Array.isArray(response.data.data)).toBeTruthy();
            expectTypeOf(response.data).toEqualTypeOf<AutomationSubsResponse>();
        } catch (error) {
            handleCatchedError(error);
        }
    });

});
