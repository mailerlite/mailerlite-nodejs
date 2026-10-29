import { describe, it, expect, expectTypeOf } from "vitest";
import "dotenv/config";
import MailerLite from '../../index';
import {
    GetCampaignsParams,
    ListCampaignsResponse,
    SingleCampaignResponse,
    CreateUpdateCampaignParams,
    CreateCampaignParams,
    ScheduleCampaignParams
} from "./campaigns.types";

import {getRandomInt, handleCatchedError} from "../../utils/helpers";

const MAILERLITE_API_KEY = process.env.API_KEY as string;
const MAILERLITE_VERIFIED_EMAIL = process.env.VERIFIED_EMAIL as string;

if (!MAILERLITE_API_KEY)
    throw "No MailerLite API key found in environment variables";
if (!MAILERLITE_VERIFIED_EMAIL)
    throw "No MailerLite verified email found in environment variables";

const mailerlite = new MailerLite({
    api_key: MAILERLITE_API_KEY,
    base_path: "http://localhost:9090",
});

describe("Campaigns", () => {

    let createdCampaignId: string;

    it.concurrent("List campaigns", async () => {
        const params: GetCampaignsParams = {
            filter: {
                status: "sent", // possible statuses: sent, draft, ready
                type: "regular" // possible types: regular, ab, resend, rss
            },
            limit: 25,
            page: 1
        }

        try {
            const response = await mailerlite.campaigns.get(params);

            expect(response).not.toBeNull();
            expect(response.data).toBeDefined();
            expect(Array.isArray(response.data.data)).toBeTruthy();
            expectTypeOf(response.data).toEqualTypeOf<ListCampaignsResponse>();
        } catch (error) {
            handleCatchedError(error);
        }
    });

    it("Create a campaign", async () => {
        const randomInt: number = getRandomInt();
        const params: CreateUpdateCampaignParams = {
            name: `Test campaign nodejs ${randomInt}`,
            language_id: 4,
            type: "regular",
            emails: [{
                subject: "Dummy subject",
                from_name: "Dummy Testerson",
                from: MAILERLITE_VERIFIED_EMAIL,
                content: "<!DOCTYPE html>\n<html>\n<head>\n  <meta http-equiv=\"Content-Type\" content=\"text/html; charset=utf-8\" />\n  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\" />\n  <meta http-equiv=\"X-UA-Compatible\" content=\"IE=edge\" />\n  <meta name=\"format-detection\" content=\"address=no\" />\n  <meta name=\"format-detection\" content=\"telephone=no\" />\n  <meta name=\"format-detection\" content=\"email=no\" />\n  <meta name=\"x-apple-disable-message-reformatting\" />\n  <title>Untitled</title>\n  <!-- Style goes here -->\n  <style type=\"text/css\">\n\n  </style>\n</head>\n<body style=\"margin: 0; padding: 0;\">\n<!-- Main table -->\n<table border=\"0\" cellspacing=\"0\" cellpadding=\"0\" width=\"100%\">\n  <tr>\n    <td style=\"padding: 0 40px;\">\n      <!-- Child table -->\n      <table align=\"center\" border=\"0\" cellspacing=\"0\" cellpadding=\"0\" width=\"100%\" style=\"width: 100%; min-width: 100%;\">\n        <tr>\n          <td>\n            <p> This is a test content </p>\n            <a href=\"{$unsubscribe}\">Unsubscribe</a>\n          </td>\n        </tr>\n      </table>\n\n    </td>\n  </tr>\n</table>\n<!-- Footer -->\n</body>\n</html>",
            }]
        }

        try {
            const response = await mailerlite.campaigns.create(params);

            expect(response).not.toBeNull();
            expect(response.data).toBeDefined();
            expect(response.data.data).toBeDefined();
            expect(response.data.data.id).not.toBeNull();
            expectTypeOf(response.data).toEqualTypeOf<SingleCampaignResponse>()
            createdCampaignId = response.data.data.id;
        } catch (error) {
            handleCatchedError(error);
        }
    });

    it("Fetch a campaign by ID", async () => {
        try {
            const response = await mailerlite.campaigns.find(createdCampaignId);

            expect(response).not.toBeNull();
            expect(response.data).toBeDefined();
            expect(response.data.data).toBeDefined();
            expect(response.data.data.id).not.toBeNull();
            expectTypeOf(response.data).toEqualTypeOf<SingleCampaignResponse>()
        } catch (error) {
            handleCatchedError(error);
        }
    });

    it("Update a campaign", async () => {
        const randomInt: number = getRandomInt();
        const params: CreateUpdateCampaignParams = {
            name: `Test campaign updated nodejs ${randomInt}`,
            language_id: 4,
            type: "regular",
            emails: [{
                subject: "Dummy subject updated",
                from_name: "Dummy Testerson updated",
                from: MAILERLITE_VERIFIED_EMAIL,
                content: "<!DOCTYPE html>\n<html>\n<head>\n  <meta http-equiv=\"Content-Type\" content=\"text/html; charset=utf-8\" />\n  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\" />\n  <meta http-equiv=\"X-UA-Compatible\" content=\"IE=edge\" />\n  <meta name=\"format-detection\" content=\"address=no\" />\n  <meta name=\"format-detection\" content=\"telephone=no\" />\n  <meta name=\"format-detection\" content=\"email=no\" />\n  <meta name=\"x-apple-disable-message-reformatting\" />\n  <title>Untitled</title>\n  <!-- Style goes here -->\n  <style type=\"text/css\">\n\n  </style>\n</head>\n<body style=\"margin: 0; padding: 0;\">\n<!-- Main table -->\n<table border=\"0\" cellspacing=\"0\" cellpadding=\"0\" width=\"100%\">\n  <tr>\n    <td style=\"padding: 0 40px;\">\n      <!-- Child table -->\n      <table align=\"center\" border=\"0\" cellspacing=\"0\" cellpadding=\"0\" width=\"100%\" style=\"width: 100%; min-width: 100%;\">\n        <tr>\n          <td>\n            <p> This is a test content </p>\n            <a href=\"{$unsubscribe}\">Unsubscribe</a>\n          </td>\n        </tr>\n      </table>\n\n    </td>\n  </tr>\n</table>\n<!-- Footer -->\n</body>\n</html>",
            }]
        }

        try {
            const response = await mailerlite.campaigns.update(createdCampaignId, params);

            expect(response).not.toBeNull();
            expect(response.data).toBeDefined();
            expect(response.data.data).toBeDefined();
            expect(response.data.data.id).not.toBeNull();
            expectTypeOf(response.data).toEqualTypeOf<SingleCampaignResponse>()
        } catch (error) {
            handleCatchedError(error);
        }
    });

    it("Schedule a campaign", async () => {
        const dateObj = new Date();
        const year = dateObj.getUTCFullYear() + 1; // scheduled for the next year
        const month = (dateObj.getUTCMonth() + 1).toString().padStart(2, '0'); // months from 01-12
        var day = dateObj.getUTCDate();

        const params: ScheduleCampaignParams = {
            delivery: "scheduled",
            schedule: {
                date: `${year}-${month}-${day}`,
                hours: "12",
                minutes: "12",
                timezone_id: 50
            }
        };

        try {
            const response = await mailerlite.campaigns.schedule(createdCampaignId, params);

            expect(response).not.toBeNull();
            expect(response.data).toBeDefined();
            expect(response.data.data).toBeDefined();
            expect(response.data.data.id).not.toBeNull();
            expectTypeOf(response.data).toEqualTypeOf<SingleCampaignResponse>()
        } catch (error) {
            handleCatchedError(error);
        }
    });

    it("Cancel a ready campaign", async () => {
        try {
            const response = await mailerlite.campaigns.cancel(createdCampaignId);

            expect(response).not.toBeNull();
            expect(response.data).toBeDefined();
            expect(response.data.data).toBeDefined();
            expect(response.data.data.id).not.toBeNull();
            expectTypeOf(response.data).toEqualTypeOf<SingleCampaignResponse>()
        } catch (error) {
            handleCatchedError(error);
        }
    });

    it("Delete a campaign", async () => {
        try {
            const response = await mailerlite.campaigns.delete(createdCampaignId);

            expect(response).not.toBeNull();
            expect(response.data).toBeDefined();
        } catch (error) {
            handleCatchedError(error);
        }
    });

    it("Create a campaign with the simple editor", async () => {
        const randomInt: number = getRandomInt();
        const params: CreateCampaignParams = {
            name: `Test simple editor campaign nodejs ${randomInt}`,
            type: "regular",
            emails: [{
                subject: "Dummy subject",
                from_name: "Dummy Testerson",
                from: MAILERLITE_VERIFIED_EMAIL,
                editor: "simple",
            }]
        };

        // existing create payloads must keep compiling
        expectTypeOf<CreateUpdateCampaignParams>().toExtend<CreateCampaignParams>();

        // @ts-expect-error content is not allowed with the simple editor
        const withContent: CreateCampaignParams["emails"][number] = { subject: "s", from_name: "n", from: "a@b.c", editor: "simple", content: "<p>hi</p>" };
        // @ts-expect-error template_id needs the simple editor
        const withTemplate: CreateCampaignParams["emails"][number] = { subject: "s", from_name: "n", from: "a@b.c", template_id: "1" };
        // @ts-expect-error update does not accept editor
        const onUpdate: CreateUpdateCampaignParams["emails"][number] = { subject: "s", from_name: "n", from: "a@b.c", editor: "simple" };
        // @ts-expect-error template_id must be a string
        const numericTemplate: CreateCampaignParams["emails"][number] = { subject: "s", from_name: "n", from: "a@b.c", editor: "simple", template_id: 1 };
        // @ts-expect-error all emails must use the same editor
        const mixedEditors: CreateCampaignParams["emails"] = [
            { subject: "s", from_name: "n", from: "a@b.c", editor: "simple" },
            { subject: "s", from_name: "n", from: "a@b.c", content: "<p>hi</p>" },
        ];
        void [withContent, withTemplate, onUpdate, numericTemplate, mixedEditors];

        let simpleEditorCampaignId: string | undefined;

        try {
            const response = await mailerlite.campaigns.create(params);
            simpleEditorCampaignId = response.data.data.id;

            expect(response.status).toBe(201);
            expect(response.data.data.emails[0].id).not.toBeNull();
            expect(response.data.data.emails[0].type).toBe("builder_inline_email");
            expectTypeOf(response.data).toEqualTypeOf<SingleCampaignResponse>();
        } catch (error) {
            handleCatchedError(error);
        } finally {
            if (simpleEditorCampaignId) {
                await mailerlite.campaigns.delete(simpleEditorCampaignId);
            }
        }
    });

});

