import { describe, it, expect, beforeAll, expectTypeOf } from "vitest";
import "dotenv/config";
import MailerLite from '../../MailerLite';
import {
    AutomationStats, AutomationSubsParams,
    AutomationSubsResponse, GetAutomationsParams, ListAutomationsResponse
} from "../automations/automations.types";
import {AxiosResponse} from "axios";
import {CampaignStats, GetCampaignsParams, ListCampaignsResponse} from "../campaigns/campaigns.types";
import {
    CampaignSubscribersActivityParams,
    CampaignSubscribersActivityResponse,
    FormsSubscribersParams
} from "./stats.types";
import {FormTypes, GetFormsParams, ListFormsResponse} from "../forms/forms.types";
import {ListSubscribersResponse} from "../subscribers/subscribers.types";
import {handleCatchedError} from "../helpers";

const MAILERLITE_API_KEY = process.env.API_KEY as string;
const mailerlite = new MailerLite({
    api_key: MAILERLITE_API_KEY,
});

describe("Stats", () => {
    beforeAll(() => {
        if (!MAILERLITE_API_KEY)
            throw "No MailerLite API key found in environment variables";
    });

    let campaignId: string;
    let formId: string;
    let automationId: string;

    //Campaigns
    it.concurrent("Get a list of sent campaigns", async () => {

        const params: GetCampaignsParams = {
            filter: {
                status: "sent",
                type: "regular"
            },
            limit: 10,
            page: 1
        };

        try {
            const response = await mailerlite.stats.getSentCampaigns(params);

            expect(response).not.toBeNull();
            expect(response.data).toBeDefined();
            expect(Array.isArray(response.data.data)).toBeTruthy();
            expectTypeOf(response.data).toEqualTypeOf<ListCampaignsResponse>();

            if (response.data.data.length) campaignId = response.data.data[0].id;
        } catch (error) {
            handleCatchedError(error);
        }
    });

    it("Get stats for a sent campaign", async () => {

        try {
            const response = await mailerlite.stats.getSentCampaignStats(campaignId);

            expect(response).not.toBeNull();
            expect(response).toBeDefined();
            expectTypeOf(response).toEqualTypeOf<CampaignStats | AxiosResponse>();
        } catch (error) {
            handleCatchedError(error);
        }
    });

    it("Get subscribers of sent campaign", async () => {

        const params: CampaignSubscribersActivityParams = {
            filter: {
                // type: "opened",  // "opened" | "unopened" | "clicked" | "unsubscribed" | "forwarded" | "hardbounced" | "softbounced" | "junk"
                // search: "",
            },
            limit: 10, // 10 | 25 | 50 | 100;
            sort:  "id", // "id" | "updated_at" | "clicks_count" | "opens_count";
            page:  1
        };

        try {
            const response = await mailerlite.stats.getSentCampaignSubscribers(campaignId, params);

            expect(response).not.toBeNull();
            expect(response.data).toBeDefined();
            expect(Array.isArray(response.data.data)).toBeTruthy();
            expectTypeOf(response.data).toEqualTypeOf<CampaignSubscribersActivityResponse>();
        } catch (error) {
            handleCatchedError(error);
        }
    });

    //Forms
    it.concurrent("Get a list of forms by type", async () => {
        const formType:FormTypes = "popup";
        const params: GetFormsParams = {
            limit: 25,
            page: 1,
            filter: {
                name: "nodejs"
            },
            sort: "created_at"
        };

        try {
            const response = await mailerlite.stats.getFormsByType(formType, params);

            expect(response).not.toBeNull();
            expect(response.data).toBeDefined();
            expect(Array.isArray(response.data.data)).toBeTruthy();
            expectTypeOf(response.data).toEqualTypeOf<ListFormsResponse>();

            if (response.data.data.length) formId = response.data.data[0].id;
        } catch (error) {
            handleCatchedError(error);
        }
    });

    it("Get a stats (count) of a form by type", async () => {
        const formType:FormTypes = "popup";
        try {
            const response = await mailerlite.stats.getFormsCountByType(formType);

            expect(response).not.toBeNull();
            expect(response).toBeDefined();
            expectTypeOf(response).toEqualTypeOf<number | AxiosResponse>();
        } catch (error) {
            handleCatchedError(error);
        }
    });

    it("Get subscribers of a form", async () => {

        const params: FormsSubscribersParams = {
            filter: {
                status: "active", // "active" | "unsubscribed" | "unconfirmed" | "bounced" | "junk";
            },
            limit: 10,
            page:  1
        };

        try {
            const response = await mailerlite.stats.getFormSubscribers(formId, params);

            expect(response).not.toBeNull();
            expect(response.data).toBeDefined();
            expect(Array.isArray(response.data.data)).toBeTruthy();
            expectTypeOf(response.data).toEqualTypeOf<ListSubscribersResponse>();
        } catch (error) {
            handleCatchedError(error);
        }
    });

    //Automations
    it.concurrent("List all automations", async () => {

        const params: GetAutomationsParams = {
            filter: {
                status: true,
                name: "nodejs"
            },
            limit: 10,
            page: 1
        };

        try {
            const response = await mailerlite.stats.getAutomations(params);

            expect(response).not.toBeNull();
            expect(response.data).toBeDefined();
            expect(Array.isArray(response.data.data)).toBeTruthy();
            expectTypeOf(response.data).toEqualTypeOf<ListAutomationsResponse>();

            if (response.data.data.length) automationId = response.data.data[0].id;
        } catch (error) {
            handleCatchedError(error);
        }
    });

    it("Get stats for a specific automation", async () => {
        try {
            const response = await mailerlite.stats.getAutomationStats(automationId);

            expect(response).not.toBeNull();
            expect(response).toBeDefined();
            expectTypeOf(response).toEqualTypeOf<AutomationStats | AxiosResponse>();
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
            const response = await mailerlite.stats.getAutomationSubscribers(automationId, params);

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
