import { describe, it, expect, beforeAll, expectTypeOf } from "vitest";
import "dotenv/config";
import MailerLite from '../../index';
import {CreateParams, ListAllResponse, SingleWebhookResponse, UpdateParams} from "./webhooks.types";
import {getRandomInt, handleCatchedError} from "../../utils/helpers";

const MAILERLITE_API_KEY = process.env.API_KEY as string;
const mailerlite = new MailerLite({
    api_key: MAILERLITE_API_KEY,
    base_path: "http://localhost:9090",
});

describe("Webhooks", () => {
    beforeAll(() => {
        if (!MAILERLITE_API_KEY)
            throw "No MailerLite API key found in environment variables";
    });

    let createdWebhookId: string;

    it.concurrent("List all webhooks", async () => {

        try {
            const response = await mailerlite.webhooks.get();

            expect(response).not.toBeNull();
            expect(response.data).toBeDefined();
            expect(Array.isArray(response.data.data)).toBeTruthy();
            expectTypeOf(response.data).toEqualTypeOf<ListAllResponse>()
        } catch (error) {
            handleCatchedError(error);
        }
    });

    it("Create a webhook", async () => {
        const randomInt = getRandomInt();

        const params: CreateParams = {
            name:  `Test webhook nodejs ${randomInt}`,
            events: ["subscriber.updated"],
            url:    "http://www.marvin.com/omnis-accusamus-est-rem-delectus-quaerat.html"
        };

        try {
            const response = await mailerlite.webhooks.create(params);

            expect(response).not.toBeNull();
            expect(response.data).toBeDefined();
            expect(response.data.data).toBeDefined();
            expect(response.data.data.id).not.toBeNull();
            expectTypeOf(response.data).toEqualTypeOf<SingleWebhookResponse>()

            createdWebhookId = response.data.data.id;
        } catch (error) {
            handleCatchedError(error);
        }
    });

    it("Get a webhook", async () => {
        try {
            const response = await mailerlite.webhooks.find(createdWebhookId);

            expect(response).not.toBeNull();
            expect(response.data).toBeDefined();
            expect(response.data.data).toBeDefined();
            expect(response.data.data.id).not.toBeNull();
            expectTypeOf(response.data).toEqualTypeOf<SingleWebhookResponse>()
        } catch (error) {
            handleCatchedError(error);
        }
    });

    it("Update a webhook", async () => {
        const randomInt = getRandomInt();

        const params: UpdateParams = {
            name:  `Test webhook nodejs updated ${randomInt}`,
            enabled: false
        };

        try {
            const response = await mailerlite.webhooks.update(createdWebhookId, params);

            expect(response).not.toBeNull();
            expect(response.data).toBeDefined();
            expect(response.data.data).toBeDefined();
            expect(response.data.data.id).not.toBeNull();
            expectTypeOf(response.data).toEqualTypeOf<SingleWebhookResponse>()
        } catch (error) {
            handleCatchedError(error);
        }
    });

    it("Delete a webhook", async () => {
        try {
            const response = await mailerlite.webhooks.delete(createdWebhookId);

            expect(response).not.toBeNull();
            expect(response.data).toBeDefined();
        } catch (error) {
            handleCatchedError(error);
        }
    });

});
