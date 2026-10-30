import { describe, it, expect, expectTypeOf } from "vitest";
import { beforeAll, afterAll } from "vitest";
import { AutomationEcommerceStatsResponse, AutomationEmailEcommerceStatsResponse, AutomationEcommerceOrdersResponse, AutomationEmailStep } from "./automations.types";
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

describe("Automation e-commerce reports", () => {

    let shopId: string;
    let automationId: string;
    let emailId: string;

    beforeAll(async () => {
        const response = await mailerlite.ecommerce.shops.create({ name: "Test shop nodejs automations-reports", url: "https://shop.example.com", currency: "EUR" });
        shopId = response.data.data.id;

        const automations = await mailerlite.automations.get({ limit: 25 });
        const automation = automations.data.data.find(automation => automation.steps.some(step => "email_id" in step));
        if (automation) {
            automationId = automation.id;
            emailId = (automation.steps.find(step => "email_id" in step) as AutomationEmailStep).email_id;
        }
    }, 30000);

    afterAll(async () => {
        await mailerlite.ecommerce.shops.delete(shopId);
    });

    it("Get automation e-commerce stats", async ({ skip }) => {
        skip(!automationId);

        try {
            const response = await mailerlite.automations.getEcommerceStats(automationId, { shop_id: shopId });

            expect(response).not.toBeNull();
            expect(response.data.data).toBeDefined();
            expectTypeOf(response.data).toEqualTypeOf<AutomationEcommerceStatsResponse>()
        } catch (error) {
            handleCatchedError(error);
        }
    });

    it("Get automation email e-commerce stats", async ({ skip }) => {
        skip(!automationId);

        try {
            const response = await mailerlite.automations.getEmailEcommerceStats(automationId, emailId, { shop_id: shopId });

            expect(response).not.toBeNull();
            expect(response.data.data).toBeDefined();
            expectTypeOf(response.data).toEqualTypeOf<AutomationEmailEcommerceStatsResponse>()
        } catch (error) {
            handleCatchedError(error);
        }
    });

    it("Get automation e-commerce orders", async ({ skip }) => {
        skip(!automationId);

        try {
            const response = await mailerlite.automations.getEcommerceOrders(automationId, { time_frame: "all_time", ecommerce_shop_id: shopId, limit: 10 });

            expect(response).not.toBeNull();
            expect(response.data.data).toBeDefined();
            expectTypeOf(response.data).toEqualTypeOf<AutomationEcommerceOrdersResponse>()
        } catch (error) {
            handleCatchedError(error);
        }
    });

});
